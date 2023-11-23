import { auth } from '@/auth';

function assignDefaultHeader(defaultHeader: HeadersInit, init: RequestInit = {}) {
  init.headers = { ...defaultHeader, ...init.headers };

  return init;
}

export async function wrappedFetch<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const response = await fetch(input, assignDefaultHeader({ 'Content-Type': 'application/json' }, init));
  const data: T = await response.json();

  if (response.ok) {
    return data;
  } else {
    console.error(data);

    const errorMessage = data instanceof Error ? data.message : 'Request failed';

    switch (response.status) {
      default:
        throw new Error(errorMessage);
    }
  }
}

export async function wrappedFetchWithJWT<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  return wrappedFetch(input, assignDefaultHeader({ Authorization: `Bearer ${session.jwt.token}` }, init));
}
