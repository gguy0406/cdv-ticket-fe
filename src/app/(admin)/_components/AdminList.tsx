'use client';

import { usePathname } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FiSlack, FiUsers } from 'react-icons/fi';

export default function AdminList() {
  const pathname = usePathname();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton href="/customers" selected={pathname === '/customers'}>
          <ListItemIcon>
            <FiSlack />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href="/users" selected={pathname === '/users'}>
          <ListItemIcon>
            <FiUsers />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
