'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import WavesIcon from '@mui/icons-material/Waves';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/Wallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Types
interface WhaleTransaction {
    id: string;
    coin: 'BTC' | 'ETH' | 'USDT' | 'SOL';
    amount: number;
    valueUsd: number;
    fromType: 'wallet' | 'exchange';
    toType: 'wallet' | 'exchange';
    fromLabel: string;
    toLabel: string;
    timestamp: number;
}

// Generate random transaction
const generateTransaction = (): WhaleTransaction => {
    const coins = ['BTC', 'ETH', 'USDT', 'SOL'] as const;
    const coin = coins[Math.floor(Math.random() * coins.length)];

    // Determine scale based on coin
    let amount = 0;
    let price = 0;

    switch (coin) {
        case 'BTC': amount = Math.floor(Math.random() * 500) + 50; price = 65000; break;
        case 'ETH': amount = Math.floor(Math.random() * 5000) + 500; price = 3500; break;
        case 'SOL': amount = Math.floor(Math.random() * 100000) + 10000; price = 150; break;
        case 'USDT': amount = Math.floor(Math.random() * 50000000) + 5000000; price = 1; break;
    }

    const valueUsd = amount * price;

    const entities = [
        { type: 'exchange', label: 'Binance' },
        { type: 'exchange', label: 'Coinbase' },
        { type: 'exchange', label: 'Kraken' },
        { type: 'exchange', label: 'OKX' },
        { type: 'wallet', label: 'Unknown Wallet' },
        { type: 'wallet', label: 'Unknown Wallet' },
        { type: 'wallet', label: 'Cold Storage' }
    ];

    const from = entities[Math.floor(Math.random() * entities.length)];
    let to = entities[Math.floor(Math.random() * entities.length)];
    while (to === from) {
        to = entities[Math.floor(Math.random() * entities.length)];
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        coin,
        amount,
        valueUsd,
        fromType: from.type as 'wallet' | 'exchange',
        toType: to.type as 'wallet' | 'exchange',
        fromLabel: from.label,
        toLabel: to.label,
        timestamp: Date.now()
    };
};

// Component for a moving whale bubble
const WhaleBubble = ({ tx }: { tx: WhaleTransaction }) => {
    // Determine color based on flow
    // Exchange -> Wallet (Green/Bullish - Accumulation)
    // Wallet -> Exchange (Red/Bearish - Potential Dump)
    // Other (Neutral)
    let color = '#22D3EE'; // Neutral Blue
    if (tx.fromType === 'exchange' && tx.toType === 'wallet') color = '#4ade80'; // Green
    if (tx.fromType === 'wallet' && tx.toType === 'exchange') color = '#f87171'; // Red

    // Size based on value (logarithmic scale)
    const size = Math.max(60, Math.min(150, Math.log10(tx.valueUsd) * 15));

    return (
        <motion.div
            initial={{ x: -100, opacity: 0, y: Math.random() * 300 }}
            animate={{ x: '120%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 15, ease: "linear" }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: size,
                height: size,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${color}80, ${color}20)`,
                border: `1px solid ${color}`,
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${color}40`,
                zIndex: Math.floor(size),
                cursor: 'pointer'
            }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
        >
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#fff', textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                {tx.coin}
            </Typography>
            <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.7rem' }}>
                ${(tx.valueUsd / 1000000).toFixed(1)}M
            </Typography>
            {tx.fromType === 'wallet' && tx.toType === 'exchange' && <ArrowForwardIcon color="error" sx={{ fontSize: 16 }} />}
            {tx.fromType === 'exchange' && tx.toType === 'wallet' && <ArrowForwardIcon color="success" sx={{ fontSize: 16 }} />}
        </motion.div>
    );
};

