'use client';

import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function InteractiveBackground() {
    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 0,
            backgroundColor: '#0f172a',
        }}>
            <Box sx={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(0,0,0,0) 70%)',
                top: '-10%',
                left: '-10%',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'pulse 10s infinite alternate'
            }} />
            <Box sx={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
                bottom: '10%',
                right: '-10%',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'pulse 8s infinite alternate-reverse'
            }} />

            {/* Mesh Grid Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.2,
            }} />

            <style jsx global>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.2); opacity: 0.8; }
                }
            `}</style>
        </Box>
    );
}
