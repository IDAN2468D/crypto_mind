
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { safeGeminiCall } from '@/src/lib/gemini';

const MOCK_HEADLINES = [
    "Bitcoin breaks $64k resistance level amid strong institutional buying.",
    "SEC signals potential openness to Ethereum ETF applications.",
    "Solana ecosystem sees 20% growth in active wallet addresses.",
    "Federal Reserve hints at interest rate cuts later this year.",
    "Major crypto exchange reports record trading volumes in Q1."
];

export async function POST(req: Request) {
    try {
        // ... (auth checks) ...
        const clientKey = req.headers.get('x-gemini-api-key');
        const apiKey = clientKey || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Gemini API key is missing' },
                { status: 401 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
        Analyze the following recent cryptocurrency news headlines and provide a market sentiment analysis.
        
        Headlines:
        ${MOCK_HEADLINES.map(h => `- ${h}`).join('\n')}

        Task:
        1. Determine the overall sentiment score (0-100, where 0 is extreme fear/bearish and 100 is extreme greed/bullish).
        2. Assign a Label (Bearish, Neutral, Bullish, Strong Bullish).
        3. Write a concise analysis summary in Hebrew (2-3 sentences) explaining the reasoning.

        Output JSON format only:
        {
            "score": number,
            "label": "string",
            "summary": "string"
        }
        `;

        const cacheKey = `sentiment-${MOCK_HEADLINES.join('-').substring(0, 50)}`;

        const result = await safeGeminiCall(cacheKey, () => model.generateContent(prompt));
        const response = await result.response;
        const text = response.text();

        // Cleanup JSON string if it contains markdown code blocks
        const jsonString = text.replace(/```json\n|\n```/g, '').trim();
        const data = JSON.parse(jsonString);

        return NextResponse.json(data);

    } catch (error: any) {
        let fallbackSummary = "לא ניתן היה לבצע ניתוח AI כרגע עקב עומס. על בסיס נתונים טכניים, השוק נראה חיובי עם מומנטום חזק בביטקוין.";

        if (error.message === "RATE_LIMIT_EXCEEDED" || error.status === 429 || error.message?.includes('429') || error.message === 'CIRCUIT_OPEN_RATE_LIMIT') {
            console.warn('Gemini Rate Limit Exceeded (Circuit Open). Using fallback data.');
            fallbackSummary = "עקב עומס חריג על שרתי ה-AI (429/Circuit Breaker), מוצג ניתוח טכני גיבוי.";
        } else if (error.message?.includes('SAFETY') || error.message?.includes('blocked')) {
            console.warn('Gemini Safety Block. Using fallback data.');
            fallbackSummary = "הניתוח נחסם על ידי מסנני הבטיחות של ה-AI. מוצג ניתוח טכני בסיסי.";
        } else {
            console.error('Sentiment Analysis Error (Falling back to mock data):', error);
        }

        // Fallback data in case of failure
        return NextResponse.json({
            score: 75,
            label: "Bullish (Fallback)",
            summary: fallbackSummary
        });
    }
}
