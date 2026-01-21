'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Slider, LinearProgress, Chip, Alert, Collapse } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShieldIcon from '@mui/icons-material/Shield';
import BloodtypeIcon from '@mui/icons-material/Bloodtype'; // For "Bleeding" markets

// Types
interface CrisisScenario {
    id: string;
    title: string;
    description: string;
    severity: 'Medium' | 'High' | 'Critical';
    marketImpact: {
        btc: number; // Percentage drop
        eth: number;
        alts: number;
        stablecoins: number;
    };
    icon: React.ReactNode;
}

// Mock Portfolio
const initialPortfolio = {
    totalValue: 125000,
    assets: {
        btc: 45000,
        eth: 30000,
        alts: 20000, // Solana, Cardano etc
        stablecoins: 30000 // USDT, USDC
    }
};

const scenarios: CrisisScenario[] = [
    {
        id: 'regulation',
        title: 'רגולציה מחמירה (SEC Crackdown)',
        description: 'ארה"ב מכריזה על רוב האלטים כניירות ערך. בורסות נאלצות למחוק מטבעות.',
        severity: 'Medium',
        marketImpact: { btc: -15, eth: -25, alts: -50, stablecoins: 0 },
        icon: <ShieldIcon sx={{ fontSize: 40, color: '#FCD34D' }} />
    },
    {
        id: 'exchange_hack',
        title: 'פריצה לבורסה ראשית (Mt. Gox 2.0)',
        description: 'אחת מ-3 הבורסות הגדולות נפרצת או קורסת. פאניקה המונית.',
        severity: 'High',
        marketImpact: { btc: -30, eth: -35, alts: -45, stablecoins: -2 },
        icon: <WarningAmberIcon sx={{ fontSize: 40, color: '#F97316' }} />
    },
    {
        id: 'usdt_depeg',
        title: 'קריסת הטות\'ר (USDT De-peg)',
        description: 'USDT מאבד את ההצמדה לדולר ויורד ל-0.8$. נזילות נמחקת מהשוק.',
        severity: 'Critical',
        marketImpact: { btc: -45, eth: -55, alts: -80, stablecoins: -20 },
        icon: <BloodtypeIcon sx={{ fontSize: 40, color: '#EF4444' }} />
    },
    {
        id: 'global_depression',
        title: 'מיתון עולמי חריף',
        description: 'קריסת שווקים מסורתיים (S&P 500) גוררת את הקריפטו למטה כנכס סיכון.',
        severity: 'High',
        marketImpact: { btc: -55, eth: -65, alts: -75, stablecoins: 0 },
        icon: <ThunderstormIcon sx={{ fontSize: 40, color: '#64748B' }} />
    }
];

