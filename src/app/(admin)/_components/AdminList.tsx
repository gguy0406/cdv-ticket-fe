'use client';

import { usePathname } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FiSlack, FiUsers } from 'react-icons/fi';

import { User } from '@/interfaces/user';

export default function AdminList({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <List>
      {user.role?.name === 'System' && (
        <ListItem disablePadding>
          <ListItemButton href="/customers" selected={pathname === '/customers'}>
            <ListItemIcon>
              <FiSlack />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
      )}
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
