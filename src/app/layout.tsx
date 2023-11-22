import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Container from '@mui/material/Container';

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
        sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </Container>
    </html>
  );
}
