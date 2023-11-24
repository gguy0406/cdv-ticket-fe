import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { getCustomers } from '@/apis/customers/handlers';
import { getUsers } from '@/apis/users/handlers';

import UserDialog from './_components/UserDialog';
import UserTable from './_components/UserTable';

async function _getUsers() {
  'use server';
  return (await getUsers()).data;
}

export default async function UsersPage() {
  const customers = (await getCustomers()).data;

  return (
    <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <UserDialog customers={customers} triggerBtn={<Button variant="outlined">New User</Button>} />
      <UserTable getUsers={_getUsers} customers={customers} />
    </Box>
  );
}