export default function WhaleWatchPage() {
    const [transactions, setTransactions] = useState<WhaleTransaction[]>([]);
    const [activeBubbles, setActiveBubbles] = useState<WhaleTransaction[]>([]);

    useEffect(() => {
        // Initial seed
        setTransactions(Array(5).fill(null).map(generateTransaction).sort((a, b) => b.timestamp - a.timestamp));

        // Stream simulator
        const interval = setInterval(() => {
            const newTx = generateTransaction();

            // Add to list
            setTransactions(prev => [newTx, ...prev].slice(0, 20));

            // Add to bubbles (fire and forget animation)
            setActiveBubbles(prev => [...prev, newTx]);

            // Cleanup old bubbles after animation finishes
            setTimeout(() => {
                setActiveBubbles(prev => prev.filter(b => b.id !== newTx.id));
            }, 15000); // Match animation duration

        }, 3000); // New whale every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ p: 0, height: 'calc(100vh - 100px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WavesIcon sx={{ color: '#22D3EE', fontSize: 36 }} />
                    מכ"ם לווייתנים
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    מעקב בזמן אמת אחרי תנועות כספיות גדולות ברשת (On-Chain)
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
                {/* Visualizer (The Ocean) */}
                <Grid size={{ xs: 12, md: 8 }} sx={{ height: '100%' }}>
                    <Card sx={{
                        height: '100%',
                        bgcolor: '#020617',
                        backgroundImage: `
                            linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                            radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 80%)
                        `,
                        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 6,
                        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)'
                    }}>
                        {/* Interactive Scan Line */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent)',
                            animation: 'scan 4s linear infinite',
                            zIndex: 10
                        }} />
                        <style>{`
                            @keyframes scan {
                                from { top: -10%; }
                                to { top: 110%; }
                            }
                        `}</style>

                        {/* Labels for visualization areas */}
                        <Box sx={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', opacity: 0.2, textAlign: 'center', pointerEvents: 'none' }}>
                            <WalletIcon sx={{ fontSize: 80, mb: 1 }} />
                            <Typography variant="h6" fontWeight="bold">ארנקים קרים</Typography>
                        </Box>
                        <Box sx={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', opacity: 0.2, textAlign: 'center', pointerEvents: 'none' }}>
                            <AccountBalanceIcon sx={{ fontSize: 80, mb: 1 }} />
                            <Typography variant="h6" fontWeight="bold">בורסות מרכזיות</Typography>
                        </Box>

                        {/* Bubbles Layer */}
                        <AnimatePresence>
                            {activeBubbles.map(tx => (
                                <WhaleBubble key={tx.id} tx={tx} />
                            ))}
                        </AnimatePresence>

                        {/* Status Overlay */}
                        <Box sx={{ position: 'absolute', bottom: 30, right: 30, display: 'flex', gap: 2, zIndex: 100 }}>
                            <Chip
                                label="צבירה"
                                size="small"
                                sx={{ bgcolor: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', border: '1px solid #4ade80', backdropFilter: 'blur(10px)' }}
                            />
                            <Chip
                                label="מכירה"
                                size="small"
                                sx={{ bgcolor: 'rgba(248, 113, 113, 0.15)', color: '#f87171', border: '1px solid #f87171', backdropFilter: 'blur(10px)' }}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* Live Feed List */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%' }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(19, 25, 38, 0.5)', backdropFilter: 'blur(10px)' }}>
                        <CardContent sx={{ pb: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">LOG פעילות לווייתנים</Typography>
                                <Chip label="לייב" color="error" size="small" sx={{ height: 20, fontSize: '0.65rem', animation: 'pulse 2s infinite' }} />
                            </Box>
                        </CardContent>
                        <List sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 2 }}>
                            <AnimatePresence initial={false}>
                                {transactions.map((tx) => (
                                    <ListItem
                                        key={tx.id}
                                        component={motion.div}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                        sx={{
                                            mb: 1.5,
                                            p: 2,
                                            borderRadius: 3,
                                            bgcolor: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(34, 211, 238, 0.3)' },
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 4,
                                            bgcolor: tx.fromType === 'wallet' && tx.toType === 'exchange' ? '#f87171' :
                                                tx.fromType === 'exchange' && tx.toType === 'wallet' ? '#4ade80' : '#22D3EE'
                                        }} />
                                        <ListItemAvatar sx={{ minWidth: 56 }}>
                                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold' }}>
                                                {tx.coin[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primaryTypographyProps={{ component: 'div' }}
                                            secondaryTypographyProps={{ component: 'div' }}
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography fontWeight="800" variant="subtitle2">{tx.amount.toLocaleString()} {tx.coin}</Typography>
                                                    <Typography variant="body2" color="primary.main" fontWeight="bold">${(tx.valueUsd / 1000000).toFixed(1)}M</Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{tx.fromLabel}</Typography>
                                                    <ArrowForwardIcon sx={{ fontSize: 12, opacity: 0.5, transform: 'rotate(180deg)' }} />
                                                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{tx.toLabel}</Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </AnimatePresence>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
