'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, Link as MuiLink, InputAdornment, IconButton, Grid, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import AuthLayout from '@/src/components/auth/AuthLayout';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setShake(true);
                setTimeout(() => setShake(false), 500);
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const socialButtonStyles = {
        width: '100%',
        py: 1.5,
        borderRadius: '8px',
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        boxShadow: 'none',
        mb: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }
    };

    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                        התחברות
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8' }}>
                        אין לך עדיין חשבון?{' '}
                        <Link href="/register" style={{ textDecoration: 'none' }}>
                            <Typography component="span" sx={{ color: '#3b82f6', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
                                הרשמה
                            </Typography>
                        </Link>
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ position: 'relative' }}>
                    {/* Left Column: Form */}
                    <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 2, md: 1 } }}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 0.5, fontWeight: 500 }}>
                                        כתובת אימייל
                                    </Typography>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        fullWidth
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="user@example.com"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'rgba(15, 23, 42, 0.6)',
                                                borderRadius: '8px',
                                                color: 'white',
                                                '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                                                '&:hover fieldset': { borderColor: '#3b82f6' },
                                                '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '1px' },
                                                '& input:-webkit-autofill': {
                                                    '-webkit-text-fill-color': '#fff',
                                                    'transition': 'background-color 5000s ease-in-out 0s',
                                                    caretColor: '#fff',
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 0.5, fontWeight: 500 }}>
                                        סיסמה
                                    </Typography>
                                    <TextField
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        sx={{ color: '#64748b' }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'rgba(15, 23, 42, 0.6)',
                                                borderRadius: '8px',
                                                color: 'white',
                                                '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                                                '&:hover fieldset': { borderColor: '#3b82f6' },
                                                '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '1px' },
                                                '& input:-webkit-autofill': {
                                                    '-webkit-text-fill-color': '#fff',
                                                    'transition': 'background-color 5000s ease-in-out 0s',
                                                    caretColor: '#fff',
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        bgcolor: '#2563eb', // Bright blue like screenshot
                                        color: 'white',
                                        py: 1.5,
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#1d4ed8' }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'התחבר'}
                                </Button>
                            </Box>
                        </form>
                    </Grid>

                    {/* Middle Divider */}
                    <Grid size={{ md: 2 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', position: 'relative', order: 2 }}>
                        <Box sx={{ position: 'absolute', height: '100%', width: '1px', bgcolor: 'rgba(148, 163, 184, 0.2)' }} />
                        <Typography sx={{ color: '#94a3b8', bgcolor: '#0f172a', px: 1, zIndex: 1, borderRadius: '50%' }}>
                            או
                        </Typography>
                    </Grid>

                    {/* Right Column: Socials */}
                    <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 3 }, mb: { xs: 4, md: 0 } }}>
                        <Button
                            variant="contained"
                            sx={{
                                ...socialButtonStyles,
                                bgcolor: '#1a73e8', // Google Blue
                                color: 'white',
                                '&:hover': { bgcolor: '#1557b0' }
                            }}
                            startIcon={<GoogleIcon />}
                        >
                            המשך עם Google
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                ...socialButtonStyles,
                                bgcolor: '#3b5998', // Facebook Blue
                                color: 'white',
                                '&:hover': { bgcolor: '#2d4373' }
                            }}
                            startIcon={<FacebookIcon />}
                        >
                            המשך עם Facebook
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                ...socialButtonStyles,
                                bgcolor: '#f1f5f9', // White/Grey
                                color: '#0f172a',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                            startIcon={<AppleIcon />}
                        >
                            המשך עם Apple
                        </Button>
                    </Grid>
                </Grid>

                {/* Footer */}
                <Box sx={{ mt: 8, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        <Link href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>תנאי שימוש</Link>
                        {' • '}
                        <Link href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>מדיניות פרטיות</Link>
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#475569' }}>
                        This site is protected by reCAPTCHA Enterprise.
                    </Typography>
                </Box>
            </motion.div>
        </AuthLayout>
    );
}
