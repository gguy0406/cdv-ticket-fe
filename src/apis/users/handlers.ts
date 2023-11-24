import { InferType } from 'yup';

import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

import { createUserSchema, updateUserSchema } from './schemas';

const userRoute = `${BASE_URL}/api/users`;

export type CreateUserDto = InferType<typeof createUserSchema>;
export type UpdateUserDto = InferType<typeof updateUserSchema>;

export function getUsers() {
  return wrappedFetchWithJWT<{ data: User[]; hasNextPage: boolean }>(`${userRoute}/get`, { method: 'POST' });
}

export function getUserDetail(id: string) {
  return wrappedFetchWithJWT<User>(`${userRoute}/${id}`, { method: 'GET' });
}

export function createUser(data: CreateUserDto) {
  return wrappedFetchWithJWT<void>(userRoute, {
    method: 'POST',
    body: JSON.stringify(serializeUserData(data)),
  });
}

export function updateUser(id: string, data: UpdateUserDto) {
  return wrappedFetchWithJWT<void>(`${userRoute}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(serializeUserData(data)),
  });
}

export function deleteUser(id: string) {
  return wrappedFetchWithJWT<void>(`${userRoute}/${id}`, { method: 'DELETE' });
}

function serializeUserData(data: CreateUserDto | UpdateUserDto) {
  const serializedData: any = data;

  if (!serializedData.status) delete serializedData.status;
  if (serializedData.roleId) serializedData.role = { id: serializedData.roleId };
  if (serializedData.customerId) serializedData.customer = { id: serializedData.customerId };

  delete serializedData.roleId;
  delete serializedData.customerId;

  return serializedData;
}
