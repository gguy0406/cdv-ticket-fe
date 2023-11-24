'use server';

import { loginSchema } from '@/apis/auth/schemas';
import { signIn } from '@/auth';
import parseFormData from '@/lib/parseFormData';

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
