'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, CircularProgress, Alert, LinearProgress, Chip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import * as webllm from "@mlc-ai/web-llm";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function EdgeAnalystPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'שלום! אני מודל AI שרץ במלואו על הדפדפן שלך. שום מידע לא נשלח לשרת חיצוני. שאל אותי כל דבר על קריפטו, אסטרטגיות מסחר או ניתוח טכני.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
    const [progress, setProgress] = useState<{ text: string, percent: number } | null>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, progress]);

    const initEngine = async () => {
        setError(null);
        setIsLoading(true);
        try {
            // Using a smaller model for faster loading in demo - Gemma 2B or Llama 3 8B optimized
            // Using "Gemma-2b-it-q4f32_1-MLC" as it acts as a lightweight instruct model
            const selectedModel = "Gemma-2b-it-q4f32_1-MLC";

            const initProgressCallback = (report: webllm.InitProgressReport) => {
                setProgress({ text: report.text, percent: report.progress * 100 });
            };

            const engineInstance = await webllm.CreateMLCEngine(
                selectedModel,
                { initProgressCallback: initProgressCallback }
            );

            setEngine(engineInstance);
            setIsModelLoaded(true);
            setProgress(null);
        } catch (err: any) {
            console.error("Failed to load model:", err);
            setError("הדפדפן שלך לא תומך ב-WebGPU או שהייתה שגיאה בטעינת המודל. אנא וודא שאתה משתמש בכרום עדכני.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !engine) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const chunks = await engine.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful and knowledgeable crypto analyst assistant. Answer in Hebrew. Be concise." },
                    ...messages.map(m => ({ role: m.role, content: m.content })),
                    { role: "user", content: userMsg }
                ],
                stream: false, // For simplicity in this implementation, can do streaming later
            });

            const reply = chunks.choices[0].message.content || "No response";
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

        } catch (err) {
            console.error("Generation error:", err);
            setMessages(prev => [...prev, { role: 'assistant', content: "Error generating response." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 0, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <BoltIcon sx={{ color: '#FCD34D', fontSize: 36 }} />
                    Edge AI Analyst (WebLLM)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        אנליסט פרטי הרץ מקומית על ה-GPU שלך.
                    </Typography>
                    <Chip
                        icon={<SecurityIcon sx={{ fontSize: 16 }} />}
                        label="Zero Data Egress - פרטיות מוחלטת"
                        color="success"
                        variant="outlined"
                        size="small"
                        sx={{ height: 24 }}
                    />
                </Box>
            </Box>

            {!isModelLoaded ? (
                <Card sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                    <Box sx={{ maxWidth: 500, width: '100%', textAlign: 'center' }}>
                        <SmartToyIcon sx={{ fontSize: 80, mb: 2, color: 'text.secondary' }} />
                        <Typography variant="h5" gutterBottom fontWeight="bold">טעינת מודל מקומי</Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>
                            כדי להבטיח פרטיות מלאה, אנו טוענים מודל שפה (LLM) ישירות לדפדפן שלך.
                            תהליך זה לוקח מספר שניות (הודות ל-WebGPU) וקורה רק בפעם הראשונה.
                        </Typography>

                        {progress ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={progress.percent} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                                <Typography variant="caption" color="text.secondary">{progress.text}</Typography>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                size="large"
                                onClick={initEngine}
                                disabled={isLoading}
                                sx={{ background: 'linear-gradient(90deg, #FCD34D, #F59E0B)', color: 'black', fontWeight: 'bold' }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'טען מודל והתחל (Gemma 2B)'}
                            </Button>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                        )}
                    </Box>
                </Card>
            ) : (
                <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {/* Chat Area */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.map((msg, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    display: 'flex',
                                    gap: 2,
                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                                }}
                            >
                                <Box sx={{
                                    minWidth: 40, height: 40, borderRadius: '50%',
                                    bgcolor: msg.role === 'user' ? 'primary.main' : '#F59E0B',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                                }}>
                                    {msg.role === 'user' ? 'You' : <SmartToyIcon sx={{ color: 'black' }} />}
                                </Box>
                                <Card sx={{
                                    p: 2,
                                    bgcolor: msg.role === 'user' ? 'primary.dark' : 'rgba(255,255,255,0.05)',
                                    borderRadius: 3,
                                    borderTopRightRadius: msg.role === 'user' ? 0 : 12,
                                    borderTopLeftRadius: msg.role === 'assistant' ? 0 : 12
                                }}>
                                    <Typography>{msg.content}</Typography>
                                </Card>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ alignSelf: 'flex-start', ml: 7 }}>
                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={12} /> מקליד...
                                </Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'background.paper' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="שאל אותי משהו..."
                                variant="outlined"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading}
                                size="medium"
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)' }
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                sx={{ borderRadius: 3, minWidth: 60, bgcolor: 'primary.main' }}
                            >
                                <SendIcon />
                            </Button>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                            מופעל על ידי WebLLM. כל התוכן מיוצר מקומית.
                        </Typography>
                    </Box>
                </Card>
            )}
        </Box>
    );
}
