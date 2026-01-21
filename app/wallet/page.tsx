'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Chip, IconButton, InputBase, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TokenIcon from '@mui/icons-material/Token';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LinkIcon from '@mui/icons-material/Link';
import AppsIcon from '@mui/icons-material/Apps';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Mock Data for Wallet Cards
const WALLET_ASSETS = [
    { id: '1', name: 'Tron', color: '#ef4444', icon: 'TRX', chain: 'Tron' }, // Red
    { id: '2', name: 'BNB Chain', color: '#eab308', icon: 'BNB', chain: 'BNB Chain' }, // Yellow
    { id: '3', name: 'Arbitrum', color: '#3b82f6', icon: 'ARB', chain: 'Arbitrum' }, // Blue
    { id: '4', name: 'Ethereum', color: '#6366f1', icon: 'ETH', chain: 'Ethereum' }, // Indigo
    { id: '5', name: 'Polygon', color: '#a855f7', icon: 'MATIC', chain: 'Polygon' }, // Purple
    { id: '6', name: 'Solana', color: '#14b8a6', icon: 'SOL', chain: 'Solana' }, // Teal
    { id: '7', name: 'Optimism', color: '#ef4444', icon: 'OP', chain: 'Optimism' }, // Red
    { id: '8', name: 'Avalanche', color: '#f87171', icon: 'AVAX', chain: 'Avalanche' }, // Light Red
    { id: '9', name: 'Toncoin', color: '#0ea5e9', icon: 'TON', chain: 'Toncoin' }, // Sky Blue
    { id: '10', name: 'Monero', color: '#f97316', icon: 'XMR', chain: 'Monero' }, // Orange
    { id: '11', name: 'Shiba Inu', color: '#f59e0b', icon: 'SHIB', chain: 'Ethereum' }, // Amber
    { id: '12', name: 'Polkadot', color: '#ec4899', icon: 'DOT', chain: 'Polkadot' }, // Pink
];

export default function WalletPage() {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [filterChain, setFilterChain] = useState('ALL');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [assets, setAssets] = useState(WALLET_ASSETS);

    // Filter Logic
    const filteredAssets = React.useMemo(() => {
        return assets.filter(asset => {
            // Filter by Search
            const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) ||
                asset.icon.toLowerCase().includes(search.toLowerCase());

            // Filter by Type (Mock logic for demo)
            let matchesType = true;
            if (filterType === 'DAPPS') matchesType = parseInt(asset.id) % 2 !== 0;
            if (filterType === 'WALLETS') matchesType = parseInt(asset.id) % 2 === 0;
            if (filterType === 'HYBRID') matchesType = parseInt(asset.id) <= 5;

            // Filter by Chain
            let matchesChain = true;
            if (filterChain !== 'ALL') {
                matchesChain = (asset as any).chain === filterChain;
            }

            return matchesSearch && matchesType && matchesChain;
        });
    }, [search, filterType, filterChain, assets]);

    const handleAddWallet = () => {
        const newWallet = {
            id: (assets.length + 1).toString(),
            name: `New Wallet ${assets.length + 1}`,
            color: '#10b981',
            icon: 'NEW',
            chain: 'Ethereum' // Default
        };
        setAssets([newWallet, ...assets]);
        setIsAddDialogOpen(false);
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', gap: 3, p: 1 }}>

            {/* Inner Sidebar / Filter Panel */}
            <Paper sx={{
                width: 280,
                flexShrink: 0,
                borderRadius: '24px',
                bgcolor: '#ffffff', // White
                border: 'none',
                p: 3,
                display: { xs: 'none', lg: 'block' },
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)' // Very subtle shadow
            }}>
                {/* Search */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#f1f5f9', // Light grey input
                    borderRadius: '12px',
                    p: 1.5,
                    mb: 4
                }}>
                    <SearchIcon sx={{ color: '#94a3b8', mr: 1 }} />
                    <InputBase
                        placeholder="Search..."
                        sx={{ color: '#0f172a', fontSize: '0.95rem', width: '100%' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <TuneIcon sx={{ color: '#94a3b8', fontSize: 20, cursor: 'pointer' }} />
                </Box>

                {/* Categories */}
                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon fontSize="small" /> Type
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <FilterItem label="ALL" active={filterType === 'ALL'} onClick={() => setFilterType('ALL')} />
                    <FilterItem label="DAPPS" active={filterType === 'DAPPS'} onClick={() => setFilterType('DAPPS')} />
                    <FilterItem label="WALLETS" active={filterType === 'WALLETS'} onClick={() => setFilterType('WALLETS')} />
                    <FilterItem label="HYBRID" active={filterType === 'HYBRID'} onClick={() => setFilterType('HYBRID')} />
                </Box>

                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkIcon fontSize="small" /> WalletConnect
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                    <FilterItem label="V1" />
                    <FilterItem label="V2" />
                </Box>

                <Typography variant="subtitle2" sx={{ color: '#0f172a', mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TokenIcon fontSize="small" /> Chains
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 300, overflowY: 'auto' }}>
                    <FilterItem label="All Chains" active={filterChain === 'ALL'} onClick={() => setFilterChain('ALL')} />
                    <FilterItem label="Ethereum" active={filterChain === 'Ethereum'} onClick={() => setFilterChain('Ethereum')} icon={<CurrencyBitcoinIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="Solana" active={filterChain === 'Solana'} onClick={() => setFilterChain('Solana')} icon={<TokenIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="BNB Chain" active={filterChain === 'BNB Chain'} onClick={() => setFilterChain('BNB Chain')} icon={<TokenIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="Polkadot" active={filterChain === 'Polkadot'} onClick={() => setFilterChain('Polkadot')} icon={<TokenIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="Tron" active={filterChain === 'Tron'} onClick={() => setFilterChain('Tron')} icon={<TokenIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="Arbitrum" active={filterChain === 'Arbitrum'} onClick={() => setFilterChain('Arbitrum')} icon={<AppsIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                    <FilterItem label="Cosmos" active={filterChain === 'Cosmos'} onClick={() => setFilterChain('Cosmos')} icon={<AppsIcon fontSize="small" sx={{ color: '#64748b' }} />} />
                </Box>
            </Paper>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1 }}>

                {/* Top Bar inside content */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#ffffff', // White
                        borderRadius: '16px',
                        p: 1.5,
                        width: { xs: '100%', md: 400 },
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                    }}>
                        <SearchIcon sx={{ color: '#94a3b8', mr: 2 }} />
                        <InputBase
                            placeholder="Search..."
                            sx={{ color: '#0f172a', fontSize: '1rem', width: '100%' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsAddDialogOpen(true)}
                        sx={{
                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            borderRadius: '12px',
                            px: 3,
                            py: 1.2,
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
                            '&:hover': { boxShadow: '0 6px 20px rgba(249, 115, 22, 0.6)' }
                        }}
                    >
                        ADD
                    </Button>
                </Box>

                {/* Grid */}
                <Grid container spacing={3}>
                    {filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={asset.id}>
                                <WalletCard asset={asset} />
                            </Grid>
                        ))
                    ) : (
                        <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
                            <Typography variant="h6" color="text.secondary">No wallets found matching your criteria.</Typography>
                        </Box>
                    )}
                </Grid>

                {/* Simple Add Dialog (Mock) */}
                {isAddDialogOpen && (
                    <Box sx={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(5px)'
                    }} onClick={() => setIsAddDialogOpen(false)}>
                        <Card
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                width: 400,
                                p: 4,
                                borderRadius: 4,
                                textAlign: 'center'
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#0f172a' }}>Connect New Wallet</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Select a network to create or import a wallet.</Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleAddWallet}
                                sx={{
                                    bgcolor: '#0f172a',
                                    color: 'white',
                                    borderRadius: 3,
                                    py: 1.5,
                                    mb: 2,
                                    '&:hover': { bgcolor: '#1e293b' }
                                }}
                            >
                                Create Auto-Generated Wallet
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="inherit"
                                onClick={() => setIsAddDialogOpen(false)}
                                sx={{ borderRadius: 3 }}
                            >
                                Cancel
                            </Button>
                        </Card>
                    </Box>
                )}

            </Box>
        </Box>
    );
}

