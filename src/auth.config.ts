import type { NextAuthConfig, User } from 'next-auth';

const loginRoute = '/login';
const defaultUserRoute = '/users';
const protectedRoutes = ['/users', '/customers', '/events'];

export const authConfig = {
  providers: [],
  pages: { signIn: loginRoute },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginRoute = nextUrl.pathname.startsWith(loginRoute);
      const isOnProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));

      if (!isLoggedIn && isOnProtectedRoute) return false;
      if (isLoggedIn && isOnLoginRoute) return Response.redirect(new URL(defaultUserRoute, nextUrl));

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
    async redirect({ baseUrl, url }) {
      if (url.startsWith('/') && url !== loginRoute) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;

      return `${baseUrl}${defaultUserRoute}`;
    },
  },
} satisfies NextAuthConfig;
