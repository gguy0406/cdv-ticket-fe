import { getCustomerDetail } from '../../_actions';
import CustomerForm from '../../_components/CustomerForm';

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomerDetail(params.id);

  return <CustomerForm customer={customer} />;
}
