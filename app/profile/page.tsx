'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Avatar,
    Button,
    Grid,
    Divider,
    TextField,
    Chip,
    Switch,
    FormControlLabel,
    IconButton,
    Tabs,
    Tab
} from '@mui/material';
import {
    Edit as EditIcon,
    CameraAlt as CameraIcon,
    Security as SecurityIcon,
    Settings as SettingsIcon,
    Person as PersonIcon,
    CreditCard as CreditCardIcon,
    Verified as VerifiedIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { TopNavSpacer } from '../../src/components/TopNav';

export default function ProfilePage() {
    const [tabValue, setTabValue] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // Mock User Data
    // Mock User Data with state for updates
    const [user, setUser] = useState({
        name: 'ישראל ישראלי',
        email: 'israel@cryptomind.ai', // Default mock, will be overwritten by localStorage if exists
        role: 'Pro Trader',
        joinDate: 'ינואר 2024',
        credits: 850,
        bio: 'סוחר קריפטו נלהב, מתמקד בביטקוין ואיתריום. משתמש ב-AI כדי לזהות מגמות לפני כולם.',
        location: 'תל אביב, ישראל',
        phone: '050-1234567',
        avatar: '/path/to/avatar.jpg', // Placeholder
        stats: {
            winRate: '68%',
            totalTrades: 142,
            profit: '+12.5%',
            portfolioValue: '$24,500'
        },
        membership: {
            plan: 'Pro',
            nextBilling: '01/03/2026',
            amount: '$29.99'
        }
    });

    useEffect(() => {
        // Hydrate from local storage (simulate getting logged in user)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.email) {
                    setUser(prev => ({
                        ...prev,
                        email: parsedUser.email,
                        name: parsedUser.name || prev.name // Update name if available, otherwise keep mock
                    }));
                }
            } catch (error) {
                console.error('Failed to parse user from local storage');
            }
        }
    }, []);

    const apiKeys = [
        { name: 'Binance Main', key: '...8f9a', status: 'active', date: '12/01/2025' },
        { name: 'Coinbase Pro', key: '...2b4c', status: 'inactive', date: '05/11/2024' }
    ];


    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', pb: 8 }}>
            <TopNavSpacer />

            {/* Cover Image */}
            <Box sx={{
                height: 240,
                background: 'linear-gradient(135deg, #f97316 0%, #7c3aed 100%)',
                position: 'relative'
            }}>
                <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
                    <IconButton sx={{ position: 'absolute', bottom: 16, right: 16, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
                        <CameraIcon />
                    </IconButton>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -8 }}>
                <Grid container spacing={4}>
                    {/* Left Column: Profile Card */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: '24px',
                                textAlign: 'center',
                                border: '1px solid #e2e8f0',
                                bgcolor: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                overflow: 'visible'
                            }}
                        >
                            <Box sx={{ position: 'relative', display: 'inline-block', mt: -8, mb: 2 }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        bgcolor: '#f97316',
                                        fontSize: '3rem',
                                        border: '4px solid white',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {user.name.charAt(0)}
                                </Avatar>
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: 'white',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        '&:hover': { bgcolor: '#f1f5f9' }
                                    }}
                                >
                                    <CameraIcon fontSize="small" sx={{ color: '#64748b' }} />
                                </IconButton>
                            </Box>

                            <Typography variant="h5" fontWeight="800" gutterBottom>
                                {user.name}
                                <VerifiedIcon color="primary" sx={{ ml: 1, fontSize: 20, verticalAlign: 'middle' }} />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {user.email}
                            </Typography>
                            <Chip label={user.role} color="primary" size="small" sx={{ mt: 1, fontWeight: 700, borderRadius: '8px' }} />

                            <Divider sx={{ my: 3 }} />


                        </Paper>

                        {/* Quick Stats Column (New) */}
                        <Paper
                            elevation={0}
                            sx={{
                                mt: 3,
                                p: 3,
                                borderRadius: '24px',
                                border: '1px solid #e2e8f0',
                                bgcolor: 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>סטטיסטיקות מסחר</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: '16px', textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="800" color="primary">{user.stats.winRate}</Typography>
                                        <Typography variant="caption" color="text.secondary">אחוזי הצלחה</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: '16px', textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="800" color="success.main">{user.stats.profit}</Typography>
                                        <Typography variant="caption" color="text.secondary">רווח כולל</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 2, bgcolor: '#fff7ed', borderRadius: '16px', textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="800" color="warning.main">{user.stats.totalTrades}</Typography>
                                        <Typography variant="caption" color="text.secondary">סך עסקאות</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '16px', textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="800" color="text.primary">{user.stats.portfolioValue}</Typography>
                                        <Typography variant="caption" color="text.secondary">שווי תיק</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Right Column: Content */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '24px',
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden',
                                bgcolor: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >


                            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
                                <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                                    <Tab icon={<PersonIcon />} iconPosition="start" label="פרטים אישיים" sx={{ fontWeight: 600, minHeight: 60 }} />
                                    <Tab icon={<CreditCardIcon />} iconPosition="start" label="מנוי וחיובים" sx={{ fontWeight: 600, minHeight: 60 }} />
                                    <Tab icon={<SecurityIcon />} iconPosition="start" label="מפתחות API" sx={{ fontWeight: 600, minHeight: 60 }} />
                                    <Tab icon={<SettingsIcon />} iconPosition="start" label="הגדרות ואבטחה" sx={{ fontWeight: 600, minHeight: 60 }} />
                                </Tabs>
                            </Box>

                            <Box sx={{ p: 4 }}>
                                {tabValue === 0 && (
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h6" fontWeight="bold">מידע כללי</Typography>
                                            <Button
                                                startIcon={<EditIcon />}
                                                onClick={() => setIsEditing(!isEditing)}
                                                sx={{ borderRadius: '10px' }}
                                            >
                                                {isEditing ? 'שמור שינויים' : 'ערוך פרטים'}
                                            </Button>
                                        </Box>
                                        <Grid container spacing={3}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    label="שם מלא"
                                                    value={user.name}
                                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    label="אימייל"
                                                    value={user.email}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    label="טלפון"
                                                    value={user.phone}
                                                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    label="מיקום"
                                                    value={user.location}
                                                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12 }}>
                                                <TextField
                                                    fullWidth
                                                    label="אודות"
                                                    multiline
                                                    rows={4}
                                                    value={user.bio}
                                                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                    disabled={!isEditing}
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {tabValue === 1 && (
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>המנוי שלי</Typography>
                                        <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', bgcolor: '#fff7ed', borderColor: '#fdba74', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Box>
                                                <Typography variant="h5" fontWeight="800" color="#c2410c">{user.membership.plan}</Typography>
                                                <Typography variant="body2" color="#9a3412">חיוב הבא: {user.membership.nextBilling} • {user.membership.amount}/חודש</Typography>
                                            </Box>
                                            <Button variant="contained" color="warning" sx={{ borderRadius: '10px', boxShadow: 'none' }}>
                                                שדרג תוכנית
                                            </Button>
                                        </Paper>

                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>היסטוריית חיובים</Typography>
                                        {[1, 2, 3].map((i) => (
                                            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 2, borderBottom: '1px solid #f1f5f9' }}>
                                                <Typography variant="body2" fontWeight="500">חשבונית #{1000 + i}</Typography>
                                                <Typography variant="body2" color="text.secondary">01/01/2024</Typography>
                                                <Typography variant="body2" fontWeight="bold">$29.99</Typography>
                                                <Typography variant="body2" color="success.main" fontWeight="bold">שולם</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {tabValue === 2 && (
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h6" fontWeight="bold">מפתחות API מחוברים</Typography>
                                            <Button startIcon={<CameraIcon />} variant="outlined" sx={{ borderRadius: '10px' }}>
                                                הוסף מפתח חדש
                                            </Button>
                                        </Box>

                                        {apiKeys.map((key) => (
                                            <Paper key={key.name} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: key.name.includes('Binance') ? '#FCD535' : '#0052FF', color: 'white' }}>
                                                        {key.name.charAt(0)}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight="bold">{key.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">נוסף ב-{key.date}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Chip label={key.status === 'active' ? 'פעיל' : 'לא פעיל'} color={key.status === 'active' ? 'success' : 'default'} size="small" />
                                                    <Button size="small" color="error">הסר</Button>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                )}

                                {tabValue === 3 && (
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>אבטחה</Typography>
                                        <Button variant="outlined" fullWidth sx={{ mb: 2, justifyContent: 'flex-start', py: 1.5, borderRadius: '12px' }} startIcon={<SecurityIcon />}>
                                            שינוי סיסמה
                                        </Button>
                                        <Button variant="outlined" fullWidth sx={{ mb: 4, justifyContent: 'flex-start', py: 1.5, borderRadius: '12px' }} startIcon={<VerifiedIcon />}>
                                            הגדרת אימות דו-שלבי (2FA)
                                        </Button>

                                        <Divider sx={{ my: 4 }} />

                                        <Typography variant="h6" fontWeight="bold" gutterBottom>התראות</Typography>
                                        <FormControlLabel control={<Switch defaultChecked />} label="קבלת התראות בדוא&quot;ל" />
                                        <FormControlLabel control={<Switch defaultChecked />} label="התראות פוש לנייד" />

                                        <Divider sx={{ my: 4 }} />

                                        <Typography variant="h6" fontWeight="bold" color="error" gutterBottom>אזור סכנה</Typography>
                                        <Button variant="outlined" color="error" sx={{ borderRadius: '10px' }}>
                                            מחק חשבון
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid >
            </Container >
        </Box >
    );
}
