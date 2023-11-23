import { InferType } from 'yup';

import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

import { createUserSchema, updateUserSchema } from './schemas';

const userRoute = `${BASE_URL}/api/users`;

export type CreateUserDto = InferType<typeof createUserSchema>;
export type updateUserSchema = InferType<typeof updateUserSchema>;

export function getUsers() {
  return wrappedFetchWithJWT<{ data: User[]; hasNextPage: boolean }>(`${userRoute}/get`, { method: 'POST' });
}

export function getUserDetail(id: string) {
  return wrappedFetchWithJWT<User>(`${userRoute}/${id}`, { method: 'GET' });
}

export function createUser(data: CreateUserDto) {
  return wrappedFetchWithJWT<void>(userRoute, {
    method: 'POST',
    body: JSON.stringify({ ...data, role: { id: data.roleId }, customer: { id: data.customerId } }),
  });
}

export function updateUser(id: string, data: updateUserSchema) {
  return wrappedFetchWithJWT<void>(`${userRoute}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...data, role: { id: data.roleId }, customer: { id: data.customerId } }),
  });
}

export function deleteUser(id: string) {
  return wrappedFetchWithJWT<User>(`${userRoute}/${id}`, { method: 'DELETE' });
}
