import { join } from 'path';
import { AnyObject, ObjectSchema } from 'yup';
import { NEXT_PUBLIC_ASSET_URL } from './constants';

export function parseFormData(schema: ObjectSchema<AnyObject>, formData: FormData) {
  const formDataObject = Object.fromEntries(formData);

  return Object.keys(schema.fields).reduce((data: Record<string, any>, key) => {
    data[key] = formDataObject[key];

    return data;
  }, {});
}

export function getBlobURL(location?: string) {
  if (!location) return '';
  return `${NEXT_PUBLIC_ASSET_URL}/${location}`;
}
