import { InferType, mixed, object, string } from 'yup';

import { Customer, CustomerStatusEnum } from '@/interfaces/customer';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

const createCustomerSchema = object({
  name: string().required(),
  taxNumber: string().required(),
  email: string().email().required(),
  phoneNumber: string().required(),
  address: string().required(),
  status: mixed<CustomerStatusEnum>().oneOf(Object.values(CustomerStatusEnum)).required(),
  note: string(),
});

const updateCustomerSchema = object({
  name: string(),
  taxNumber: string(),
  email: string().email(),
  phoneNumber: string(),
  address: string(),
  status: mixed<CustomerStatusEnum>().oneOf(Object.values(CustomerStatusEnum)),
  note: string(),
});

const customerRoute = `${BASE_URL}/api/customers`;

type CreateCustomerDto = InferType<typeof createCustomerSchema>;
type updateCustomerSchema = InferType<typeof updateCustomerSchema>;

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
