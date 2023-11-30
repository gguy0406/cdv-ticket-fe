import { auth } from '@/auth';
import { Customer } from '@/interfaces/customer';
import { ALLOW_ACCESS_ROUTE } from '@/lib/constants';
import { getCustomers } from '@/services/customers';

import { getRoles, getUsers } from '@/services/user';

import CreateUserDialog from './_components/create-user-dialog';
import UserTable from './_components/user-table';

export default async function UsersPage() {
  const session = await auth();
  const users = (await getUsers()).data;
  const roles = await getRoles();
  const hasSystemPermission = session!.user.role?.name === 'System';

  let customers: Customer[] = [];

  if (ALLOW_ACCESS_ROUTE['/customers'].includes(session!.user.role?.name)) customers = (await getCustomers()).data;

  return (
    <>
      <CreateUserDialog hasSystemPermission={hasSystemPermission} customers={customers} roles={roles} />
      <UserTable hasSystemPermission={hasSystemPermission} users={users} customers={customers} roles={roles} />
    </>
  );
}
