import { AnyObject, ObjectSchema } from 'yup';

export default function parseFormData(schema: ObjectSchema<AnyObject>, formData: FormData) {
  const formDataObject = Object.fromEntries(formData);

  return Object.keys(schema.fields).reduce((data: Record<string, any>, key) => {
    data[key] = formDataObject[key];

    return data;
  }, {});
}
