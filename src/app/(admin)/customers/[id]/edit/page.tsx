import { getCustomerDetail } from '@/services/customers';

import CustomerForm from '../../_components/customer-form';

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomerDetail(params.id);

  return <CustomerForm customer={customer} />;
}
