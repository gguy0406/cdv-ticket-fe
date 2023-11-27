import { BaseEntity } from './base-entity';
import { Customer } from './customer';

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
  id: string;
  name: 'System' | 'Admin' | 'User';
}
