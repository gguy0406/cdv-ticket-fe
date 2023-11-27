import Container from '@mui/material/Container';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CDV Ticket',
  description: 'cdv ticket',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <Container
        disableGutters
        component="body"
        className={inter.className}
        maxWidth={false}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {children}
      </Container>
    </html>
  );
}
