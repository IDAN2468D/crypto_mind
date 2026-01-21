'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

export default function SocialAuth() {
    return (
        <Box sx={{ mt: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(148, 163, 184, 0.2)' }} />
                <Typography variant="body2" sx={{ px: 2, color: '#94a3b8' }}>
                    או המשך באמצעות
                </Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(148, 163, 184, 0.2)' }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'rgba(148, 163, 184, 0.2)',
                        borderRadius: '12px',
                        py: 1.2,
                        '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.05)'
                        }
                    }}
                >
                    Google
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AppleIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'rgba(148, 163, 184, 0.2)',
                        borderRadius: '12px',
                        py: 1.2,
                        '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.05)'
                        }
                    }}
                >
                    Apple
                </Button>
            </Box>
        </Box>
    );
}
