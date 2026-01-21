'use client';

import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    InputBase,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    useScrollTrigger,
    Container
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    AccountBalanceWallet as WalletIcon,
    ShowChart as MarketIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Settings as SettingsIcon,
    AutoGraph as AutoGraphIcon,
    Radar as RadarIcon,
    Bolt as BoltIcon,
    Code as CodeIcon,
    History as HistoryIcon,
    GraphicEq as GraphicEqIcon,
    Public as PublicIcon,
    Waves as WavesIcon,
    Security as SecurityIcon,
    Thunderstorm as ThunderstormIcon,
    ExitToApp as LogoutIcon,
    Close as CloseIcon,
    TrendingUp as TrendingUpIcon,
    Error as ErrorIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Theme Colors
const COLORS = {
    primary: '#f97316', // Orange
    secondary: '#0f172a', // Dark Slate
    text: '#334155',
    textLight: '#cbd5e1',
    bgGlass: 'rgba(255, 255, 255, 0.9)',
    bgGlassDark: 'rgba(15, 23, 42, 0.85)'
};



const NOTIFICATIONS = [
    { id: 1, title: 'BTC פרץ התנגדות!', desc: 'הביטקוין חצה את רף ה-$64k.', time: '2 דק\'', type: 'success' },
    { id: 2, title: 'איתות מסחר חדש', desc: 'כניסה לונג ל-ETH ב-$3450.', time: '15 דק\'', type: 'info' },
    { id: 3, title: 'עדכון תיק השקעות', desc: 'התיק שלך עלה ב-5% היום.', time: '1 ש\'', type: 'success' },
    { id: 4, title: 'תחזוקת מערכת', desc: 'האתר יושבת הלילה ל-30 דקות.', time: '3 ש\'', type: 'warning' }
];

const MENU_ITEMS_CORE = [
    { text: 'לוח בקרה', icon: <DashboardIcon />, path: '/' },
    { text: 'הארנק שלי', icon: <WalletIcon />, path: '/wallet' },
    { text: 'שוק', icon: <MarketIcon />, path: '/market' },
];

const MENU_ITEMS_AI = [
    { text: 'איתותי AI', icon: <AutoGraphIcon />, path: '/signals' },
    { text: 'צייד הנרטיבים', icon: <RadarIcon />, path: '/narrative-hunter' },
    { text: 'אנליסט מקומי', icon: <BoltIcon />, path: '/edge-analyst' },
    { text: 'בניית אלגו', icon: <CodeIcon />, path: '/algo-builder' },
    { text: 'מכונת זמן', icon: <HistoryIcon />, path: '/backtester' },
    { text: 'האזנה לשוק', icon: <GraphicEqIcon />, path: '/sonification' },
    { text: 'מבט תלת-ממדי', icon: <PublicIcon />, path: '/portfolio-galaxy' },
    { text: 'מכ"ם לווייתנים', icon: <WavesIcon />, path: '/whale-watch' },
    { text: 'בדיקת חוזים', icon: <SecurityIcon />, path: '/smart-audit' },
    { text: 'מבחן עמידות', icon: <ThunderstormIcon />, path: '/stress-test' },
];