// Components

function WalletCard({ asset }: { asset: any }) {
    return (
        <Card sx={{
            p: 3,
            height: 200,
            borderRadius: '24px',
            bgcolor: '#ffffff', // Pure White for Extej Look
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
            border: 'none',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)'
            }
        }}>
            {/* Subtle Gradient Spot behind icon */}
            <Box sx={{
                position: 'absolute',
                top: -30,
                left: -30,
                width: 150,
                height: 150,
                background: `radial-gradient(circle, ${asset.color}20 0%, transparent 70%)`, // Lighter opacity 20
                zIndex: 0,
                filter: 'blur(30px)'
            }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1, position: 'relative' }}>
                <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: asset.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 20px -5px ${asset.color}60` // More transparent shadow
                }}>
                    <Box sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        // Using SVG icon logic instead of text if possible, but text is fine for mock
                    }}>
                        {/* Mock Icon Content */}
                        {/* If I had the SVG components I'd use them, but text is consistent */}
                        {/* {asset.icon} is symbol text like 'TRX' */}
                        {/* Let's try to map some common ones to actual icons if they existed, else Generic */}
                        <AppsIcon sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                </Box>

                <IconButton size="small" sx={{ bgcolor: '#f8fafc', '&:hover': { bgcolor: '#f1f5f9' } }}>
                    <ArrowOutwardIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </IconButton>
            </Box>

            <Box sx={{ zIndex: 1, position: 'relative', mt: 'auto' }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', letterSpacing: 1, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    WALLET
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#0f172a' }}>
                        {asset.name}
                    </Typography>
                    <IconButton size="small" sx={{ color: '#cbd5e1' }}>
                        <ContentCopyIcon fontSize="small" sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

function FilterItem({ label, active, onClick, icon }: { label: string, active?: boolean, onClick?: () => void, icon?: React.ReactNode }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                opacity: active ? 1 : 0.6,
                '&:hover': { opacity: 1 }
            }}
        >
            <Box sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: active ? '#0f172a' : '#cbd5e1', // Dark filled for active
                transition: 'all 0.2s'
            }} />
            {icon}
            <Typography variant="body2" sx={{
                color: active ? '#0f172a' : '#64748b',
                fontWeight: active ? 'bold' : '500',
                fontSize: '0.85rem'
            }}>
                {label}
            </Typography>
        </Box>
    );
}
