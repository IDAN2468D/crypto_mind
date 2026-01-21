'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper
} from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoltIcon from '@mui/icons-material/Bolt';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import PublicIcon from '@mui/icons-material/Public';

import SecurityIcon from '@mui/icons-material/Security';
import RadarIcon from '@mui/icons-material/Radar';

const steps = [
    {
        label: 'ברוכים הבאים ל-CryptoMind 2.0',
        description: 'המערכת שודרגה עם עיצוב Premium חדשני, מנוע AI מתקדם וכלי ניתוח ויזואליים פורצי דרך.',
        icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#22D3EE' }} />
    },
    {
        label: 'השומר החכם (Smart Bodyguard)',
        description: 'נתח חוזים חכמים בזמן אמת. המערכת מזהה מלכודות Honeypot ולוגיקה זדונית לפני שאתה קונה.',
        icon: <SecurityIcon sx={{ fontSize: 40, color: '#4ade80' }} />
    },
    {
        label: 'צייד הנרטיבים (Narrative Hunter)',
        description: 'גלה טרנדים לפני שהם מתפוצצים. סורק מיליוני מקורות מידע כדי לזהות את הדבר הגדול הבא.',
        icon: <RadarIcon sx={{ fontSize: 40, color: '#facc15' }} />
    },
    {
        label: 'Edge AI Analyst',
        description: 'אנליסט אישי הפועל ישירות בדפדפן שלך. פרטיות מלאה, ללא שליחת מידע לשרתים חיצוניים.',
        icon: <BoltIcon sx={{ fontSize: 40, color: '#FCD34D' }} />
    },
    {
        label: 'Portfolio Galaxy',
        description: 'חקור את הנכסים שלך במרחב תלת-ממדי אינטראקטיבי. גודל כוכב = שווי, מהירות = תנודתיות.',
        icon: <PublicIcon sx={{ fontSize: 40, color: '#c084fc' }} />
    },
    {
        label: 'מבחן עמידות (Stress Test)',
        description: 'בדוק כיצד התיק שלך יגיב למשברים גלובליים כמו קריסת USDT או מיתון עולמי.',
        icon: <ThunderstormIcon sx={{ fontSize: 40, color: '#ef4444' }} />
    },
];

export default function WelcomeTour() {
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour_v2');
        if (!hasSeenTour) {
            // Short delay to allow animations to start first
            const timer = setTimeout(() => {
                setOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = () => {
        localStorage.setItem('hasSeenTour_v2', 'true');
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'rgba(15, 20, 31, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: 4,
                    boxShadow: '0 0 50px rgba(34, 211, 238, 0.2)',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
                <Typography variant="overline" color="primary" fontWeight="bold">עדכון מערכת</Typography>
                <Typography component="div" variant="h4" fontWeight="900" sx={{ mb: 2 }}>
                    CryptoMind <span style={{ color: '#22D3EE' }}>2.0</span>
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                StepIconProps={{
                                    sx: {
                                        color: activeStep === index ? '#22D3EE' : 'rgba(255,255,255,0.3)',
                                        '&.Mui-active': { color: '#22D3EE' },
                                        '&.Mui-completed': { color: '#22D3EE' },
                                    }
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">{step.label}</Typography>
                            </StepLabel>
                            <StepContent>
                                <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                    {step.icon}
                                    <Typography color="text.secondary">{step.description}</Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={index === steps.length - 1 ? handleClose : handleNext}
                                        sx={{
                                            mt: 1,
                                            mr: 1,
                                            bgcolor: 'primary.main',
                                            fontWeight: 'bold',
                                            '&:hover': { bgcolor: 'primary.dark' }
                                        }}
                                    >
                                        {index === steps.length - 1 ? 'התחל' : 'הבא'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1, color: 'text.secondary' }}
                                    >
                                        חזור
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </DialogContent>
        </Dialog>
    );
}
