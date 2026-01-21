'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { cryptoService, CoinData } from '@/src/services/cryptoService';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'מזהה', width: 70 },
    { field: 'coin', headerName: 'מטבע', width: 130 },
    {
        field: 'signal', headerName: 'איתות', width: 130, renderCell: (params) => (
            <Chip
                label={params.value}
                color={params.value === 'קנה' ? 'success' : 'error'}
                size="small"
                variant="filled"
                sx={{ fontWeight: 'bold' }}
            />
        )
    },
    { field: 'current', headerName: 'מחיר נוכחי', type: 'number', width: 130, valueFormatter: (value: any) => `$${value?.toLocaleString()}` },
    { field: 'entry', headerName: 'כניסה', type: 'number', width: 130, valueFormatter: (value: any) => `$${value?.toLocaleString()}` },
    { field: 'target', headerName: 'יעד', type: 'number', width: 130, valueFormatter: (value: any) => `$${value?.toLocaleString()}` },
    { field: 'stopLoss', headerName: 'סטופ', type: 'number', width: 130, valueFormatter: (value: any) => `$${value?.toLocaleString()}` },
    {
        field: 'status', headerName: 'סטטוס', width: 130, renderCell: (params) => (
            <Typography variant="body2" sx={{ color: params.value === 'פעיל' ? 'primary.main' : 'text.secondary' }}>
                {params.value}
            </Typography>
        )
    },
];

export default function SignalsPage() {
    const [rows, setRows] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchSignals = async () => {
            setLoading(true);
            const data = await cryptoService.getMarketData();

            // Generate mock signals based on real data
            const newRows = data.map((coin, index) => {
                const isBuy = coin.price_change_percentage_24h > 0; // Simple logic: Trend following
                // Or maybe Contra: isBuy = coin.price_change_percentage_24h < 0; 
                // Let's go with Trend Following for "Strong" coins

                const signalType = coin.price_change_percentage_24h > 0 ? 'קנה' : 'מכור';
                const entryPrice = coin.current_price;
                const targetPrice = signalType === 'קנה' ? entryPrice * 1.05 : entryPrice * 0.95;
                const stopLoss = signalType === 'קנה' ? entryPrice * 0.97 : entryPrice * 1.03;

                return {
                    id: index + 1,
                    coin: `${coin.symbol.toUpperCase()}/USD`,
                    symbol: coin.symbol,
                    signal: signalType,
                    current: coin.current_price,
                    entry: entryPrice,
                    target: parseFloat(targetPrice.toFixed(2)),
                    stopLoss: parseFloat(stopLoss.toFixed(2)),
                    status: 'פעיל'
                };
            });

            setRows(newRows);
            setLoading(false);
        };

        fetchSignals();
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                איתותי AI
            </Typography>
            <Card sx={{ height: 600, width: '100%', p: 2 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{
                            border: 0,
                            '& .MuiDataGrid-columnHeader': {
                                bgcolor: 'rgba(255,255,255,0.02)',
                            }
                        }}
                    />
                )}
            </Card>
        </Box>
    );
}
