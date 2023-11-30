import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LoginForm from './_components/login-form';

export default function LoginPage() {
  return (
    <Box
      component="main"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <LoginForm />
    </Box>
  );
}
