import { auth } from '@/auth';
import { Customer } from '@/interfaces/customer';
import { ALLOW_ACCESS_ROUTE } from '@/lib/constants';

import { getCustomers } from '../customers/_actions';

import { getRoles, getUsers } from './_actions';
import CreateUserDialog from './_components/CreateUserDialog';
import UserTable from './_components/UserTable';

export default async function UsersPage() {
  const session = await auth();
  const users = (await getUsers()).data;
  const roles = await getRoles();

  let customers: Customer[] = [];

  if (ALLOW_ACCESS_ROUTE['/customers'].includes(session!.user.role?.name)) customers = (await getCustomers()).data;

  return (
    <>
      <CreateUserDialog customers={customers} roles={roles} />
      <UserTable users={users} customers={customers} roles={roles} />
    </>
  );
}
