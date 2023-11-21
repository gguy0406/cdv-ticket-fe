'use server';

import { signIn } from '@/auth';

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'NEXT_REDIRECT') throw error;

      return error.message;
    }

    throw error;
  }
}
