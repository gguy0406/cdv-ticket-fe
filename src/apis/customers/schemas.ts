import { mixed, object, string } from 'yup';

import { CustomerStatusEnum } from '@/interfaces/customer';

export const createCustomerSchema = object({
  name: string().required(),
  taxNumber: string().required(),
  email: string().email().required(),
  phoneNumber: string().required(),
  address: string().required(),
  status: mixed<CustomerStatusEnum>().oneOf(Object.values(CustomerStatusEnum)).required(),
  note: string(),
});

export const updateCustomerSchema = object({
  name: string(),
  taxNumber: string(),
  email: string().email(),
  phoneNumber: string(),
  address: string(),
  status: mixed<CustomerStatusEnum>().oneOf(Object.values(CustomerStatusEnum)),
  note: string(),
});
