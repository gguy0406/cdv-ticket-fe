import { auth } from '@/auth';

function assignDefaultHeader(defaultHeader: HeadersInit, init: RequestInit = {}) {
  init.headers = { ...defaultHeader, ...init.headers };

  return init;
}

export async function wrappedFetch<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const response = await fetch(input, assignDefaultHeader({ 'Content-Type': 'application/json' }, init));

  let data: T;

  try {
    data = await response.json();
  } catch {}

  if (response.ok) return data!;

  console.error('wrappedFetch error');

  throw new Error((data! as unknown as HttpResponse)?.message, { cause: data! });
}

export async function wrappedFetchWithJWT<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const session = await auth();

  if (!session) {
    console.error('wrappedFetchWithJWT error');

    throw new Error('Unauthorized');
  }

  return wrappedFetch<T>(input, assignDefaultHeader({ Authorization: `Bearer ${session.jwt.token}` }, init));
}
