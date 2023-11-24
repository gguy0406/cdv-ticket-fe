'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { authenticate } from '@/apis/auth/actions';

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <Box component="form" action={dispatch} sx={{ mt: 1 }}>
      <TextField
        required
        autoFocus
        fullWidth
        name="username"
        autoComplete="username"
        label="Username"
        margin="normal"
        defaultValue="admin"
      />
      <TextField
        required
        fullWidth
        name="password"
        autoComplete="current-password"
        type="password"
        label="Password"
        margin="normal"
        defaultValue="admin"
      />
      <LoginButton />
      {typeof state === 'string' && <div>{state}</div>}
    </Box>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth type="submit" variant="contained" aria-disabled={pending} sx={{ mt: 3, mb: 2 }}>
      Log In
    </Button>
  );
}
