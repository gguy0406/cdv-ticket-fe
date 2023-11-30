import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/auth';

import AccountMenu from './account-menu';

export default async function Nav() {
  const session = await auth();

  return (
    <AppBar elevation={0} position="static" color="inherit" className="border-b-2">
      <Toolbar component="nav" sx={{ justifyContent: 'space-between' }}>
        <Link href="/">
          <Image src="/logo/logo.png" width={148} height={30} alt="CDV Ticket logo" priority={true} />
        </Link>
        {session?.user ? <AccountMenu user={session.user} /> : <Button href="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  );
}
