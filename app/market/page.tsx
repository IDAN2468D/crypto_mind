'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TradingViewWidget from '@/src/components/TradingViewWidget';

export default function MarketPage() {
    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                סקירת שוק
            </Typography>

            <Grid container spacing={3}>
                {/* Market Cap Widget */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, height: '100%' }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                שווי שוק גלובלי
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                $2.45T
                            </Typography>
                            <Typography variant="body2" color="success.main">
                                +2.4% (24 שעות)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 24h Volume */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, height: '100%' }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                נפח 24 שעות
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                $85.2B
                            </Typography>
                            <Typography variant="body2" color="error.main">
                                -12.5% (24 שעות)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* BTC Dominance */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, height: '100%' }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                דומיננטיות BTC
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                52.1%
                            </Typography>
                            <Typography variant="body2" color="success.main">
                                +0.2%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Advanced TradingView Chart */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ height: 600, overflow: 'hidden', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <TradingViewWidget />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
