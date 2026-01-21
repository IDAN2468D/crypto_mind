'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cryptoService, CoinData, ChartDataPoint, SentimentData } from '@/src/services/cryptoService';
import { useAgent } from '@/src/context/AgentContext';

const newsData = [
  { title: 'ה-SEC אישרה בקשות ETF חדשות לביטקוין', time: 'לפני שעתיים', source: 'CryptoBrief' },
  { title: 'עדכון ללוח הזמנים של שדרוג Ethereum 2.0', time: 'לפני 4 שעות', source: 'EthWorld' },
  { title: 'זרימת הון מוסדית גדולה לאלטקוינס', time: 'לפני 6 שעות', source: 'MarketWatch' },
];

function AiMarketChart({ data }: { data: ChartDataPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <Typography color="text.secondary">טוען נתונים...</Typography>
      </Box>
    )
  }
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="time"
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis
            stroke="#94A3B8"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            itemStyle={{ color: '#F8FAFC' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22D3EE"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DashboardPage() {
  const { openAgent } = useAgent();
  const [marketData, setMarketData] = React.useState<CoinData[]>([]);
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [sentiment, setSentiment] = React.useState<SentimentData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [coins, chart, sent] = await Promise.all([
        cryptoService.getMarketData(),
        cryptoService.getBitcoinChartData(),
        cryptoService.getSentimentAnalysis()
      ]);
      setMarketData(coins);
      setChartData(chart);
      setSentiment(sent);
      setLoading(false);
    };
    fetchData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const btcData = marketData.find(c => c.id === 'bitcoin');
  const portfolioValue = 124592.50; // Mock holding

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: '-0.5px' }}>
        לוח בקרה
      </Typography>

      <Grid container spacing={3}>
        {/* 1. AI Insight Engine (Hero Card) */}
        <Grid size={{ xs: 12 }} className="animate-fade-in">
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 200,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #22D3EE, #7C3AED)'
              }}
            />
            <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
                  <InsightsIcon />
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                    מנוע תובנות AI
                  </Typography>
                  <Chip label="חי v2.5" size="small" color="secondary" sx={{ height: 20, fontSize: '0.65rem' }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(45deg, #22D3EE, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  סנטימנט שוק: <span style={{
                    color: sentiment?.label.toLowerCase().includes('fear') ? '#ef4444' : '#22c55e',
                    WebkitTextFillColor: sentiment?.label.toLowerCase().includes('fear') ? '#ef4444' : '#22c55e'
                  }}>
                    {sentiment ? sentiment.label : 'טוען...'}
                  </span>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                  {sentiment ? sentiment.summary : 'מבצע ניתוח חדשות ורשתות חברתיות בזמן אמת...'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  onClick={openAgent}
                  variant="contained"
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderRadius: '16px',
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', // Sky to Blue
                    boxShadow: '0 8px 25px -5px rgba(14, 165, 233, 0.5), 0 0 10px rgba(14, 165, 233, 0.3) inset', // Outer glow + Inner glow
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    letterSpacing: '0.5px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s ease',
                      zIndex: -1
                    },
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 12px 35px -5px rgba(14, 165, 233, 0.6), 0 0 20px rgba(14, 165, 233, 0.4) inset',
                      background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                      '&::before': {
                        left: '100%'
                      }
                    },
                    '&:active': { transform: 'scale(0.96)', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)' }
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: '1.6rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                  <span>הפעל סוכן מסחר</span>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const btn = document.activeElement as HTMLElement;
                    if (btn) btn.style.transform = 'rotate(180deg)';
                    setTimeout(() => { if (btn) btn.style.transform = 'none'; }, 500);
                    // Force re-fetch
                    setLoading(true);
                    cryptoService.getMarketData().then(d => {
                      setMarketData(d);
                      setLoading(false);
                    });
                  }}
                  sx={{
                    padding: '12px 28px',
                    fontSize: '1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.4)',
                      background: 'rgba(255,255,255,0.08)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  רענן ניתוח
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Key Metrics Widgets */}
        <Grid size={{ xs: 12, md: 4 }} className="animate-slide-up" sx={{ animationDelay: '0.1s' }}>
          <Card sx={{ bgcolor: 'rgba(34, 211, 238, 0.03)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(34, 211, 238, 0.1)', color: 'primary.main', display: 'flex' }}>
                <AttachMoneyIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">מחיר ביטקוין</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {btcData ? `$${btcData.current_price.toLocaleString()}` : '...'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className="animate-slide-up" sx={{ animationDelay: '0.2s' }}>
          <Card sx={{ bgcolor: 'rgba(34, 197, 94, 0.03)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(34, 197, 94, 0.1)', color: 'success.main', display: 'flex' }}>
                <TrendingUpIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">שינוי יומי (BTC)</Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: (btcData?.price_change_percentage_24h || 0) >= 0 ? 'success.main' : 'error.main' }}>
                  {btcData ? `${btcData.price_change_percentage_24h > 0 ? '+' : ''}${btcData.price_change_percentage_24h.toFixed(2)}%` : '...'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} className="animate-slide-up" sx={{ animationDelay: '0.3s' }}>
          <Card sx={{ bgcolor: 'rgba(124, 58, 237, 0.03)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(124, 58, 237, 0.1)', color: 'secondary.main', display: 'flex' }}>
                <PsychologyIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">נפח מסחר (24ש)</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {btcData ? `$${(btcData.total_volume / 1e9).toFixed(1)}B` : '...'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Market Projection Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%', borderRadius: 3, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">גרף מחיר (BTC/USD - 24ש)</Typography>
              <Chip label="בשידור חי" color="success" size="small" variant="outlined" />
            </Box>
            <Box sx={{ flexGrow: 1, minHeight: 300 }}>
              <AiMarketChart data={chartData} />
            </Box>
          </Card>
        </Grid>

        {/* 4. Live AI Signals */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderRadius: 3, p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography variant="h6" fontWeight="bold">מטבעות מובילים</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              {marketData.slice(0, 5).map((coin, index) => (
                <Box
                  key={coin.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '1px solid rgba(255,255,255,0.02)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={coin.image}
                      alt={coin.name}
                      sx={{ bgcolor: 'rgba(255,255,255,0.05)', fontSize: '0.875rem' }}
                    >
                      {coin.symbol[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{coin.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{coin.symbol.toUpperCase()}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold">${coin.current_price.toLocaleString()}</Typography>
                    <Typography variant="caption" display="block" color={coin.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}>
                      {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* 5. Recent Market Developments */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">התפתחויות שוק אחרונות</Typography>
                <Button variant="text" size="small">צפה בהכל</Button>
              </Box>
              <Grid container spacing={2}>
                {newsData.map((news, i) => (
                  <Grid size={{ xs: 12, md: 4 }} key={i}>
                    <Box sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        {news.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="caption" color="text.secondary">{news.source}</Typography>
                        <Typography variant="caption" color="text.secondary">{news.time}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
