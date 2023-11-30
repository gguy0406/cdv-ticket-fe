'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import { FiSlack, FiUsers } from 'react-icons/fi';

import { User } from '@/interfaces/user';
import { ALLOW_ACCESS_ROUTE } from '@/lib/constants';

export default function AdminList({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <List>
      {ALLOW_ACCESS_ROUTE['/customers'].includes(user.role?.name) && (
        <ListItem disablePadding>
          <ListItemButton href="/customers" selected={pathname === '/customers'}>
            <ListItemIcon>
              <FiSlack />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
      )}
      {ALLOW_ACCESS_ROUTE['/users'].includes(user.role?.name) && (
        <ListItem disablePadding>
          <ListItemButton href="/users" selected={pathname === '/users'}>
            <ListItemIcon>
              <FiUsers />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
        </ListItem>
      )}
      <ListItem disablePadding>
        <ListItemButton href="/events" selected={pathname === '/events'}>
          <ListItemIcon>
            <FiUsers />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
