import { InferType, mixed, object, string } from 'yup';

import { Role, User, UserStatusEnum } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrapped-fetch';

const userRoute = `${BASE_URL}/api/users`;

export type CreateUserDto = InferType<typeof createUserSchema>;
export type UpdateUserDto = InferType<typeof updateUserSchema>;

export const createUserSchema = object({
  fullName: string().required(),
  username: string().required(),
  password: string().min(6).required(),
  customerId: string(),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  note: string(),
});

export const updateUserSchema = object({
  fullName: string(),
  username: string(),
  customerId: string(),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  note: string(),
});

export async function getUsers() {
  return wrappedFetchWithJWT<{ data: User[]; hasNextPage: boolean }>(`${userRoute}/get`, { method: 'POST' });
}

export async function getUserDetail(id: string) {
  return wrappedFetchWithJWT<User>(`${userRoute}/${id}`, { method: 'GET' });
}

export async function createUser(data: CreateUserDto) {
  const body = JSON.stringify(serializeUserData(data));

  return wrappedFetchWithJWT<void>(userRoute, { method: 'POST', body });
}

export async function updateUser(id: string, data: UpdateUserDto) {
  const body = JSON.stringify(serializeUserData(data));

  return wrappedFetchWithJWT<void>(`${userRoute}/${id}`, { method: 'PUT', body });
}

export async function deleteUser(id: string) {
  return wrappedFetchWithJWT<void>(`${userRoute}/${id}`, { method: 'DELETE' });
}

export async function getRoles() {
  return wrappedFetchWithJWT<Role[]>(`${BASE_URL}/api/roles`, { method: 'GET' });
}

function serializeUserData(data: CreateUserDto | UpdateUserDto) {
  const serializedData: Record<string, any> = data;

  if (!serializedData.status) delete serializedData.status;
  if (serializedData.roleId) serializedData.role = { id: serializedData.roleId };
  if (serializedData.customerId) serializedData.customer = { id: serializedData.customerId };

  delete serializedData.roleId;
  delete serializedData.customerId;

  return serializedData;
}
