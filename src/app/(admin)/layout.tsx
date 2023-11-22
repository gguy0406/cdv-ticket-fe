import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Nav from '@/components/Nav';

import AdminList from './_components/AdminList';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex' }}>
        <Drawer
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
          <AdminList />
        </Drawer>
        <Box component="section" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
