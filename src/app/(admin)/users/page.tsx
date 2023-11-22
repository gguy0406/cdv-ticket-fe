import Box from '@mui/material/Box';

import { User } from '@/interfaces/user';
import { wrappedFetchWithJWT } from '@/lib/wrappedFetch';

import UserDialog from './_components/UserDialog';
import UserTable from './_components/UserTable';

async function getUsers() {
  'use server';
  return (await wrappedFetchWithJWT<{ data: User[] }>(`${process.env.API_URL}/api/users/get`, { method: 'POST' })).data;
}

export default function UsersPage() {
  return (
    <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <UserDialog />
      <UserTable getUsers={getUsers} />
    </Box>
  );
}
