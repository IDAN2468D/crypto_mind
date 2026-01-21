
import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export interface CoinData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
}

export interface ChartDataPoint {
    time: string;
    price: number;
}

export interface SentimentData {
    score: number;
    label: string;
    summary: string;
}

export const cryptoService = {
    // Get AI Sentiment Analysis
    getSentimentAnalysis: async (): Promise<SentimentData> => {
        try {
            const apiKey = localStorage.getItem('gemini_api_key') || '';
            const response = await axios.post('/api/sentiment', {}, {
                headers: {
                    'x-gemini-api-key': apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching sentiment:', error);
            return {
                score: 50,
                label: 'Neutral',
                summary: 'ניתוח רגשות לא זמין כרגע.'
            };
        }
    },

    // Get current data for specific coins
    getMarketData: async (coinIds: string[] = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano', 'dogecoin', 'polkadot']): Promise<CoinData[]> => {
        try {
            const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
                params: {
                    vs_currency: 'usd',
                    ids: coinIds.join(','),
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching market data:', error);
            return [];
        }
    },

    // Get chart data for Bitcoin (last 24 hours)
    getBitcoinChartData: async (): Promise<ChartDataPoint[]> => {
        try {
            const response = await axios.get(`${COINGECKO_API_URL}/coins/bitcoin/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '1', // 1 day for usually sufficiently granular data
                }
            });

            // Format data for Recharts: [timestamp, price] -> { time: 'HH:MM', price: 12345 }
            const prices = response.data.prices;
            return prices
                .filter((_: any, index: number) => index % 12 === 0) // Downsample a bit if needed
                .map((point: [number, number]) => {
                    const date = new Date(point[0]);
                    return {
                        time: date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
                        price: point[1]
                    };
                });
        } catch (error) {
            console.error('Error fetching chart data:', error);
            // Fallback mock data in case of rate limits
            return [
                { time: '10:00', price: 62000 },
                { time: '14:00', price: 63000 },
                { time: '18:00', price: 61500 },
            ];
        }
    }
};
