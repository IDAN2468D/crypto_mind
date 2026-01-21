'use client';
import { createTheme } from '@mui/material/styles';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0E17',
      paper: '#131926',
    },
    primary: {
      main: '#22D3EE', // Neon Cyan
    },
    secondary: {
      main: '#7C3AED', // Electric Violet
    },
    text: {
      primary: '#fff',
      secondary: '#94A3B8',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#3b82f6',
    }
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontSize: '1.5rem', fontWeight: 700 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.1rem', fontWeight: 600 },
    subtitle1: { fontSize: '1rem', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0E17',
          color: '#fff',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: '#0A0E17' },
          '&::-webkit-scrollbar-thumb': { background: '#1e293b', borderRadius: '4px' },
          '&::-webkit-scrollbar-thumb:hover': { background: '#334155' },
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#131926',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'rgba(19, 25, 38, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(34, 211, 238, 0.2)',
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #22D3EE 20%, #0EA5E9 100%)',
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 0',
          '&.Mui-selected': {
            backgroundColor: 'rgba(34, 211, 238, 0.08)',
            borderRight: '3px solid #22D3EE',
          }
        }
      }
    }
  }
});

// Augment the theme to include custom properties if needed, 
// strictly creating what's requested for now.

export default theme;
