import Box from '@mui/material/Box';

import Nav from '@/components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        Home page, event list, LP
      </Box>
    </>
  );
}
