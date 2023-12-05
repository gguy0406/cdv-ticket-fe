'use server';

import { auth } from '@/auth';
import { CDVBlob } from '@/interfaces/blob';
import { BASE_URL } from '@/lib/constants';

export async function uploadBlob(formData: FormData) {
  const session = await auth();

  if (!session) {
    console.error('wrappedFetchWithJWT error');

    throw new Error('Unauthorized');
  }

  const response = await fetch(`${BASE_URL}/api/blobs/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.jwt.token}` },
    body: formData,
  });

  let data: CDVBlob;

  try {
    data = await response.json();
  } catch {}

  if (response.ok) return data!;

  console.error('upload error');

  throw new Error((data! as unknown as HttpResponse)?.message, { cause: data! });
}
