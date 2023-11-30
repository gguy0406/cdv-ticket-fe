import { InferType, object, string } from 'yup';

import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetch } from '@/lib/wrapped-fetch';

export type LoginDto = InferType<typeof loginSchema>;

export interface LoginAPIResponse {
  token: string;
  tokenExpires: number;
  user: User;
}

export const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export async function login(data: LoginDto) {
  return wrappedFetch<LoginAPIResponse>(`${BASE_URL}/api/auth/login`, { method: 'POST', body: JSON.stringify(data) });
}
