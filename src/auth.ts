import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginAPIResponse, loginSchema } from '@/interfaces/user';
import { wrappedFetch } from '@/lib/wrappedFetch';

import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          await loginSchema.validate(credentials);

          const res = await wrappedFetch<LoginAPIResponse>(`${process.env.API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
          });

          return { ...res.user, jwt: { token: res.token, tokenExpires: res.tokenExpires, user: res.user } };
        } catch {
          return null;
        }
      },
    }),
  ],
});
