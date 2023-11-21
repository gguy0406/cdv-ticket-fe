export default async function wrappedFetch<T>(...args: Parameters<typeof fetch>): Promise<T> {
  const response = await fetch(...args);
  const data: T = await response.json();

  if (response.ok) {
    return data;
  } else {
    const errorMessage = data instanceof Error ? data.message : 'Request failed';

    switch (response.status) {
      default:
        throw new Error(errorMessage);
    }
  }
}
