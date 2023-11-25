declare interface HttpException {
  statusCode: 200 | 400 | 403 | 500;
  error?: string;
  message?: string;
}
