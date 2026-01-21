'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import FilterListIcon from '@mui/icons-material/FilterList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from 'recharts';

// Types
interface Narrative {
    id: string;
    name: string;
    strength: number; // 0-100
    growth: number; // Percentage
    sources: number;
    description: string;
    relatedCoins: string[];
}

// Mock Data
const MOCK_NARRATIVES: Narrative[] = [
    { id: '1', name: 'סוכני AI אוטונומיים', strength: 92, growth: 15.4, sources: 1240, description: 'עלייה חדה בדיונים על סוכני בינה מלאכותית אוטונומיים.', relatedCoins: ['FET', 'AGIX', 'OLAS'] },
    { id: '2', name: 'נכסי עולם אמיתי (RWA)', strength: 78, growth: 5.2, sources: 850, description: 'טוקניזציה של נכסים אמיתיים ממשיכה לצבור תאוצה מוסדית.', relatedCoins: ['ONDO', 'CFG', 'PENDLE'] },
    { id: '3', name: 'מטבעות מימ (Solana)', strength: 65, growth: -2.1, sources: 3200, description: 'ירידה קלה בנפח השיח, אך עדיין דומיננטי ברשתות החברתיות.', relatedCoins: ['WIF', 'BONK'] },
    { id: '4', name: 'תשתיות מבוזרות (DePin)', strength: 58, growth: 8.9, sources: 600, description: 'תשתיות פיזיות מבוזרות מושכות עניין מצד קרנות הון סיכון.', relatedCoins: ['HNT', 'FIL'] },
    { id: '5', name: 'גיימינג (GameFi)', strength: 45, growth: 1.2, sources: 400, description: 'התעוררות מחודשת לקראת השקות משחקים ברבעון הבא.', relatedCoins: ['IMX', 'BEAM'] },
];

export default function NarrativeHunterPage() {
    const [scanning, setScanning] = useState(true);
    const [progress, setProgress] = useState(0);

    // Simulate scanning effect on load
    useEffect(() => {
        if (!scanning) return;

        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    setScanning(false);
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

        return () => {
            clearInterval(interval);
        };
    }, [scanning]);

    return (
        <Box className="animate-fade-in" sx={{ maxWidth: 1400, mx: 'auto', p: 1 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h3" fontWeight="900" sx={{ display: 'flex', alignItems: 'center', gap: 2, letterSpacing: '-1px' }}>
                        <RadarIcon sx={{ fontSize: 45, color: '#facc15' }} />
                        NARRATIVE HUNTER
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        זיהוי מוקדם של טרנדים מתהווים באמצעות ניתוח סמנטי של מיליוני מקורות מידע.
                    </Typography>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                        icon={scanning ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
                        label={scanning ? `סורק מקורות... ${Math.round(progress)}%` : "מערכת פעילה: ניתוח זמן אמת"}
                        sx={{
                            bgcolor: scanning ? 'rgba(250, 204, 21, 0.1)' : 'rgba(34, 211, 238, 0.1)',
                            color: scanning ? '#facc15' : '#22D3EE',
                            border: scanning ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid rgba(34, 211, 238, 0.3)',
                            fontWeight: 'bold',
                            px: 1,
                            py: 2.5,
                            borderRadius: 3
                        }}
                    />
                    <IconButton
                        onClick={() => {
                            setScanning(true);
                            setProgress(0);
                            // Re-trigger the effect by resetting scan state, the existing useEffect tracks scanning? 
                            // actually the useEffect has [] dependency, so it won't re-run. We need to fix that.
                        }}
                        sx={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 3,
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                        }}
                    >
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column: Top Narratives List */}
                <Grid size={{ xs: 12, md: 7 }} className="animate-slide-up">
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon fontSize="small" color="primary" /> נרטיבים מובילים (24h)
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {MOCK_NARRATIVES.map((item, index) => (
                            <NarrativeCard key={item.id} item={item} index={index + 1} />
                        ))}
                    </Box>
                </Grid>

                {/* Right Column: Visualizations & Stats */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Strength Chart */}
                        <Card sx={{
                            p: 3,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 4
                        }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>עוצמת שיח יחסית</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                {MOCK_NARRATIVES.map((item, index) => (
                                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {/* Label (Right) */}
                                        <Typography
                                            variant="body2"
                                            fontWeight="600"
                                            sx={{
                                                width: 160,
                                                flexShrink: 0,
                                                color: '#e2e8f0', // Bright text
                                                textAlign: 'right'
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        {/* Bar (Center) */}
                                        <Box sx={{ flexGrow: 1, height: 12, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Box sx={{
                                                width: `${item.strength}%`,
                                                bgcolor: index === 0 ? '#22D3EE' : index === 1 ? '#818cf8' : '#475569',
                                                borderRadius: 4,
                                                transition: 'width 1s ease-in-out'
                                            }} />
                                        </Box>

                                        {/* Value (Left) */}
                                        <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{ width: 30, textAlign: 'left' }}>
                                            {item.strength}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Card>

                        {/* Recent Sources Feed (Mock) */}
                        <Card sx={{
                            p: 0,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 4,
                            overflow: 'hidden'
                        }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">Live Data Feed</Typography>
                            </Box>
                            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                                <FeedItem source="Twitter" text="Just deployed a new #AI agent on Solana..." time="2m ago" />
                                <FeedItem source="Reddit" text="Why everyone is talking about DePIN suddenly?" time="5m ago" />
                                <FeedItem source="News" text="BlackRock announces new RWA fund strategy." time="12m ago" />
                                <FeedItem source="Twitter" text="$WIF hitting new ATH, meme season is back!" time="15m ago" />
                            </List>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

// Sub-components

function NarrativeCard({ item, index }: { item: Narrative, index: number }) {
    return (
        <Card sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            bgcolor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 3,
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
                bgcolor: 'rgba(255,255,255,0.04)',
                transform: 'translateX(-4px)',
                borderColor: 'rgba(34, 211, 238, 0.3)'
            }
        }}>
            {/* Rank Number */}
            <Typography variant="h2" fontWeight="900" sx={{
                color: 'rgba(255,255,255,0.05)',
                position: 'absolute',
                left: 10,
                bottom: -15,
                fontSize: '5rem',
                pointerEvents: 'none'
            }}>
                {index}
            </Typography>

            <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h5" fontWeight="bold">{item.name}</Typography>
                    <Chip
                        label={`${item.growth > 0 ? '+' : ''}${item.growth}%`}
                        size="small"
                        sx={{
                            bgcolor: item.growth > 0 ? 'rgba(34, 211, 238, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                            color: item.growth > 0 ? '#22D3EE' : '#f87171',
                            fontWeight: 'bold',
                            height: 24
                        }}
                    />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{item.description}</Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {item.relatedCoins.map(coin => (
                        <Chip key={coin} label={coin} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }} />
                    ))}
                </Box>
            </Box>

            {/* Metrics */}
            <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                <Typography variant="caption" color="text.secondary" display="block">Strength Score</Typography>
                <Typography variant="h4" fontWeight="bold" color="primary.main">{item.strength}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{item.sources} Sources</Typography>
            </Box>
        </Card>
    );
}

function FeedItem({ source, text, time }: { source: string, text: string, time: string }) {
    return (
        <ListItem sx={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
                {source === 'Twitter' ? <TwitterIcon color="primary" fontSize="small" /> : <LanguageIcon color="disabled" fontSize="small" />}
            </ListItemIcon>
            <ListItemText
                primary={<Typography variant="body2" color="white" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</Typography>}
                secondary={<Typography variant="caption" color="text.secondary">{source} • {time}</Typography>}
            />
        </ListItem>
    );
}
