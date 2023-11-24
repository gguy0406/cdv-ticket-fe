import { UserStatusEnum } from '@/interfaces/user';
import { mixed, number, object, string } from 'yup';

export const createUserSchema = object({
  fullName: string().required(),
  username: string().required(),
  password: string().required().min(6),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  customerId: string(),
  note: string(),
});

export const updateUserSchema = object({
  fullName: string(),
  username: string(),
  status: mixed<UserStatusEnum | ''>().oneOf([...Object.values(UserStatusEnum), '']),
  roleId: string(),
  customerId: string(),
  note: string(),
});
