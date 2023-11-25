import { getCustomers } from '../customers/_actions';

import { getUsers } from './_actions';
import CreateUserDialog from './_components/CreateUserDialog';
import UserTable from './_components/UserTable';

export default async function UsersPage() {
  const customers = (await getCustomers()).data;
  const users = (await getUsers()).data;

  return (
    <>
      <CreateUserDialog customers={customers} />
      <UserTable users={users} customers={customers} />
    </>
  );
}
