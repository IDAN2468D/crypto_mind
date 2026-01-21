'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Chip,
    Divider,
    Tabs,
    Tab,
    Button
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Thunderstorm as ThunderstormIcon,
    Bolt as BoltIcon,
    CheckCircle as CheckCircleIcon,
    Delete as DeleteIcon,
    NotificationsActive as NotificationsActiveIcon,
    Info as InfoIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import { TopNavSpacer } from '../../src/components/TopNav';

// Mock Data
const ALL_NOTIFICATIONS = [
    { id: 1, title: 'BTC פרץ התנגדות!', desc: 'הביטקוין חצה את רף ה-$64k בנפח מסחר גבוה.', time: 'לפני 2 דקות', type: 'success', read: false },
    { id: 2, title: 'איתות מסחר חדש', desc: 'כניסה לונג ל-ETH ב-$3450. יעד ראשון $3600.', time: 'לפני 15 דקות', type: 'info', read: false },
    { id: 3, title: 'עדכון תיק השקעות', desc: 'התיק שלך עלה ב-5% היום בעקבות עליית SOL.', time: 'לפני שעה', type: 'success', read: false },
    { id: 4, title: 'תחזוקת מערכת', desc: 'האתר יושבת הלילה ל-30 דקות לצורך שדרוגים.', time: 'לפני 3 שעות', type: 'warning', read: false },
    { id: 5, title: 'התראת מחיר: SOL', desc: 'סולאנה ירדה מתחת ל-$140.', time: 'אתמול', type: 'error', read: true },
    { id: 6, title: 'בונוס הצטרפות', desc: 'קיבלת 50 נקודות לשימוש במערכת!', time: 'לפני יומיים', type: 'success', read: true },
    { id: 7, title: 'עדכון גרסה 2.5', desc: 'מערכת ה-AI שודרגה עם יכולות חדשות.', time: 'לפני 3 ימים', type: 'info', read: true },
    { id: 8, title: 'אבטחה', desc: 'זוהתה כניסה חדשה לחשבונך מתל אביב.', time: 'לפני שבוע', type: 'warning', read: true },
];

export default function NotificationsPage() {
    const [tabValue, setTabValue] = useState(0);
    const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleDelete = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleMarkAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getFilteredNotifications = () => {
        if (tabValue === 0) return notifications;
        if (tabValue === 1) return notifications.filter(n => !n.read);
        if (tabValue === 2) return notifications.filter(n => n.type === 'warning' || n.type === 'error');
        return notifications;
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <TrendingUpIcon />;
            case 'warning': return <WarningIcon />;
            case 'error': return <ThunderstormIcon />;
            case 'info': default: return <InfoIcon />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'success': return '#10b981'; // Green
            case 'warning': return '#f59e0b'; // Amber
            case 'error': return '#ef4444'; // Red
            case 'info': default: return '#3b82f6'; // Blue
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'success': return '#ecfdf5';
            case 'warning': return '#fffbeb';
            case 'error': return '#fef2f2';
            case 'info': default: return '#eff6ff';
        }
    };

    const filteredNotifications = getFilteredNotifications();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', pb: 8 }}>
            <TopNavSpacer />

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" fontWeight="800" color="#1e293b" gutterBottom>
                            מרכז ההתראות
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            עדכונים שוטפים על השוק, התיק שלך והמערכת
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleMarkAllRead}
                        startIcon={<CheckCircleIcon />}
                        sx={{ borderRadius: '12px', textTransform: 'none' }}
                    >
                        סמן הכל כנקרא
                    </Button>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        bgcolor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, bgcolor: 'rgba(255,255,255,0.5)' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification filters">
                            <Tab label="הכל" sx={{ fontWeight: 600 }} />
                            <Tab label="לא נקראו" sx={{ fontWeight: 600 }} />
                            <Tab label="חשוב" sx={{ fontWeight: 600 }} />
                        </Tabs>
                    </Box>

                    <List sx={{ p: 0 }}>
                        {filteredNotifications.length === 0 ? (
                            <Box sx={{ p: 8, textAlign: 'center' }}>
                                <NotificationsActiveIcon sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">אין התראות להצגה</Typography>
                            </Box>
                        ) : (
                            filteredNotifications.map((notification, index) => (
                                <React.Fragment key={notification.id}>
                                    <ListItem
                                        sx={{
                                            p: 3,
                                            bgcolor: notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.02)',
                                            transition: 'background-color 0.2s',
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' }
                                        }}
                                        secondaryAction={
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                {!notification.read && (
                                                    <IconButton edge="end" aria-label="mark as read" onClick={() => handleMarkAsRead(notification.id)} title="סמן כנקרא">
                                                        <CheckCircleIcon color="action" />
                                                    </IconButton>
                                                )}
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(notification.id)}>
                                                    <DeleteIcon fontSize="small" color="disabled" />
                                                </IconButton>
                                            </Box>
                                        }
                                    >
                                        <ListItemAvatar sx={{ mr: 2 }}>
                                            <Avatar sx={{
                                                bgcolor: getBgColor(notification.type),
                                                color: getColor(notification.type),
                                                borderRadius: '12px'
                                            }}>
                                                {getIcon(notification.type)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <Typography variant="subtitle1" fontWeight={notification.read ? 600 : 700} color="#1e293b">
                                                        {notification.title}
                                                    </Typography>
                                                    {!notification.read && (
                                                        <Chip label="חדש" size="small" color="error" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold' }} />
                                                    )}
                                                </Box>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" variant="body2" color="text.primary" display="block" sx={{ mb: 0.5 }}>
                                                        {notification.desc}
                                                    </Typography>
                                                    <Typography component="span" variant="caption" color="text.secondary">
                                                        {notification.time}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    {index < filteredNotifications.length - 1 && <Divider component="li" />}
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
}
