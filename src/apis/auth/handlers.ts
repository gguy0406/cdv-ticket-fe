import { InferType } from 'yup';

import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetch } from '@/lib/wrappedFetch';

import { loginSchema } from './schemas';

export type LoginDto = InferType<typeof loginSchema>;

export interface LoginAPIResponse {
  token: string;
  tokenExpires: number;
  user: User;
}

export function login(data: LoginDto) {
  return wrappedFetch<LoginAPIResponse>(`${BASE_URL}/api/auth/login`, { method: 'POST', body: JSON.stringify(data) });
}
