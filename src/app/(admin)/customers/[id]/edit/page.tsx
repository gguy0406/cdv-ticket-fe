import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CustomerForm from '../../_components/CustomerForm';
import { getCustomerDetail } from '../../_actions';

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomerDetail(params.id);

  return (
    <Box
      sx={{
        marginTop: 8,
        marginX: 10,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Create New Customer
      </Typography>
      <CustomerForm customer={customer} />
    </Box>
  );
}
