'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { logout } from '@/actions/auth';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const accessDenied = error.message === 'Unauthorized' || error.message === 'Forbidden resource';

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
        {accessDenied ? 'Access denied' : 'Something went wrong!'}
      </Typography>
      {accessDenied ? (
        <Button onClick={async () => await logout()}>Logout and try again</Button>
      ) : (
        <Button onClick={() => reset()}>Try again</Button>
      )}
    </Box>
  );
}
