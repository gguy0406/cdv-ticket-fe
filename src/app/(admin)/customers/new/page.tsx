import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CustomerForm from '../_components/CustomerForm';

export default function NewCustomerPage() {
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
      <CustomerForm />
    </Box>
  );
}
