export async function wrappedValidateAction(validateAction: Promise<any>) {
  try {
    await validateAction;
  } catch (error) {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message: (error as Error).message,
    } satisfies HttpResponse as HttpResponse;
  }
}

export async function wrappedFetchAction(fetchAction: Promise<any>) {
  try {
    await fetchAction;

    return { statusCode: 200 } satisfies HttpResponse as HttpResponse;
  } catch (error) {
    if (error instanceof Error) return (error as Error).cause as HttpResponse;

    throw error;
  }
}
