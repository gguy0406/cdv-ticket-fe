'use server';

import {
  CreateUserDto,
  UpdateUserDto,
  createUser as createUserHandler,
  deleteUser as deleteUserHandler,
  updateUser as updateUserHandler,
} from '@/apis/users/handlers';
import { createUserSchema, updateUserSchema } from '@/apis/users/schemas';
import parseFormData from '@/lib/parseFormData';

export async function createUser(_prevState: HttpException | undefined, formData: FormData) {
  const parsedData = parseFormData(createUserSchema, formData);

  try {
    await createUserSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpException;
  }

  try {
    await createUserHandler(parsedData as CreateUserDto);
    return { statusCode: 200 } satisfies HttpException;
  } catch (error) {
    return error as HttpException;
  }
}

export async function updateUser(_prevState: HttpException | undefined, formData: FormData) {
  const parsedData = parseFormData(updateUserSchema, formData);

  try {
    await updateUserSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpException;
  }

  try {
    await updateUserHandler(formData.get('id') as string, parsedData as UpdateUserDto);

    return { statusCode: 200 } satisfies HttpException;
  } catch (error) {
    return error as HttpException;
  }
}

export async function deleteUser(id: string) {
  try {
    await deleteUserHandler(id);
  } catch (error) {
    return error as HttpException;
  }
}
