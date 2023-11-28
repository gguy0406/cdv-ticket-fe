import { auth, signOut } from '@/auth';

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

  console.error('wrappedFetch error', data!);

  throw data!;
}

export async function wrappedFetchWithJWT<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const session = await auth();

  if (!session) throw { statusCode: 401, error: 'Unauthorized' };

  try {
    return wrappedFetch<T>(input, assignDefaultHeader({ Authorization: `Bearer ${session.jwt.token}` }, init));
  } catch (error) {
    console.error('wrappedFetchWithJWT error', error);

    if ((error as HttpResponse).statusCode === 401) await signOut();

    throw error;
  }
}
