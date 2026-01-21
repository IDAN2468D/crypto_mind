'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from '@/src/theme';
import { TopNav, TopNavSpacer } from '@/src/components/TopNav';
import { GeminiAgent } from '@/src/components/GeminiAgent';
import WelcomeTour from '@/src/components/WelcomeTour';
import { AgentProvider } from '@/src/context/AgentContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="he" dir="rtl">
      <body id="__next">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AgentProvider>
              {pathname === '/login' || pathname === '/register' ? (
                // Full screen layout for Auth pages
                <Box component="main" sx={{ minHeight: '100vh', position: 'relative' }}>
                  {children}
                </Box>
              ) : (
                // Dashboard layout for other pages
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: pathname === '/wallet' ? '#f8fafc' : 'background.default', // Light grey for wallet
                    backgroundImage: pathname === '/wallet'
                      ? 'none'
                      : 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 100%)',
                    position: 'relative',
                    '&::before': pathname === '/wallet' ? { content: 'none' } : {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px)',
                      backgroundSize: '30px 30px',
                      opacity: 0.2,
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <TopNav />
                  <TopNavSpacer />

                  {/* Main Content Area */}
                  <Box component="main" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1, position: 'relative', zIndex: 1 }}>
                    {children}
                  </Box>
                  <GeminiAgent />
                  <WelcomeTour />
                </Box>
              )}
            </AgentProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
