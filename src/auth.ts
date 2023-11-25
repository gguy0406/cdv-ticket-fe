import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginDto, login } from '@/app/login/_actions';

import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const res = await login(credentials as LoginDto);

          return { ...res.user, jwt: { token: res.token, tokenExpires: res.tokenExpires, user: res.user } };
        } catch {
          return null;
        }
      },
    }),
  ],
});
