'use server';
import { parseFormData } from '@/lib/parse-form-data';
import { createEventSchema } from '@/services/event';

export async function createEventX(_prevState: HttpResponse | undefined, formData: FormData) {
  const parsedData = parseFormData(createEventSchema, formData);

  if (!parsedData.status) delete parsedData.status;

  const validationError = await wrappedValidateAction(createUserSchema.validate(parsedData));

  if (validationError) return validationError;

  return wrappedFetchAction(createUserService(parsedData as CreateUserDto));
}
