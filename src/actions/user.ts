'use server';

import { revalidatePath } from 'next/cache';

import { parseFormData } from '@/lib/parse-form-data';
import { wrappedFetchAction, wrappedValidateAction } from '@/lib/wrapped-action';
import {
  CreateUserDto,
  UpdateUserDto,
  createUser as createUserService,
  createUserSchema,
  deleteUser as deleteUserService,
  updateUser as updateUserService,
  updateUserSchema,
} from '@/services/user';

export async function createUser(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createUserSchema, formData);
  const validationError = await wrappedValidateAction(createUserSchema.validate(parsedData));

  if (validationError) return validationError;

  return wrappedFetchAction(createUserService(parsedData as CreateUserDto));
}

export async function updateUser(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(updateUserSchema, formData);
  const validationError = await wrappedValidateAction(updateUserSchema.validate(parsedData));

  if (validationError) return validationError;

  const res = await wrappedFetchAction(updateUserService(formData.get('id') as string, parsedData as UpdateUserDto));

  if (res.statusCode === 200) revalidatePath('/users');

  return res;
}

export async function deleteUser(id: string) {
  return wrappedFetchAction(deleteUserService(id));
}
