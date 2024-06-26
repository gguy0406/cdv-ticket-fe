'use client';

import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { BaseSyntheticEvent, useState } from 'react';
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

import { logout } from '@/actions/auth';
import { User } from '@/interfaces/user';
import { DEFAULT_USER_ROUTE } from '@/lib/constants';

export default function AccountMenu({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        startIcon={<FiUser />}
        endIcon={<FiChevronDown />}
      >
        {user.fullName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
      >
        <Link href={DEFAULT_USER_ROUTE[user.role?.name || 'User']}>
          <MenuItem>
            <ListItemIcon>
              <FiSettings />
            </ListItemIcon>
            Setting
          </MenuItem>
        </Link>
        <MenuItem onClick={async () => await logout()}>
          <ListItemIcon>
            <FiLogOut />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
