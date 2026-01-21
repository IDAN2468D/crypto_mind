'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha } from '@mui/material/styles';

const notifications = [
    { id: 1, title: 'BTC פרץ התנגדות של $64k!', desc: 'המומנטום חזק.' },
    { id: 2, title: 'איתות חדש: ETH לונג', desc: 'כניסה ב-$3450.' },
    { id: 3, title: 'תיק ההשקעות +5% היום', desc: 'עבודה טובה בהחזקת SOL.' },
    { id: 4, title: 'תחזוקת מערכת', desc: 'מתוכננת להלילה.' }
];

interface NavbarProps {
    handleDrawerToggle?: () => void;
}

export function Navbar({ handleDrawerToggle }: NavbarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: 'rgba(10, 14, 23, 0.7)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                backgroundImage: 'none',
                boxShadow: 'none',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Search Bar */}
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: '16px',
                        background: 'rgba(19, 25, 38, 0.8)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        marginRight: 2,
                        marginLeft: 0,
                        width: '100%',
                        maxWidth: '450px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            border: '1px solid rgba(34, 211, 238, 0.5)',
                            boxShadow: '0 0 10px rgba(34, 211, 238, 0.1)',
                        },
                        '&:focus-within': {
                            border: '1px solid #22D3EE',
                            boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)',
                        }
                    }}
                >
                    <Box
                        sx={{
                            padding: '0 16px',
                            height: '100%',
                            position: 'absolute',
                            right: 0,
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.main',
                        }}
                    >
                        <SearchIcon />
                    </Box>
                    <InputBase
                        placeholder="חפש מטבעות, איתותים, חדשות..."
                        sx={{
                            color: 'inherit',
                            width: '100%',
                            '& .MuiInputBase-input': {
                                padding: '12px 50px 12px 20px',
                                transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                width: '100%',
                                fontSize: '0.95rem'
                            },
                        }}
                    />
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleNotificationClick}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main', bgcolor: 'rgba(34, 211, 238, 0.1)' }
                        }}
                    >
                        <Badge badgeContent={4} color="primary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleNotificationClose}
                        PaperProps={{
                            sx: {
                                bgcolor: 'rgba(19, 25, 38, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                width: 320,
                                mt: 1.5,
                                borderRadius: 3,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                            }
                        }}
                    >
                        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <Typography variant="subtitle1" fontWeight="bold">התראות</Typography>
                        </Box>
                        {notifications.map((notif) => (
                            <MenuItem key={notif.id} onClick={handleNotificationClose} sx={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{notif.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">{notif.desc}</Typography>
                                </Box>
                            </MenuItem>
                        ))}
                        <Box sx={{ p: 1, textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main' }}>צפה בהכל</Typography>
                        </Box>
                    </Menu>

                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            alt="User Name"
                            sx={{
                                bgcolor: 'secondary.main',
                                border: '2px solid rgba(124, 58, 237, 0.5)'
                            }}
                        >
                            U
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    );
}
