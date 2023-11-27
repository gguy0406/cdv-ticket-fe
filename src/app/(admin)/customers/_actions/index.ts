'use server';

import { mixed, object, string } from 'yup';

import { Customer, CustomerStatusEnum } from '@/interfaces/customer';
import { BASE_URL } from '@/lib/constants';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';
import parseFormData from '@/lib/parseFormData';
import { revalidatePath } from 'next/cache';

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

export async function getCustomers() {
  return wrappedFetchWithJWT<{ data: Customer[]; hasNextPage: boolean }>(`${customerRoute}/get`, { method: 'POST' });
}

export async function getCustomerDetail(id: string) {
  return wrappedFetchWithJWT<Customer>(`${customerRoute}/${id}`, { method: 'GET' });
}

export async function createCustomer(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createCustomerSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  try {
    await createCustomerSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpResponse;
  }

  try {
    await wrappedFetchWithJWT<void>(customerRoute, { method: 'POST', body: JSON.stringify(parsedData) });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function updateCustomer(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(updateCustomerSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  try {
    await updateCustomerSchema.validate(parsedData);
  } catch (error) {
    return { statusCode: 400, error: 'Bad Request', message: (error as Error).message } satisfies HttpResponse;
  }

  try {
    await wrappedFetchWithJWT<void>(`${customerRoute}/${formData.get('id')}`, {
      method: 'PUT',
      body: JSON.stringify(parsedData),
    });

    revalidatePath('/customers');

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}

export async function deleteCustomer(id: string) {
  try {
    await wrappedFetchWithJWT<void>(`${customerRoute}/${id}`, { method: 'DELETE' });

    return { statusCode: 200 } satisfies HttpResponse;
  } catch (error) {
    return error as HttpResponse;
  }
}
