import { auth } from '@/auth';

function assignDefaultHeader(defaultHeader: HeadersInit, init: RequestInit = {}) {
  // TODO: move into middleware
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

  console.error(data!);

  throw data!;
}

export async function wrappedFetchWithJWT<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  const session = await auth();

  if (!session) throw { statusCode: 401, error: 'Unauthorized' };

  return wrappedFetch(input, assignDefaultHeader({ Authorization: `Bearer ${session.jwt.token}` }, init));
}
