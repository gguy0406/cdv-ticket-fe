'use server';

import { InferType, object, string } from 'yup';

import { signIn } from '@/auth';
import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import parseFormData from '@/lib/parseFormData';
import { wrappedFetch } from '@/lib/wrappedFetch';

const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export type LoginDto = InferType<typeof loginSchema>;

export interface LoginAPIResponse {
  token: string;
  tokenExpires: number;
  user: User;
}

export async function login(data: LoginDto) {
  return wrappedFetch<LoginAPIResponse>(`${BASE_URL}/api/auth/login`, { method: 'POST', body: JSON.stringify(data) });
}

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  try {
    await loginSchema.validate(parseFormData(loginSchema, formData));
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'NEXT_REDIRECT') throw error;

      return error.message;
    }

    throw error;
  }
}
