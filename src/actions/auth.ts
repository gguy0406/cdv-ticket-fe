'use server';

import { signIn, signOut } from '@/auth';
import { parseFormData } from '@/lib/parse-form-data';
import { loginSchema } from '@/services/auth';

export async function logout() {
  return signOut();
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
