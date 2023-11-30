import Button from '@mui/material/Button';

import { getCustomers } from '@/services/customers';

import CustomerTable from './_components/customer-table';

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
