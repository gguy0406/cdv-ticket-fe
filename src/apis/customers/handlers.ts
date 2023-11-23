import { InferType } from 'yup';

import { Customer } from '@/interfaces/customer';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

import { createCustomerSchema, updateCustomerSchema } from './schemas';

const customerRoute = `${BASE_URL}/api/customers`;

export type CreateCustomerDto = InferType<typeof createCustomerSchema>;
export type updateCustomerSchema = InferType<typeof updateCustomerSchema>;

export function getCustomers() {
  return wrappedFetchWithJWT<{ data: Customer[]; hasNextPage: boolean }>(`${customerRoute}/get`, { method: 'POST' });
}

export function getCustomerDetail(id: string) {
  return wrappedFetchWithJWT<Customer>(`${customerRoute}/${id}`, { method: 'GET' });
}

export function createCustomer(data: CreateCustomerDto) {
  return wrappedFetchWithJWT<void>(customerRoute, { method: 'POST', body: JSON.stringify(data) });
}

export function updateCustomer(id: string, data: updateCustomerSchema) {
  return wrappedFetchWithJWT<void>(`${customerRoute}/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteCustomer(id: string) {
  return wrappedFetchWithJWT<Customer>(`${customerRoute}/${id}`, { method: 'DELETE' });
}