export function TopNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElAI, setAnchorElAI] = useState<null | HTMLElement>(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);

    // Scroll effect
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleAiMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAI(event.currentTarget);
    };

    const handleAiMenuClose = () => {
        setAnchorElAI(null);
    };

    const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorElNotifications(null);
    };

    const isActive = (path: string) => pathname === path;

    // Mobile Drawer Content
    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: COLORS.primary,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'rotate(45deg)',
                        }}
                    >
                        <Box sx={{ width: 10, height: 10, border: '2px solid white', transform: 'rotate(-45deg)', borderRadius: '2px' }} />
                    </Box>
                    <Typography variant="h6" fontWeight="800" color="#1e293b">CryptoMind</Typography>
                </Box>
                <IconButton onClick={() => setMobileOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={{ px: 2, flexGrow: 1, overflowY: 'auto' }}>
                <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ px: 2, mb: 1, display: 'block' }}>תפריט ראשי</Typography>
                {MENU_ITEMS_CORE.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        href={item.path}
                        selected={isActive(item.path)}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: isActive(item.path) ? `${COLORS.primary}15` : 'transparent',
                            color: isActive(item.path) ? COLORS.primary : 'text.primary',
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? COLORS.primary : 'text.secondary', minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive(item.path) ? 700 : 500 }} />
                    </ListItemButton>
                ))}

                <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ px: 2, mb: 1, mt: 2, display: 'block' }}>כלי AI מתקדמים</Typography>
                {MENU_ITEMS_AI.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        href={item.path}
                        selected={isActive(item.path)}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: isActive(item.path) ? `${COLORS.primary}15` : 'transparent',
                            color: isActive(item.path) ? COLORS.primary : 'text.primary',
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? COLORS.primary : 'text.secondary', minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive(item.path) ? 700 : 500 }} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
                <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: 'error.main' }}>
                    <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="התנתק" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    pointerEvents: 'none', // Allow clicking through the empty areas
                }}
            >
                <Container maxWidth="xl" sx={{ pointerEvents: 'auto' }}>
                    <Toolbar
                        disableGutters
                        sx={{
                            height: 70,
                            gap: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.8)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                            px: 3,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        {/* Logo */}
                        <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: 'rotate(45deg)',
                                    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                                }}
                            >
                                <Box sx={{ width: 12, height: 12, border: '2px solid white', transform: 'rotate(-45deg)', borderRadius: '2px' }} />
                            </Box>
                            <Typography variant="h5" fontWeight="800" sx={{ background: `linear-gradient(45deg, #1e293b, #334155)`, backgroundClip: 'text', WebkitTextFillColor: 'transparent', display: { xs: 'none', sm: 'block' }, letterSpacing: '-0.5px' }}>
                                CryptoMind
                            </Typography>
                        </Box>

                        {/* Desktop Nav Links */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, ml: 4, flexGrow: 1 }}>
                            {MENU_ITEMS_CORE.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    href={item.path}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.2,
                                        color: isActive(item.path) ? 'white' : '#64748b',
                                        fontWeight: isActive(item.path) ? 700 : 600,
                                        bgcolor: isActive(item.path) ? COLORS.primary : 'transparent',
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: '16px',
                                        fontSize: '0.95rem',
                                        '&:hover': {
                                            bgcolor: isActive(item.path) ? COLORS.primary : '#f1f5f9',
                                            color: isActive(item.path) ? 'white' : '#1e293b',
                                            transform: 'translateY(-1px)'
                                        },
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    {/* Icon - Explicitly placed for RTL (Right side of text) */}
                                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}>
                                        {item.icon}
                                    </Box>
                                    <span>{item.text}</span>
                                </Button>
                            ))}

                            {/* AI Tools Dropdown */}
                            <Button
                                onClick={handleAiMenuOpen}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: pathname.includes('/signals') || pathname.includes('/narrative') ? COLORS.primary : '#64748b',
                                    fontWeight: 700,
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '16px',
                                    '&:hover': { bgcolor: '#f1f5f9', color: '#1e293b' }
                                }}
                            >
                                <span>כלי AI</span>
                                <ArrowDownIcon sx={{ transition: 'transform 0.2s', transform: Boolean(anchorElAI) ? 'rotate(180deg)' : 'rotate(0)' }} />
                            </Button>
                            <Menu
                                anchorEl={anchorElAI}
                                open={Boolean(anchorElAI)}
                                onClose={handleAiMenuClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        mt: 1.5,
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)',
                                        width: 260,
                                        overflow: 'visible',
                                        '&:before': { // Arrow
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            left: 20, // RTL adjustment might be needed
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'white',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                            borderLeft: '1px solid #e2e8f0',
                                            borderTop: '1px solid #e2e8f0',
                                        },
                                    }
                                }}
                                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            >
                                {MENU_ITEMS_AI.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        component={Link}
                                        href={item.path}
                                        onClick={handleAiMenuClose}
                                        selected={isActive(item.path)}
                                        sx={{
                                            gap: 2,
                                            py: 1.5,
                                            mx: 1,
                                            borderRadius: '10px',
                                            '&.Mui-selected': { bgcolor: '#f0f9ff', color: COLORS.primary }
                                        }}
                                    >
                                        <Box sx={{ color: isActive(item.path) ? COLORS.primary : '#94a3b8' }}>{item.icon}</Box>
                                        <Typography variant="body2" fontWeight={isActive(item.path) ? 700 : 500}>{item.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Search & Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* Mini Search for TopNav */}
                            <Box sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                bgcolor: '#f1f5f9',
                                borderRadius: '12px',
                                px: 2,
                                py: 0.8,
                                mr: 2,
                                width: 200,
                                transition: 'width 0.3s',
                                '&:focus-within': { width: 300, bgcolor: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
                            }}>
                                <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                <InputBase
                                    placeholder="חיפוש..."
                                    sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
                                />
                            </Box>

                            <IconButton
                                onClick={handleNotificationsOpen}
                                sx={{ color: '#64748b' }}
                            >
                                <Badge badgeContent={NOTIFICATIONS.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNotifications}
                                open={Boolean(anchorElNotifications)}
                                onClose={handleNotificationsClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        mt: 1.5,
                                        width: 360,
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.5)',
                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '0 20px 60px -10px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)',
                                        overflow: 'hidden',
                                        transformOrigin: 'top left',
                                    }
                                }}
                                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            >
                                <Box sx={{
                                    p: 2.5,
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="h6" fontWeight="800" color="#1e293b">התראות</Typography>
                                        <Box sx={{ bgcolor: '#fee2e2', color: '#ef4444', px: 1, py: 0.2, borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>4 חדשות</Box>
                                    </Box>
                                    <Typography variant="caption" fontWeight="600" sx={{ color: COLORS.primary, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                        סמן הכל כנקרא
                                    </Typography>
                                </Box>

                                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                    {NOTIFICATIONS.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={handleNotificationsClose}
                                            sx={{
                                                whiteSpace: 'normal',
                                                borderBottom: '1px solid rgba(0,0,0,0.03)',
                                                p: 2,
                                                gap: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': { bgcolor: 'rgba(249, 115, 22, 0.04)' }
                                            }}
                                        >
                                            {/* Icon Avatars */}
                                            <Box
                                                sx={{
                                                    minWidth: 44,
                                                    height: 44,
                                                    borderRadius: '14px',
                                                    bgcolor: item.type === 'success' ? '#dcfce7' : item.type === 'warning' ? '#ffedd5' : '#e0f2fe',
                                                    color: item.type === 'success' ? '#16a34a' : item.type === 'warning' ? '#ea580c' : '#0284c7',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {item.type === 'success' ? <TrendingUpIcon fontSize="small" /> : item.type === 'warning' ? <ThunderstormIcon fontSize="small" /> : <BoltIcon fontSize="small" />}
                                            </Box>

                                            <Box sx={{ flex: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                                    <Typography variant="subtitle2" fontWeight="700" color="#1e293b" sx={{ lineHeight: 1.2 }}>{item.title}</Typography>
                                                    <Typography variant="caption" color="text.secondary" fontWeight="500">{item.time}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="#64748b" sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}>{item.desc}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Box>

                                <Box sx={{ p: 0 }}>
                                    <Button
                                        component={Link}
                                        href="/notifications"
                                        onClick={handleNotificationsClose}
                                        fullWidth
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 0,
                                            color: '#64748b',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            bgcolor: '#f8fafc',
                                            '&:hover': { bgcolor: '#f1f5f9', color: COLORS.primary }
                                        }}
                                    >
                                        צפה בכל ההתראות
                                    </Button>
                                </Box>
                            </Menu>

                            <IconButton component={Link} href="/settings" sx={{ color: isActive('/settings') ? COLORS.primary : '#64748b' }}>
                                <SettingsIcon />
                            </IconButton>

                            <Avatar
                                component={Link}
                                href="/profile"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: COLORS.primary,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    ml: 1,
                                    textDecoration: 'none'
                                }}
                            >
                                U
                            </Avatar>

                            {/* Mobile Menu Button */}
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                sx={{ display: { md: 'none' }, ml: 1, color: '#1e293b' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right" // RTL
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawerContent}
            </Drawer>
        </React.Fragment>
    );
}

// Add padding to body to prevent content hidden behind fixed/sticky header
export const TopNavSpacer = () => <Box sx={{ height: 80 }} />;
