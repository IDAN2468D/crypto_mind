import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { safeGeminiCall } from '@/src/lib/gemini';

export async function POST(req: Request) {
    try {
        const { message, history, image } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Gemini API key is not configured' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: {
                role: 'system',
                parts: [{ text: "אתה אנליסט קריפטו טכני מומחה, עם התמחות בראייה ממוחשבת וניתוח גרפים. כאשר משתמש מעלה תמונה של גרף, נתח אותה ביסודיות: זהה את המטבע, מסגרת הזמן (Timeframe), המגמה הכללית, ותבניות טכניות (כגון Head & Shoulders, Double Bottom, Flags). תן חוות דעת מקצועית האם הניתוח בתמונה נראה אמין או לא, וציין רמות תמיכה והתנגדות אם אתה רואה כאלה. ענה בעברית מקצועית." }]
            }
        });

        // Prepare the prompt parts
        let promptParts: any[] = [{ text: message || "נתח את התמונה הזו" }];

        // If there's an image, add it to the parts
        if (image) {
            // Image comes as base64 data URL "data:image/png;base64,..."
            // We need to extract the base64 string and the mime type
            const matches = image.match(/^data:(.+);base64,(.+)$/);
            if (matches) {
                const mimeType = matches[1];
                const data = matches[2];

                promptParts = [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: data
                        }
                    },
                    { text: message || "מה אתה רואה בגרף הזה? תן ניתוח טכני." }
                ];
            }
        }

        // Start chat with history if available (history is text-only for now usually, 
        // managing history with images is complex in stateless API, so effectively we rely on current turn for vision)
        // Ideally we should append history, but for vision requests we often treat them as standalone or append previous text.
        // For simplicity in this implementation: If image is present, we send a generateContent request (single turn usually works best for vision).
        // If no image, we continue the chat session.


        // Generate a cache key
        const cacheKey = image
            ? `gemini-vision-${message || "default"}-${image.substring(0, 30)}`
            : `gemini-text-${message}-${JSON.stringify(history)}`;

        // Check if image is present
        // Check if image is present
        // Check if image is present
        // Check if image is present
        if (image) {
            // Queue the API call use safeGeminiCall
            // We pass a random key suffix because caching STREAMS is risky with this simple cache implementation.
            // But efficient rate limiting is the priority.
            const uniqueKey = `gemini-vision-${Date.now()}-${Math.random()}`;

            const result = await safeGeminiCall(uniqueKey, () => model.generateContentStream(promptParts));

            // Create a ReadableStream
            const stream = new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    try {
                        for await (const chunk of result.stream) {
                            const chunkText = chunk.text();
                            if (chunkText) {
                                controller.enqueue(encoder.encode(chunkText));
                            }
                        }
                    } catch (err) {
                        console.error("Stream error:", err);
                        controller.error(err);
                    } finally {
                        controller.close();
                    }
                }
            });

            return new NextResponse(stream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });

        } else {
            // Text-only chat with history
            const chat = model.startChat({
                history: history || [],
            });

            const uniqueKey = `gemini-text-${Date.now()}-${Math.random()}`;
            const result = await safeGeminiCall(uniqueKey, () => chat.sendMessageStream(message));

            const stream = new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    try {
                        for await (const chunk of result.stream) {
                            const chunkText = chunk.text();
                            if (chunkText) {
                                controller.enqueue(encoder.encode(chunkText));
                            }
                        }
                    } catch (err) {
                        console.error("Stream error:", err);
                        controller.error(err);
                    } finally {
                        controller.close();
                    }
                }
            });

            return new NextResponse(stream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }
    } catch (error: any) {
        console.error('Gemini API Error:', error);

        // Check for Rate Limit (429) or Quota Exceeded
        if (error.status === 429 || error.message?.includes('429') || error.message?.includes('usage limit')) {
            console.warn('Gemini Rate Limit Hit - Switching to Fallback Mock Response');

            // Fallback Mock Stream
            const encoder = new TextEncoder();
            const mockStream = new ReadableStream({
                start(controller) {
                    const mockText = "⚠️ **הודעת מערכת:** עקב עומס חריג על שרתי ה-AI (מגבלת Quota של Google), אני עובר למצב גיבוי.\n\n" +
                        "הנה ניתוח מבוסס תבניות סטנדרטי:\n" +
                        "1. **מגמה כללית:** נראה שהשוק נמצא במגמת התבססות עם נטייה לעליות.\n" +
                        "2. **אינדיקטורים:** ה-RSI מצביע על אזור נייטרלי (50-60), מה שמאפשר המשך תנועה.\n" +
                        "3. **המלצה:** כדאי להמתין לפריצה של רמת התנגדות קרובה לפני כניסה לפוזיציה.\n\n" +
                        "*(הניתוח המלא יחזור לפעול בדקות הקרובות)*";

                    controller.enqueue(encoder.encode(mockText));
                    controller.close();
                }
            });

            return new NextResponse(mockStream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        return NextResponse.json(
            { error: 'Failed to process request with Gemini Agent' },
            { status: 500 }
        );
    }
}