export default function StressTestPage() {
    const [selectedScenario, setSelectedScenario] = useState<CrisisScenario | null>(null);
    const [simulatedPortfolio, setSimulatedPortfolio] = useState(initialPortfolio);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = (scenario: CrisisScenario) => {
        setSelectedScenario(scenario);
        setIsSimulating(true);

        // Simulate calculation delay
        setTimeout(() => {
            const newValues = {
                btc: initialPortfolio.assets.btc * (1 + scenario.marketImpact.btc / 100),
                eth: initialPortfolio.assets.eth * (1 + scenario.marketImpact.eth / 100),
                alts: initialPortfolio.assets.alts * (1 + scenario.marketImpact.alts / 100),
                stablecoins: initialPortfolio.assets.stablecoins * (1 + scenario.marketImpact.stablecoins / 100),
            };

            setSimulatedPortfolio({
                totalValue: newValues.btc + newValues.eth + newValues.alts + newValues.stablecoins,
                assets: newValues
            });
            setIsSimulating(false);
        }, 800);
    };

    const getLossPercentage = () => {
        if (!selectedScenario) return 0;
        return ((initialPortfolio.totalValue - simulatedPortfolio.totalValue) / initialPortfolio.totalValue) * 100;
    };

    const getLossAmount = () => {
        return initialPortfolio.totalValue - simulatedPortfolio.totalValue;
    };

    return (
        <Box sx={{ p: 0, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ThunderstormIcon sx={{ color: '#EF4444', fontSize: 36 }} />
                    מבחן עמידות (Stress Test)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    סימולטור לניהול סיכונים: בדוק כיצד התיק שלך יגיב לתרחישי קיצון בשווקים.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>

                {/* Scenarios List */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>בחר תרחיש יום הדין:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {scenarios.map((scenario) => (
                            <Card
                                key={scenario.id}
                                onClick={() => runSimulation(scenario)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: selectedScenario?.id === scenario.id ? `2px solid #EF4444` : '1px solid rgba(255,255,255,0.05)',
                                    bgcolor: selectedScenario?.id === scenario.id ? 'rgba(239, 68, 68, 0.1)' : 'background.paper',
                                    '&:hover': { transform: 'translateX(10px)', bgcolor: 'rgba(255,255,255,0.05)' }
                                }}
                            >
                                <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    {scenario.icon}
                                    <Box>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 0.5 }}>
                                            <Typography fontWeight="bold">{scenario.title}</Typography>
                                            <Chip
                                                label={scenario.severity}
                                                size="small"
                                                color={scenario.severity === 'Critical' ? 'error' : scenario.severity === 'High' ? 'warning' : 'info'}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {scenario.description}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Grid>

                {/* Results Panel */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{
                        height: '100%',
                        p: 4,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.5s ease',
                        border: selectedScenario ? `2px solid ${selectedScenario.severity === 'Critical' ? '#ef4444' :
                                selectedScenario.severity === 'High' ? '#f97316' : '#22D3EE'
                            }` : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: selectedScenario ? `0 0 30px ${selectedScenario.severity === 'Critical' ? 'rgba(239, 68, 68, 0.2)' :
                                selectedScenario.severity === 'High' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(34, 211, 238, 0.2)'
                            }` : 'none'
                    }}>
                        {selectedScenario && selectedScenario.severity === 'Critical' && (
                            <Box sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)',
                                animation: 'pulse 2s infinite',
                                pointerEvents: 'none'
                            }} />
                        )}

                        {!selectedScenario ? (
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                <ShieldIcon sx={{ fontSize: 100, mb: 3, color: 'text.secondary' }} />
                                <Typography variant="h5" fontWeight="bold">ממתין לבחירת תרחיש...</Typography>
                                <Typography color="text.secondary">הפורטפוליו שלך מוכן לבדיקה: ${initialPortfolio.totalValue.toLocaleString()}</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ animation: 'fadeIn 0.5s', position: 'relative' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                                    <Box>
                                        <Typography variant="overline" color="text.secondary" fontWeight="bold">דו"ח פגיעה משוער</Typography>
                                        <Typography variant="h3" fontWeight="900" sx={{
                                            color:
                                                selectedScenario.severity === 'Critical' ? '#f87171' :
                                                    selectedScenario.severity === 'High' ? '#fb923c' : '#22D3EE'
                                        }}>
                                            {selectedScenario.title}
                                        </Typography>
                                    </Box>
                                    {selectedScenario.icon}
                                </Box>

                                {isSimulating ? (
                                    <Box sx={{ py: 10, textAlign: 'center' }}>
                                        <LinearProgress color="error" sx={{ height: 8, borderRadius: 4, mb: 2 }} />
                                        <Typography variant="h6" className="animate-pulse">מחשב מודל נזילות גלובלי...</Typography>
                                    </Box>
                                ) : (
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{
                                                p: 4,
                                                borderRadius: 4,
                                                bgcolor: 'rgba(239, 68, 68, 0.1)',
                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                textAlign: 'center',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                            }}>
                                                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1 }}>סך הכל אובדן הון</Typography>
                                                <Typography variant="h2" fontWeight="900" color="#f87171" sx={{ letterSpacing: '-2px' }}>
                                                    -${getLossAmount().toLocaleString()}
                                                </Typography>
                                                <Typography variant="h5" fontWeight="bold" color="#f87171" sx={{ opacity: 0.8 }}>
                                                    ({getLossPercentage().toFixed(2)}%-)
                                                </Typography>
                                            </Box>

                                            <Alert severity="error" variant="filled" sx={{ mt: 3, border: 'none', bgcolor: 'rgba(239, 68, 68, 0.8)', borderRadius: 3 }}>
                                                <Typography fontWeight="bold">אזהרת נזילות:</Typography>
                                                יציאה מהירה מפוזיציות בתרחיש כזה עלולה להוביל ל-Slippage של 15% נוספים.
                                            </Alert>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ width: 4, height: 20, bgcolor: 'primary.main', borderRadius: 2 }} />
                                                    ניתוח נכסים לפי סיכון
                                                </Typography>

                                                {[
                                                    { name: 'Bitcoin', val: simulatedPortfolio.assets.btc, impact: selectedScenario.marketImpact.btc },
                                                    { name: 'Ethereum', val: simulatedPortfolio.assets.eth, impact: selectedScenario.marketImpact.eth },
                                                    { name: 'Altcoins', val: simulatedPortfolio.assets.alts, impact: selectedScenario.marketImpact.alts },
                                                    { name: 'Stablecoins', val: simulatedPortfolio.assets.stablecoins, impact: selectedScenario.marketImpact.stablecoins },
                                                ].map((asset) => (
                                                    <Box key={asset.name}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                            <Typography fontWeight="bold" variant="body2">{asset.name}</Typography>
                                                            <Typography variant="body2" color={asset.impact < 0 ? 'error.main' : 'text.primary'} fontWeight="bold">
                                                                ${asset.val.toLocaleString()} ({asset.impact}%)
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={Math.max(10, 100 + asset.impact)}
                                                            color={asset.impact <= -50 ? 'error' : asset.impact <= -20 ? 'warning' : 'primary'}
                                                            sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Box sx={{
                                                mt: 2, p: 3, borderRadius: 4,
                                                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <ShieldIcon color="primary" /> אסטרטגיית התגוננות מוצעת
                                                </Typography>
                                                בתרחיש מסוג זה, החשיפה שלך לנכסי סיכון (Risk-On) גבוהה מדי. מומלץ להעביר לפחות 40,000$ לנכסים יציבים או לזהב דיגיטלי (PAXG) כדי לשמור על כוח הקנייה שלך.
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        )}
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}
