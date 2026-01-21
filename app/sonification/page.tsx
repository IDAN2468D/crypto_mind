'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, IconButton, Slider, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import * as Tone from 'tone';

// Mock Data Types
interface MarketPoint {
    price: number;
    volume: number;
    volatility: number;
    timestamp: number;
}

export default function SonificationPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [tempo, setTempo] = useState(120);
    const [instrument, setInstrument] = useState('synth');
    const [marketData, setMarketData] = useState<MarketPoint[]>([]);

    // Tone refs
    const synthRef = useRef<Tone.PolySynth | null>(null);
    const loopRef = useRef<Tone.Sequence | null>(null);
    const membraneRef = useRef<Tone.MembraneSynth | null>(null);

    // Initial Data Generation
    useEffect(() => {
        const data: MarketPoint[] = [];
        let price = 50000;
        for (let i = 0; i < 50; i++) {
            const change = (Math.random() - 0.5) * 2000;
            price += change;
            data.push({
                price: Math.abs(price),
                volume: Math.random(), // 0 to 1
                volatility: Math.abs(change) / 2000, // 0 to 1
                timestamp: i
            });
        }
        setMarketData(data);
    }, []);

    // Setup Synth
    const initAudio = async () => {
        await Tone.start();

        if (!synthRef.current) {
            synthRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "triangle" },
                envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 }
            }).toDestination();

            // Add some reverb for atmosphere
            const reverb = new Tone.Reverb(2).toDestination();
            synthRef.current.connect(reverb);
        }

        if (!membraneRef.current) {
            membraneRef.current = new Tone.MembraneSynth().toDestination();
        }
    };

    const togglePlay = async () => {
        if (!isPlaying) {
            await initAudio();

            if (synthRef.current && membraneRef.current) {
                const stepCount = marketData.length;
                let step = 0;

                Tone.Transport.bpm.value = tempo;

                // Stop any previous transport to be safe
                Tone.Transport.stop();
                Tone.Transport.cancel();

                const loop = new Tone.Loop((time) => {
                    const point = marketData[step % stepCount];

                    // Map Price to Pitch (Mid C to High C area)
                    // Normalize price to note range
                    const minPrice = Math.min(...marketData.map(d => d.price));
                    const maxPrice = Math.max(...marketData.map(d => d.price));
                    const normalizedPrice = (point.price - minPrice) / (maxPrice - minPrice);

                    // Pentatonic Scale for musicality
                    const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];
                    const noteIndex = Math.floor(normalizedPrice * (scale.length - 1));
                    const note = scale[noteIndex];

                    // Map Volume to Velocity
                    const velocity = 0.5 + (point.volume * 0.5);

                    // Trigger Synth
                    synthRef.current?.triggerAttackRelease(note, "8n", time, velocity);

                    // Trigger Bass/Drum on high volatility (Drops)
                    if (point.volatility > 0.6) {
                        membraneRef.current?.triggerAttackRelease("C2", "8n", time);
                    }

                    // Update UI
                    Tone.Draw.schedule(() => {
                        setCurrentStep(step % stepCount);
                    }, time);

                    step++;
                }, "8n").start(0);

                loopRef.current = loop as any;
                Tone.Transport.start();
                setIsPlaying(true);
            }
        } else {
            Tone.Transport.stop();
            Tone.Transport.cancel(); // Clear scheduled events

            if (loopRef.current) {
                loopRef.current.dispose();
                loopRef.current = null;
            }

            setIsPlaying(false);
            setCurrentStep(0);
        }
    };

    const handleTempoChange = (event: Event, newValue: number | number[]) => {
        setTempo(newValue as number);
        Tone.Transport.bpm.value = newValue as number;
    };

    return (
        <Box sx={{ p: 0, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight="900" sx={{ display: 'flex', alignItems: 'center', gap: 2, letterSpacing: '-1px' }}>
                    <GraphicEqIcon sx={{ color: '#F472B6', fontSize: 40 }} />
                    MARKET SONIFICATION
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 600 }}>
                    האזן ל"מוזיקה" של השוק. המערכת מתרגמת נתוני מחיר ונפח לצלילים בזמן אמת, ומאפשרת לך "לשמוע" את המגמה.
                </Typography>
            </Box>

            {/* Visualizer & Controls */}
            <Card sx={{
                flexGrow: 1,
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.8))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative',
                borderRadius: 6,
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                {/* Abstract Visualizer */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    height: 250,
                    gap: 0.8,
                    mb: 8,
                    width: '100%',
                    maxWidth: 1000,
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {marketData.map((point, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                flex: 1,
                                background: idx === currentStep
                                    ? 'linear-gradient(180deg, #F472B6 0%, #ec4899 100%)'
                                    : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                height: `${(point.price / 60000) * 100}%`,
                                minHeight: '5%',
                                borderRadius: 4,
                                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: idx === currentStep ? '0 0 30px rgba(244, 114, 182, 0.6)' : 'none',
                                opacity: Math.abs(idx - currentStep) < 8 ? 1 : 0.3,
                                transform: idx === currentStep ? 'scaleY(1.1)' : 'scaleY(1)'
                            }}
                        />
                    ))}
                </Box>

                {/* Controls */}
                <Box sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 800,
                    zIndex: 1,
                    bgcolor: 'rgba(255,255,255,0.03)',
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <IconButton
                        onClick={togglePlay}
                        sx={{
                            width: 80,
                            height: 80,
                            transition: 'all 0.3s',
                            bgcolor: isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 211, 238, 0.2)',
                            color: isPlaying ? '#ef4444' : '#22D3EE',
                            border: `1px solid ${isPlaying ? '#ef4444' : '#22D3EE'}`,
                            '&:hover': {
                                bgcolor: isPlaying ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 211, 238, 0.3)',
                                transform: 'scale(1.05)',
                                boxShadow: `0 0 20px ${isPlaying ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 211, 238, 0.4)'}`
                            }
                        }}
                    >
                        {isPlaying ? <StopIcon sx={{ fontSize: 40 }} /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom fontWeight="bold" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Playback Speed (BPM)</Typography>
                        <Slider
                            value={tempo}
                            min={60}
                            max={240}
                            onChange={handleTempoChange}
                            valueLabelDisplay="auto"
                            sx={{ color: '#F472B6', '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(244, 114, 182, 0.5)' } }}
                        />
                    </Box>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Sound Engine</InputLabel>
                        <Select
                            value={instrument}
                            label="Sound Engine"
                            onChange={(e) => setInstrument(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="synth">Synthesizer</MenuItem>
                            <MenuItem value="piano" disabled>Grand Piano</MenuItem>
                            <MenuItem value="strings" disabled>Orchestra</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Playing Info */}
                {isPlaying && (
                    <Box sx={{ mt: 5, textAlign: 'center', animation: 'pulse 2s infinite' }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#F472B6' }}>
                            Computing Candle #{currentStep + 1}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 1 }}>
                            <Typography variant="body1" color="text.secondary">
                                Price: <span style={{ color: 'white' }}>${marketData[currentStep]?.price.toFixed(2)}</span>
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Vol: <span style={{ color: 'white' }}>{marketData[currentStep]?.volume.toFixed(2)}</span>
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Card>
        </Box>
    );
}
