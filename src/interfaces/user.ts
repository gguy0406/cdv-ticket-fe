import { object, string } from 'yup';

import { BaseEntity } from './base-entity';
import { Customer } from './customer';

export const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export interface User extends BaseEntity {
  fullName: string;
  username: string;
  password: string;
  status: UserStatusEnum;
  note?: string;
  customer?: Customer;
  role?: Role;
}

export enum UserStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface Role {
  id: number;
  name?: string;
}

export interface LoginAPIResponse {
  token: string;
  tokenExpires: number;
  user: User;
}
