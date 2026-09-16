import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { clearRateLimit, consumeRateLimit, getClientAddress } from '@/lib/rate-limit';
import {
  markSessionRevoked,
  refreshSessionFromLookup,
} from '@/lib/auth-session-state';

// Hash bcrypt de un valor ficticio, sin valor de autenticacion. Mantiene un
// coste comparable cuando el email no existe o la cuenta solo usa OAuth.
const DUMMY_PASSWORD_HASH = '$2b$12$Jwu5.ymPnL6.qAeTNfG2JOaT4402fItENgsAld174pGi1h4nkbsPy';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as never),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
      profile(profile) {
        if (!profile.email_verified) {
          throw new Error('Google account email is not verified.');
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: new Date(),
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: 'Email y contraseña',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, request) {
        const email = String(credentials?.email ?? '').toLowerCase().trim();
        const password = String(credentials?.password ?? '');

        if (!email || !password) return null;

        const clientAddress = getClientAddress(request.headers);
        const accountAttempt = consumeRateLimit({
          scope: 'credentials-login-account',
          identifiers: [email],
          limit: 8,
          windowMs: 15 * 60 * 1_000,
        });
        const addressAttempt = consumeRateLimit({
          scope: 'credentials-login-address',
          identifiers: [clientAddress],
          limit: 50,
          windowMs: 15 * 60 * 1_000,
        });

        if (!accountAttempt.allowed || !addressAttempt.allowed) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        const isValidPassword = await compare(password, user?.passwordHash ?? DUMMY_PASSWORD_HASH);
        if (!user?.passwordHash || !user.emailVerified || !user.isActive || !isValidPassword) return null;

        clearRateLimit('credentials-login-account', [email]);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userId = user.id;
        token.role = user.role ?? 'MEMBER';
        token.sessionVersion = user.sessionVersion ?? 0;
        token.isActive = true;
        token.revoked = false;
      } else if (token.revoked) {
        return markSessionRevoked(token);
      }

      const userId =
        typeof token.userId === 'string' && token.userId
          ? token.userId
          : typeof token.sub === 'string' && token.sub
            ? token.sub
            : typeof token.id === 'string' && token.id
              ? token.id
              : null;

      if (userId) {
        return refreshSessionFromLookup(
          token,
          () =>
            prisma.user.findUnique({
              where: { id: userId },
              select: { id: true, role: true, isActive: true, sessionVersion: true },
            }),
          (error) => {
            console.error('[auth] No se pudo validar temporalmente la sesión en la base de datos.', error);
          },
        );
      }

      return token.email ? markSessionRevoked(token) : token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? '');
        session.user.role = (token.role ?? 'MEMBER') as 'ADMIN' | 'COACH' | 'MEMBER';
        session.user.isActive = token.isActive !== false && Boolean(token.id);
        session.user.sessionVersion = Number(token.sessionVersion ?? 0);
      }

      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.id) {
        try {
          await prisma.user.updateMany({
            where: { id: user.id, emailVerified: null },
            data: { emailVerified: new Date() },
          });
        } catch (error) {
          console.error('[auth] No se pudo marcar el correo Google como verificado.', error);
        }
      }
    },
  },
});
