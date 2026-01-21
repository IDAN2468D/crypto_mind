'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAgent } from '../context/AgentContext';
import {
    Box,
    Avatar,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
    CircularProgress,
    Collapse
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export function GeminiAgent() {
    const { isOpen, toggleAgent, closeAgent } = useAgent();
    // Using a ref to track if we've initialized the welcome message to avoid double-adding in Strict Mode
    const hasInitialized = useRef(false);

    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'שלום! אני סוכן הקריפטו החכם שלך. אני יכול לנתח שווקים, להמליץ על מטבעות חדשים ואפילו לנתח גרפים! צרף תמונה של גרף ואתן לך את דעתי המקצועית.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attachedImage, setAttachedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async () => {
        if (!input.trim() && !attachedImage) return;

        const userMessage = input;
        const imageToSend = attachedImage;

        setInput('');
        setAttachedImage(null); // Clear image immediately after sending

        // Optimistic UI update
        const newMsg: Message = { role: 'user', text: userMessage };
        // If there was an image, we could theoretically show it in the chat bubble too, 
        // but for simplicity we'll just show the text or a placeholder "[Image Uploaded]"
        if (imageToSend) {
            newMsg.text = userMessage ? `${userMessage}\n[תמונה צורפה]` : '[תמונה צורפה]';
        }

        setMessages(prev => [...prev, newMsg]);
        setIsLoading(true);

        try {
            const history = messages
                .filter((_, idx) => idx > 0 || messages[0].role === 'user')
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));

            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: imageToSend ? [] : history,
                    image: imageToSend
                })
            });

            if (!res.ok) throw new Error(res.statusText);
            if (!res.body) throw new Error('No response body');

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            // Add placeholder message for streaming
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg.role === 'model') {
                        // Append to the last message
                        lastMsg.text += chunk;
                    }
                    return newMessages;
                });

                // Auto-scroll during stream
                scrollToBottom();
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'שגיאת תקשורת. אנא נסה שוב מאוחר יותר.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <Collapse in={isOpen} unmountOnExit>
                <Paper
                    elevation={12}
                    sx={{
                        position: 'fixed',
                        bottom: 90,
                        right: 20,
                        width: { xs: '90%', sm: 380 },
                        height: 550,
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9999,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        bgcolor: 'rgba(19, 25, 38, 0.85)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        animation: 'slideUp 0.4s ease-out'
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, #22D3EE 0%, #7C3AED 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 32, height: 32 }}>
                                <SmartToyIcon sx={{ fontSize: 20 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="800" sx={{ lineHeight: 1.2 }}>Chart Vision AI</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>מחובר | v2.5</Typography>
                            </Box>
                        </Box>
                        <IconButton size="small" onClick={closeAgent} sx={{ color: 'white', '&:hover': { transform: 'rotate(90deg)', transition: '0.2s' } }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        background: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.05), transparent)'
                    }}>
                        {messages.map((msg, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    bgcolor: msg.role === 'user' ? 'primary.main' : 'rgba(255, 255, 255, 0.03)',
                                    color: msg.role === 'user' ? 'white' : 'text.primary',
                                    p: 2,
                                    borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                    maxWidth: '85%',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    fontSize: '0.95rem',
                                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{msg.text}</Typography>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ alignSelf: 'flex-start', p: 1, display: 'flex', gap: 1 }}>
                                <CircularProgress size={16} thickness={5} />
                                <Typography variant="caption" color="text.secondary">מעבד נתונים...</Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Image Attachment Preview */}
                    {attachedImage && (
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'rgba(34, 211, 238, 0.05)' }}>
                            <img src={attachedImage} alt="Preview" style={{ height: 40, borderRadius: 4, border: '1px solid #22D3EE' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>תמונה צורפה</Typography>
                            <IconButton size="small" onClick={() => setAttachedImage(null)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    {/* Input */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.default' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                            />
                            <IconButton
                                onClick={() => fileInputRef.current?.click()}
                                sx={{ color: attachedImage ? 'primary.main' : 'text.secondary' }}
                            >
                                <AttachFileIcon />
                            </IconButton>

                            <TextField
                                fullWidth
                                size="small"
                                placeholder={attachedImage ? "שאל על התמונה..." : "שאל משהו..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading}
                                autoComplete="off"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSend}
                                disabled={isLoading || (!input.trim() && !attachedImage)}
                                sx={{ bgcolor: 'rgba(34, 211, 238, 0.1)' }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Collapse>

            {/* Floating Button */}
            <Fab
                color="primary"
                aria-label="chat"
                onClick={toggleAgent}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999,
                    background: 'linear-gradient(45deg, #22D3EE 30%, #7C3AED 90%)',
                    boxShadow: '0 4px 15px rgba(34, 211, 238, 0.4)',
                    animation: isOpen ? 'none' : 'pulse 2s infinite',
                    '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {isOpen ? <CloseIcon /> : <SmartToyIcon />}
            </Fab>
        </>
    );
}
