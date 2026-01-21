'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

// Typography for Hebrew
const H4 = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>{children}</Typography>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
        <div style={{ width: 4, height: 20, backgroundColor: '#22D3EE', borderRadius: 2 }} />
        {children}
    </Typography>
);

const ResultCard = ({ label, value, color = "text.primary" }: { label: string, value: string, color?: string }) => (
    <Card sx={{
        flex: '1 1 200px',
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)', bgcolor: 'rgba(255,255,255,0.04)' }
    }}>
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</Typography>
            <Typography variant="h5" fontWeight="900" sx={{ color, mt: 0.5 }}>{value}</Typography>
        </CardContent>
    </Card>
);

export default function BacktesterPage() {
    const [loading, setLoading] = useState(false);
    const [strategy, setStrategy] = useState({
        coin: 'bitcoin',
        timeframe: '1d',
        period: '1y',
        initialCapital: 10000,
        buyRsi: 30,
        sellRsi: 70
    });
    const [results, setResults] = useState<any>(null);

    const handleRunBacktest = () => {
        setLoading(true);
        // Simulate calculation time
        setTimeout(() => {
            // Mock Results generation based on "strategy"
            const data = generateMockBacktestData(strategy);
            setResults(data);
            setLoading(false);
        }, 1500);
    };

    return (
        <Box sx={{ p: 0 }} className="animate-fade-in">
            <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>Time Machine 🕒</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>בדיקת אסטרטגיות מסחר על נתוני עבר ברמת דיוק גבוהה.</Typography>

            <Grid container spacing={4}>
                {/* Strategy Configuration */}
                <Grid size={{ xs: 12, md: 4 }} className="animate-slide-up">
                    <Card sx={{
                        height: '100%',
                        p: 1,
                        bgcolor: 'background.paper',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}>
                        <CardContent>
                            <SectionTitle>הגדרת אסטרטגיה</SectionTitle>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>מטבע</InputLabel>
                                    <Select
                                        value={strategy.coin}
                                        label="מטבע"
                                        onChange={(e) => setStrategy({ ...strategy, coin: e.target.value })}
                                    >
                                        <MenuItem value="bitcoin">Bitcoin (BTC)</MenuItem>
                                        <MenuItem value="ethereum">Ethereum (ETH)</MenuItem>
                                        <MenuItem value="solana">Solana (SOL)</MenuItem>
                                    </Select>
                                </FormControl>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>טווח זמן</InputLabel>
                                        <Select
                                            value={strategy.timeframe}
                                            label="טווח זמן"
                                            onChange={(e) => setStrategy({ ...strategy, timeframe: e.target.value })}
                                        >
                                            <MenuItem value="4h">4 שעות</MenuItem>
                                            <MenuItem value="1d">יום</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>תקופה אחורה</InputLabel>
                                        <Select
                                            value={strategy.period}
                                            label="תקופה אחורה"
                                            onChange={(e) => setStrategy({ ...strategy, period: e.target.value })}
                                        >
                                            <MenuItem value="6m">6 חודשים</MenuItem>
                                            <MenuItem value="1y">1 שנה</MenuItem>
                                            <MenuItem value="2y">2 שנים</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <TextField
                                    label="הון התחלתי ($)"
                                    type="number"
                                    size="small"
                                    value={strategy.initialCapital}
                                    onChange={(e) => setStrategy({ ...strategy, initialCapital: Number(e.target.value) })}
                                />

                                <Divider sx={{ my: 1 }}>טריגרים (RSI)</Divider>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        label="קנה כש-RSI מתחת ל-"
                                        type="number"
                                        size="small"
                                        value={strategy.buyRsi}
                                        onChange={(e) => setStrategy({ ...strategy, buyRsi: Number(e.target.value) })}
                                        color="success"
                                        focused
                                    />
                                    <TextField
                                        label="מכור כש-RSI מעל ל-"
                                        type="number"
                                        size="small"
                                        value={strategy.sellRsi}
                                        onChange={(e) => setStrategy({ ...strategy, sellRsi: Number(e.target.value) })}
                                        color="error"
                                        focused
                                    />
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                                    onClick={handleRunBacktest}
                                    disabled={loading}
                                    sx={{
                                        mt: 2,
                                        py: 2,
                                        borderRadius: 3,
                                        background: 'linear-gradient(90deg, #22D3EE, #7C3AED)',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)',
                                        animation: loading ? 'none' : 'pulse 2s infinite'
                                    }}
                                >
                                    {loading ? 'מריץ סימולציה...' : 'הרץ אסטרטגיה'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Results Area */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {!results ? (
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.1)' }}>
                            <Box textAlign="center" sx={{ opacity: 0.7 }}>
                                <PlayArrowIcon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} />
                                <Typography>הגדר פרמטרים והרץ בדיקה כדי לראות תוצאות</Typography>
                            </Box>
                        </Card>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                            {/* Key Stats Cards */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <ResultCard label="רווח נקי (ROI)" value={`${results.roi}%`} color={results.roi >= 0 ? "success.main" : "error.main"} />
                                <ResultCard label="סה״כ רווח ($)" value={`$${results.totalProfit.toLocaleString()}`} color={results.totalProfit >= 0 ? "success.main" : "error.main"} />
                                <ResultCard label="מספר עסקאות" value={results.trades} />
                                <ResultCard label="מקסימום הפסד (Drawdown)" value={`${results.maxDrawdown}%`} color="error.main" />
                            </Box>

                            {/* Chart */}
                            <Card sx={{
                                flexGrow: 1,
                                p: 3,
                                minHeight: 400,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(34, 211, 238, 0.2)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                            }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TrendingUpIcon color="primary" /> ביצועי אסטרטגיה vs. החזקה (Buy & Hold)
                                </Typography>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={results.chartData}>
                                        <defs>
                                            <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#94A3B8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            stroke="#94A3B8"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dx={-10}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                                borderColor: 'rgba(34, 211, 238, 0.2)',
                                                borderRadius: 12,
                                                backdropFilter: 'blur(8px)',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ fontSize: 13, fontWeight: 500 }}
                                            labelStyle={{ color: '#94A3B8', marginBottom: 8 }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: 20 }} />
                                        <Line
                                            type="monotone"
                                            dataKey="strategyValue"
                                            name="האסטרטגיה שלי"
                                            stroke="#22D3EE"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#22D3EE', strokeWidth: 0 }}
                                            activeDot={{ r: 8, strokeWidth: 0 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="buyHoldValue"
                                            name="החזקה (Buy & Hold)"
                                            stroke="#64748B"
                                            strokeWidth={2}
                                            dot={false}
                                            strokeDasharray="5 5"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

// Helper Components & Mock Generator
// ResultCard is defined at the top now.

function generateMockBacktestData(config: any) {
    // Generate realistic-looking curve
    const points = [];
    let currentStrategy = config.initialCapital;
    let currentBuyHold = config.initialCapital;
    const days = 365; // 1 year mock

    // Random walk with drift
    let price = 100;

    for (let i = 0; i < days; i++) {
        const change = (Math.random() - 0.48) * 0.05; // Slightly bullish bias
        price = price * (1 + change);
        currentBuyHold = currentBuyHold * (1 + change);

        // Mock Strategy: performs slightly better or worse randomly but smoother
        // If random > 0.6, we made a good trade, else flat or small loss
        if (Math.random() > 0.7) {
            currentStrategy = currentStrategy * (1 + change * 1.5); // Good trade leverage
        } else if (Math.random() < 0.2) {
            currentStrategy = currentStrategy * (1 - Math.abs(change * 0.5)); // Small loss
        } else {
            currentStrategy = currentStrategy * 1.0001; // Interest / Flat
        }

        if (i % 30 === 0) { // Push data points monthly-ish
            points.push({
                date: `חודש ${Math.floor(i / 30) + 1}`,
                strategyValue: Math.round(currentStrategy),
                buyHoldValue: Math.round(currentBuyHold)
            });
        }
    }

    const totalProfit = Math.round(currentStrategy - config.initialCapital);
    const roi = ((totalProfit / config.initialCapital) * 100).toFixed(2);

    return {
        roi,
        totalProfit,
        trades: Math.floor(Math.random() * 50) + 10,
        maxDrawdown: (Math.random() * 15 + 5).toFixed(2),
        chartData: points
    };
}
