'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    Chip,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Alert,
    AlertTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Mock Analysis Types
type RiskLevel = 'Safe' | 'Medium' | 'Critical';

interface AuditResult {
    score: number;
    riskLevel: RiskLevel;
    findings: {
        severity: 'High' | 'Medium' | 'Low';
        title: string;
        description: string;
    }[];
    contractName: string;
    compilerVersion: string;
    aiAnalysis: string;
}

export default function SmartAuditPage() {
    const [address, setAddress] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0); // 0: Idle, 1: Fetching, 2: Gemini Thinking, 3: Done
    const [result, setResult] = useState<AuditResult | null>(null);

    const handleAnalyze = () => {
        if (!address.trim()) return;

        setIsAnalyzing(true);
        setAnalysisStep(1);
        setResult(null);

        // Simulation sequences
        setTimeout(() => setAnalysisStep(2), 1000); // 1. Fetching Code simulated
        setTimeout(() => {
            // 2. Gemini Flash Analysis simulated (Fast!)
            const mockResult = generateMockAudit(address);
            setResult(mockResult);
            setAnalysisStep(3);
            setIsAnalyzing(false);
        }, 2200);
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return '#4ade80'; // Green
        if (score >= 60) return '#facc15'; // Yellow
        return '#f87171'; // Red
    };

    return (
        <Box className="animate-fade-in" sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="900" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    background: 'linear-gradient(45deg, #22D3EE, #10B981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                }}>
                    <SecurityIcon sx={{ fontSize: 50, color: '#22D3EE' }} />
                    SMART CONTRACT BODYGUARD
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Powered by <SpeedIcon fontSize="small" color="primary" /> <b>Gemini 2.5 Flash</b>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    ניתוח לוגי עמוק בזמן אמת. המערכת בודקת את ה-Flow של הקוד ולא רק מילות מפתח.
                </Typography>
            </Box>

            {/* Input Section */}
            <Card sx={{
                p: 1,
                mb: 6,
                bgcolor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                boxShadow: '0 0 40px rgba(34, 211, 238, 0.1)'
            }}>
                <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="הדבק כתובת חוזה (0x...) כאן..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CodeIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: { fontSize: '1.2rem', color: 'white' }
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !address}
                        sx={{
                            px: 4,
                            borderRadius: 2,
                            bgcolor: isAnalyzing ? 'action.disabled' : '#22D3EE',
                            color: 'black',
                            fontWeight: 'bold',
                            boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                            '&:hover': { bgcolor: '#67e8f9' }
                        }}
                    >
                        {isAnalyzing ? <CircularProgress size={24} color="inherit" /> : 'סרוק חוזה'}
                    </Button>
                </Box>
                {/* Progress Bar just to show activity line */}
                {isAnalyzing && (
                    <LinearProgress sx={{ height: 2, bgcolor: 'transparent', '& .MuiLinearProgress-bar': { bgcolor: '#22D3EE' } }} />
                )}
            </Card>

            {/* Analysis Steps Visual */}
            {isAnalyzing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 6 }}>
                    <StepCard label="מושך קוד מקור (Etherscan)" isActive={analysisStep >= 1} isDone={analysisStep > 1} delay={0} />
                    <StepCard label="מפענח לוגיקה (Gemini Flash)" isActive={analysisStep >= 2} isDone={analysisStep > 2} icon={<SmartToyIcon />} delay={0.2} />
                    <StepCard label="מייצר דו''ח אבטחה" isActive={analysisStep >= 3} isDone={analysisStep > 3} delay={0.4} />
                </Box>
            )}

            {/* Application Results */}
            {result && !isAnalyzing && (
                <Box className="animate-slide-up">
                    <Grid container spacing={4}>
                        {/* Score Card */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{
                                height: '100%',
                                textAlign: 'center',
                                p: 4,
                                bgcolor: 'rgba(15, 23, 42, 0.8)',
                                border: `1px solid ${getScoreColor(result.score)}`,
                                boxShadow: `0 0 30px ${getScoreColor(result.score)}40`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    background: `radial-gradient(circle at center, ${getScoreColor(result.score)}10, transparent 70%)`
                                }} />

                                <Typography variant="h6" color="text.secondary" gutterBottom>ציון אבטחה</Typography>
                                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={100}
                                        size={180}
                                        thickness={2}
                                        sx={{ color: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <CircularProgress
                                        variant="determinate"
                                        value={result.score}
                                        size={180}
                                        thickness={2}
                                        sx={{
                                            color: getScoreColor(result.score),
                                            position: 'absolute',
                                            left: 0,
                                            [`& .MuiCircularProgress-circle`]: { strokeLinecap: 'round' }
                                        }}
                                    />
                                    <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <Typography variant="h2" component="div" fontWeight="900" color="white">
                                            {result.score}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">מתוך 100</Typography>
                                    </Box>
                                </Box>

                                <Chip
                                    label={result.riskLevel === 'Safe' ? "בטוח למסחר" : result.riskLevel === 'Medium' ? "סיכון בינוני" : "סיכון קריטי"}
                                    sx={{
                                        bgcolor: `${getScoreColor(result.score)}20`,
                                        color: getScoreColor(result.score),
                                        border: `1px solid ${getScoreColor(result.score)}`,
                                        fontWeight: 'bold',
                                        px: 2,
                                        py: 2.5,
                                        borderRadius: 2,
                                        fontSize: '1rem'
                                    }}
                                />
                            </Card>
                        </Grid>

                        {/* Details Card */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Card sx={{ height: '100%', bgcolor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">ניתוח AI לוגי</Typography>
                                        <Chip label={result.contractName} size="small" variant="outlined" color="primary" />
                                    </Box>

                                    <Alert severity="info" sx={{ mb: 3, bgcolor: 'rgba(34, 211, 238, 0.1)', border: 'none', color: '#cffafe' }}>
                                        <AlertTitle sx={{ fontWeight: 'bold' }}>תובנת Gemini Flash:</AlertTitle>
                                        {result.aiAnalysis}
                                    </Alert>

                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 3 }}>ממצאים טכניים:</Typography>
                                    <List>
                                        {result.findings.map((finding, idx) => (
                                            <ListItem key={idx} sx={{
                                                mb: 1.5,
                                                bgcolor: 'rgba(255,255,255,0.02)',
                                                borderRadius: 2,
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}>
                                                <ListItemIcon sx={{ minWidth: 40 }}>
                                                    {finding.severity === 'High' ? <ErrorIcon color="error" /> :
                                                        finding.severity === 'Medium' ? <WarningIcon color="warning" /> : <CheckCircleIcon color="success" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography fontWeight="bold" color="white">{finding.title}</Typography>}
                                                    secondary={<Typography variant="body2" color="text.secondary">{finding.description}</Typography>}
                                                />
                                                <Chip
                                                    label={finding.severity}
                                                    size="small"
                                                    color={finding.severity === 'High' ? 'error' : finding.severity === 'Medium' ? 'warning' : 'success'}
                                                    sx={{ borderRadius: 1, height: 20, fontSize: '0.7rem' }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

// Helper Components
function StepCard({ label, isActive, isDone, icon, delay }: { label: string, isActive: boolean, isDone: boolean, icon?: React.ReactNode, delay: number }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: isActive ? 1 : 0.3,
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease',
            animation: isActive ? `pulse 2s infinite ${delay}s` : 'none'
        }}>
            <Box sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: isDone ? '#4ade80' : isActive ? '#22D3EE' : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                boxShadow: isActive ? '0 0 20px rgba(34, 211, 238, 0.4)' : 'none',
                color: isDone || isActive ? '#000' : '#fff'
            }}>
                {isDone ? <CheckCircleIcon /> : icon || <CircularProgress size={20} color="inherit" />}
            </Box>
            <Typography variant="caption" fontWeight="bold" color={isActive ? "primary.main" : "text.secondary"}>
                {label}
            </Typography>
        </Box>
    );
}

// Mock Generator
function generateMockAudit(addr: string): AuditResult {
    // Deterministic mock based on address length or char to simulate variety
    const isRisky = addr.toLowerCase().endsWith('dead') || addr.length % 2 === 0;

    if (isRisky) {
        return {
            contractName: "SafeMoonTwo",
            compilerVersion: "v0.8.19",
            score: 35,
            riskLevel: 'Critical',
            aiAnalysis: "זיהיתי לוגיקה חשודה בפונקציית _transfer. ישנו תנאי שבודק אם השולח הוא ה-Owner, ואם לא - הוא מגביל את כמות המכירה ל-0. זהו סימן קלאסי ל-Honeypot.",
            findings: [
                { severity: 'High', title: 'Honeypot Logic', description: 'פונקציית העברה מכילה תנאים נסתרים המונעים מכירה ממשתמשים רגילים.' },
                { severity: 'High', title: 'Hidden Mint Function', description: 'הבעלים יכול לייצר כמות בלתי מוגבלת של מטבעות.' },
                { severity: 'Medium', title: 'Ownership Not Renounced', description: 'הבעלים עדיין מחזיק בשליטה מלאה על החוזה.' }
            ]
        };
    } else {
        return {
            contractName: "TrustToken",
            compilerVersion: "v0.8.20",
            score: 92,
            riskLevel: 'Safe',
            aiAnalysis: "הקוד נראה נקי וסטנדרטי (OpenZeppelin ERC20). אין פונקציות נסתרות או מנגנוני Minting חשודים. ה-Flow של פונקציות ה-Transfer תקין לחלוטין.",
            findings: [
                { severity: 'Low', title: 'Centralization Risk', description: 'כל כמות הטוקנים הראשונית נמצאת בארנק אחד (Wallet Dev).' },
                { severity: 'Low', title: 'Floating Pragma', description: 'גרסת הקומפיילר אינה מקובעת (מנהג נפוץ אך לא קריטי).' }
            ]
        }
    }
}
