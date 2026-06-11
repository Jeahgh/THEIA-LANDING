import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        if (!profile.email_verified) {
          throw new Error('Google account email is not verified.');
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
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
      async authorize(credentials) {
        const email = String(credentials?.email ?? '').toLowerCase().trim();
        const password = String(credentials?.password ?? '');

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash || !user.isActive) return null;

        const isValidPassword = await compare(password, user.passwordHash);
        if (!isValidPassword) return null;

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
        token.role = user.role ?? 'MEMBER';
        token.sessionVersion = user.sessionVersion ?? 0;
        token.isActive = true;
        token.revoked = false;
      } else if (token.revoked) {
        token.id = '';
        token.role = 'MEMBER';
        token.isActive = false;
        return token;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, isActive: true, sessionVersion: true },
        });

        if (
          !dbUser?.isActive ||
          (typeof token.sessionVersion === 'number' && token.sessionVersion !== dbUser.sessionVersion)
        ) {
          token.id = '';
          token.role = 'MEMBER';
          token.isActive = false;
          token.revoked = true;
          return token;
        }

        token.id = dbUser.id;
        token.role = dbUser.role;
        token.isActive = true;
        token.sessionVersion = dbUser.sessionVersion;
        token.revoked = false;
      }

      return token;
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
});
