import { Role } from '@/interfaces/user';

export const BASE_URL = process.env.API_URL;
export const DEFAULT_USER_ROUTE: { [key in Role['name']]: string } = {
  System: '/customers',
  Admin: '/users',
  User: '/events',
};
export const ALLOW_ACCESS_ROUTE: { [key: string]: (Role['name'] | undefined)[] } = {
  '/customers': ['System'],
  '/users': ['System', 'Admin'],
};
