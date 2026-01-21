'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HistoryIcon from '@mui/icons-material/History';
import PublicIcon from '@mui/icons-material/Public';
import WavesIcon from '@mui/icons-material/Waves';
import BoltIcon from '@mui/icons-material/Bolt';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import RadarIcon from '@mui/icons-material/Radar';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 280;

interface SidebarProps {
    mobileOpen?: boolean;
    handleDrawerToggle?: () => void;
}

export function Sidebar({ mobileOpen = false, handleDrawerToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const menuItems = [
        { text: 'לוח בקרה', icon: <DashboardIcon />, path: '/' },
        { text: 'הארנק שלי', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
        { text: 'איתותי AI', icon: <AutoGraphIcon />, path: '/signals' },
        { text: 'צייד הנרטיבים', icon: <RadarIcon />, path: '/narrative-hunter' },
        { text: 'אנליסט מקומי (Edge AI)', icon: <BoltIcon />, path: '/edge-analyst' },
        { text: 'בניית אלגו (Algo Builder)', icon: <CodeIcon />, path: '/algo-builder' },
        { text: 'מכונת זמן', icon: <HistoryIcon />, path: '/backtester' },
        { text: 'האזנה לשוק', icon: <GraphicEqIcon />, path: '/sonification' },
        { text: 'מבט תלת-ממדי', icon: <PublicIcon />, path: '/portfolio-galaxy' },
        { text: 'מכ"ם לווייתנים', icon: <WavesIcon />, path: '/whale-watch' },
        { text: 'בדיקת חוזים (Bodyguard)', icon: <SecurityIcon />, path: '/smart-audit' },
        { text: 'מבחן עמידות', icon: <ThunderstormIcon />, path: '/stress-test' },
        { text: 'שוק', icon: <ShowChartIcon />, path: '/market' },
        { text: 'הגדרות', icon: <SettingsIcon />, path: '/settings' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {/* Logo Area */}
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#ef4444', // Red/Orange logo like the image
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(45deg)', // Diamond shape
                        boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                    }}
                >
                    <Box sx={{ width: 12, height: 12, border: '2px solid white', transform: 'rotate(-45deg)', borderRadius: '2px' }} />
                </Box>
                <Box sx={{ typography: 'h5', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>
                    CryptoMind
                </Box>
            </Box>

            <List sx={{ px: 2, mt: 1 }}>
                <Typography variant="caption" sx={{ px: 2, mb: 1, display: 'block', color: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}>PAGES</Typography>
                {menuItems.slice(0, 8).map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={isActive}
                                onClick={handleDrawerToggle}
                                sx={{
                                    borderRadius: '8px',
                                    pl: 2,
                                    py: 1.2,
                                    color: isActive ? 'white' : '#64748b',
                                    bgcolor: isActive ? '#f97316' : 'transparent', // Orange background for active
                                    backgroundImage: isActive ? 'linear-gradient(45deg, #f97316, #ea580c)' : 'none',
                                    boxShadow: isActive ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none',
                                    '&:hover': {
                                        bgcolor: isActive ? '#f97316' : 'rgba(0,0,0,0.03)',
                                        color: isActive ? 'white' : '#1e293b',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'transparent' }
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        color: 'inherit',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.9rem',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                {isActive && (
                                    <ArrowForwardIosIcon sx={{ fontSize: 12, ml: 'auto', opacity: 0.8 }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}

                <Typography variant="caption" sx={{ px: 2, mb: 1, mt: 3, display: 'block', color: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}>TOOLS</Typography>
                {menuItems.slice(8).map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={isActive}
                                onClick={handleDrawerToggle}
                                sx={{
                                    borderRadius: '8px',
                                    pl: 2,
                                    py: 1.2,
                                    color: isActive ? 'white' : '#64748b',
                                    bgcolor: isActive ? '#f97316' : 'transparent', // Orange background for active
                                    backgroundImage: isActive ? 'linear-gradient(45deg, #f97316, #ea580c)' : 'none',
                                    boxShadow: isActive ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none',
                                    '&:hover': {
                                        bgcolor: isActive ? '#f97316' : 'rgba(0,0,0,0.03)',
                                        color: isActive ? 'white' : '#1e293b',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'transparent' }
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.9rem' }} />
                                {isActive && <ArrowForwardIosIcon sx={{ fontSize: 12, ml: 'auto', opacity: 0.8 }} />}
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <List sx={{ px: 2, pb: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            borderRadius: '12px',
                            color: '#ef4444',
                            '&:hover': {
                                bgcolor: 'rgba(239, 68, 68, 0.05)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="התנתק"
                            primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                anchor="right"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        bgcolor: '#ffffff', // White sidebar
                        borderLeft: '1px solid #e2e8f0'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        bgcolor: '#ffffff', // White sidebar for Extej design
                        borderLeft: '1px solid #e2e8f0',
                        boxShadow: '5px 0 25px rgba(0,0,0,0.03)'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
