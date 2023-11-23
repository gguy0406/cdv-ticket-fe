'use server';

import { CreateUserDto, createUser } from '@/apis/users/handlers';
import { createUserSchema } from '@/apis/users/schemas';
import parseFormData from '@/lib/parseFormData';

export async function submitUser(_prevState: string | undefined, formData: FormData) {
  try {
    const parsedData = parseFormData(createUserSchema, formData);

    await createUserSchema.validate(parsedData);
    await createUser(parsedData as CreateUserDto);
  } catch (error) {
    if (error instanceof Error) return error.message;

    throw error;
  }
}
