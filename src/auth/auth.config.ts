import type { NextAuthConfig } from 'next-auth';

import { ALLOW_ACCESS_ROUTE, DEFAULT_USER_ROUTE } from '@/lib/constants';

const loginRoute = '/login';
const protectedRoutes = ['/customers', '/users', '/events'];

export const authConfig = {
  providers: [],
  pages: { signIn: loginRoute },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginRoute = nextUrl.pathname.startsWith(loginRoute);
      const onProtectedRoute = protectedRoutes.find((route) => nextUrl.pathname.startsWith(route));

      if (!isLoggedIn && onProtectedRoute) return false;
      if (
        isLoggedIn &&
        (isOnLoginRoute ||
          (onProtectedRoute &&
            ALLOW_ACCESS_ROUTE[onProtectedRoute] &&
            !ALLOW_ACCESS_ROUTE[onProtectedRoute].includes(auth!.user.role?.name)))
      )
        return Response.redirect(new URL(DEFAULT_USER_ROUTE[auth!.user.role?.name || 'User'], nextUrl));

      return true;
    },
    async jwt({ user, token }) {
      if (user) Object.assign(token, user.jwt);

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.jwt = { token: token.token, tokenExpires: token.tokenExpires };

      return session;
    },
  },
} satisfies NextAuthConfig;
