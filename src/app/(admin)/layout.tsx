import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Nav from '@/app/_components/nav';
import { auth } from '@/auth';

import AdminList from './_components/admin-list';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <>
      <Nav />
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, minHeight: 0, display: 'flex' }}>
        <Drawer
          component="aside"
          variant="permanent"
          anchor="left"
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              position: 'static',
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          <AdminList user={session!.user} />
        </Drawer>
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
