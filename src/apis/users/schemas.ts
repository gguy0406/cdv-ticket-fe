import { UserStatusEnum } from '@/interfaces/user';
import { mixed, number, object, string } from 'yup';

export const createUserSchema = object({
  fullName: string().required(),
  username: string().required(),
  password: string().required(),
  status: mixed<UserStatusEnum>().oneOf(Object.values(UserStatusEnum)).required(),
  roleId: string().required(),
  customerId: string().required(),
  note: string(),
});

export const updateUserSchema = object({
  fullName: string(),
  username: string(),
  status: mixed<UserStatusEnum>().oneOf(Object.values(UserStatusEnum)),
  roleId: string(),
  customerId: string(),
  note: string(),
});
