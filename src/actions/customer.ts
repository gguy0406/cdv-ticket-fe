'use server';

import { revalidatePath } from 'next/cache';

import { parseFormData } from '@/lib/parse-form-data';
import { wrappedFetchAction, wrappedValidateAction } from '@/lib/wrapped-action';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  createCustomer as createCustomerService,
  createCustomerSchema,
  deleteCustomer as deleteCustomerService,
  updateCustomer as updateCustomerService,
  updateCustomerSchema,
} from '@/services/customers';

export async function createCustomer(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createCustomerSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  const validationError = await wrappedValidateAction(createCustomerSchema.validate(parsedData));

  if (validationError) return validationError;

  return wrappedFetchAction(createCustomerService(parsedData as CreateCustomerDto));
}

export async function updateCustomer(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(updateCustomerSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  const validationError = await wrappedValidateAction(updateCustomerSchema.validate(parsedData));

  if (validationError) return validationError;

  const customerId = formData.get('id') as string;
  const res = await wrappedFetchAction(updateCustomerService(customerId, parsedData as UpdateCustomerDto));

  if (res.statusCode === 200) revalidatePath('/customers');

  return res;
}

export async function deleteCustomer(id: string) {
  return wrappedFetchAction(deleteCustomerService(id));
}
