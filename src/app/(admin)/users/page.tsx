import { getCustomers } from '../customers/_actions';

import { getRoles, getUsers } from './_actions';
import CreateUserDialog from './_components/CreateUserDialog';
import UserTable from './_components/UserTable';

export default async function UsersPage() {
  const users = (await getUsers()).data;
  const customers = (await getCustomers()).data;
  const roles = await getRoles();

  return (
    <>
      <CreateUserDialog customers={customers} roles={roles} />
      <UserTable users={users} customers={customers} roles={roles} />
    </>
  );
}
