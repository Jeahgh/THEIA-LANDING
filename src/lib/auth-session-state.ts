export interface SessionTokenState {
  id?: string;
  userId?: string;
  role?: string;
  isActive?: boolean;
  sessionVersion?: number;
  revoked?: boolean;
}

export interface SessionUserSnapshot {
  id: string;
  role: string;
  isActive: boolean;
  sessionVersion: number;
}

type TokenWithSessionState<T extends Record<string, unknown>> = T & SessionTokenState;

function failClosed<T extends Record<string, unknown>>(
  token: TokenWithSessionState<T>,
  revoked: boolean,
): TokenWithSessionState<T> {
  return {
    ...token,
    id: '',
    role: 'MEMBER',
    isActive: false,
    revoked,
  };
}

export function markSessionTemporarilyUnavailable<T extends Record<string, unknown>>(
  token: TokenWithSessionState<T>,
): TokenWithSessionState<T> {
  return failClosed(token, false);
}

export function markSessionRevoked<T extends Record<string, unknown>>(
  token: TokenWithSessionState<T>,
): TokenWithSessionState<T> {
  return failClosed(token, true);
}

export function reconcileSessionUser<T extends Record<string, unknown>>(
  token: TokenWithSessionState<T>,
  user: SessionUserSnapshot | null,
): TokenWithSessionState<T> {
  if (
    !user?.isActive ||
    (typeof token.sessionVersion === 'number' && token.sessionVersion !== user.sessionVersion)
  ) {
    return markSessionRevoked(token);
  }

  return {
    ...token,
    id: user.id,
    role: user.role,
    isActive: true,
    sessionVersion: user.sessionVersion,
    revoked: false,
  };
}

export async function refreshSessionFromLookup<T extends Record<string, unknown>>(
  token: TokenWithSessionState<T>,
  lookupUser: () => Promise<SessionUserSnapshot | null>,
  reportLookupError: (error: unknown) => void = () => undefined,
): Promise<TokenWithSessionState<T>> {
  try {
    return reconcileSessionUser(token, await lookupUser());
  } catch (error) {
    reportLookupError(error);
    return markSessionTemporarilyUnavailable(token);
  }
}
