import Button from '@mui/material/Button';

import { getCustomers } from './_actions';
import CustomerTable from './_components/CustomerTable';

export default async function CustomersPage() {
  const customers = (await getCustomers()).data;

  return (
    <>
      <Button href="/customers/new" variant="outlined">
        New Customer
      </Button>
      <CustomerTable customers={customers} />
    </>
  );
}
