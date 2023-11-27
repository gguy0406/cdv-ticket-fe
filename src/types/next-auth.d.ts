import { JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';

type AdapterUser = import('@/interfaces/user').User;

declare module 'next-auth' {
  interface User extends AdapterUser {
    jwt?: JWT;
  }

  interface Session {
    jwt: Omit<JWT, 'user'>;
    user: User;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    token: string;
    tokenExpires: number;
    user: AdapterUser;
  }
}
