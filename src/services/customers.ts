import { InferType, mixed, object, string } from 'yup';

import { Customer, CustomerStatusEnum } from '@/interfaces/customer';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrapped-fetch';

const customerRoute = `${BASE_URL}/api/customers`;

export type CreateCustomerDto = InferType<typeof createCustomerSchema>;
export type UpdateCustomerDto = InferType<typeof updateCustomerSchema>;

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

export async function getCustomers() {
  return wrappedFetchWithJWT<{ data: Customer[]; hasNextPage: boolean }>(`${customerRoute}/get`, { method: 'POST' });
}

export async function getCustomerDetail(id: string) {
  return wrappedFetchWithJWT<Customer>(`${customerRoute}/${id}`, { method: 'GET' });
}

export async function createCustomer(data: CreateCustomerDto) {
  return wrappedFetchWithJWT<void>(customerRoute, { method: 'POST', body: JSON.stringify(data) });
}

export async function updateCustomer(id: string, data: UpdateCustomerDto) {
  return wrappedFetchWithJWT<void>(`${customerRoute}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function deleteCustomer(id: string) {
  return wrappedFetchWithJWT<void>(`${customerRoute}/${id}`, { method: 'DELETE' });
}
