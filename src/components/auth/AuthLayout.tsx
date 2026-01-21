'use client';

import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';

interface AuthLayoutProps {
    children: React.ReactNode;
    visualContent?: React.ReactNode; // Optional/Ignored in centered layout
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#0f172a',
            position: 'relative',
            overflow: 'hidden',
            p: 3
        }}>
            {/* Full Screen Interactive Background */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <InteractiveBackground />
            </Box>

            {/* Central Glass Card */}
            <Paper
                component={motion.div}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                elevation={24}
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: '1000px',
                    bgcolor: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '32px',
                    p: { xs: 4, sm: 6 },
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Top Gradient/Glow */}
                <Box sx={{
                    position: 'absolute',
                    top: '-50%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle at center top, rgba(34, 211, 238, 0.15), transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    {children}
                </Box>
            </Paper>
        </Box>
    );
}
