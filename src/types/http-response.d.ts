declare interface HttpResponse {
  statusCode: 200 | 400 | 401 | 403 | 500;
  error?: string;
  message?: string;
}
