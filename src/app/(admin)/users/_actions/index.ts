'use server';

import { InferType, mixed, object, string } from 'yup';

import { User, UserStatusEnum } from '@/interfaces/user';
import { BASE_URL } from '@/lib/constants';
import parseFormData from '@/lib/parseFormData';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

const createUserSchema = object({
  fullName: string().required(),
  username: string().required(),
  password: string().required().min(6),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  customerId: string(),
  note: string(),
});

const updateUserSchema = object({
  fullName: string(),
  username: string(),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  customerId: string(),
  note: string(),
});

const userRoute = `${BASE_URL}/api/users`;

type CreateUserDto = InferType<typeof createUserSchema>;
type UpdateUserDto = InferType<typeof updateUserSchema>;

export async function getUsers() {
  return wrappedFetchWithJWT<{ data: User[]; hasNextPage: boolean }>(`${userRoute}/get`, { method: 'POST' });
}

export async function getUserDetail(id: string) {
  return wrappedFetchWithJWT<User>(`${userRoute}/${id}`, { method: 'GET' });
}

export async function createUser(_prevState: HttpException | undefined, formData: FormData) {
  const parsedData = parseFormData(createUserSchema, formData);

  try {
    await createUserSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpException;
  }

  try {
    await wrappedFetchWithJWT<void>(userRoute, {
      method: 'POST',
      body: JSON.stringify(serializeUserData(parsedData)),
    });

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
    await wrappedFetchWithJWT<void>(`${userRoute}/${formData.get('id')}`, {
      method: 'PATCH',
      body: JSON.stringify(serializeUserData(parsedData)),
    });

    return { statusCode: 200 } satisfies HttpException;
  } catch (error) {
    return error as HttpException;
  }
}

export async function deleteUser(id: string) {
  try {
    await wrappedFetchWithJWT<void>(`${userRoute}/${id}`, { method: 'DELETE' });

    return { statusCode: 200 } satisfies HttpException;
  } catch (error) {
    return error as HttpException;
  }
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
