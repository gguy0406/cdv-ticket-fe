import { BaseEntity } from './base-entity';

export interface Customer extends BaseEntity {
  name: string;
  taxNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: CustomerStatusEnum;
  note?: string;
}

export enum CustomerStatusEnum {
  Active = 'Active',
  Inactive = 'Inactive',
}
