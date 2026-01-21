'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';

export default function SettingsPage() {
    const [openApiKeyDialog, setOpenApiKeyDialog] = React.useState(false);
    const [apiKey, setApiKey] = React.useState('');
    const [savedKey, setSavedKey] = React.useState('');
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) setSavedKey(storedKey);
    }, []);

    const handleSaveKey = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        setSavedKey(apiKey);
        setOpenApiKeyDialog(false);
        // In a real app, we might want to reload or update context
        alert('מפתח API נשמר בהצלחה! (רענן את הדף כדי שהשינויים ייכנסו לתוקף מלא)');
    };

    const handleConnectToggle = () => {
        setIsConnected(!isConnected);
    };

    return (
        <Box maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                הגדרות
            </Typography>

            <Paper sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                    <Typography variant="h6">כללי</Typography>
                </Box>
                <List>
                    <ListItem>
                        <ListItemText primary="מצב כהה" secondary="החלף ערכת נושא" />
                        <Switch defaultChecked />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="התראות" secondary="אפשר התראות שולחן עבודה לאיתותים" />
                        <Switch defaultChecked />
                    </ListItem>
                </List>
            </Paper>

            <Paper sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
                    <Typography variant="h6">הגדרות API</Typography>
                </Box>
                <List>
                    <ListItem>
                        <ListItemText primary="חיבור בורסה" secondary="חבר חשבון Binance/Coinbase" />
                        {isConnected ? (
                            <Chip label="מחובר" color="success" onDelete={handleConnectToggle} />
                        ) : (
                            <Button variant="outlined" size="small" onClick={handleConnectToggle}>חבר</Button>
                        )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="מפתח API של Gemini"
                            secondary={savedKey ? "המפתח מוגדר ושמור" : "לא מוגדר מפתח"}
                        />
                        <Button variant="text" onClick={() => setOpenApiKeyDialog(true)}>
                            {savedKey ? 'ערוך' : 'הגדר'}
                        </Button>
                    </ListItem>
                </List>
            </Paper>

            <Dialog open={openApiKeyDialog} onClose={() => setOpenApiKeyDialog(false)} dir="rtl">
                <DialogTitle>הגדרת מפתח Gemini API</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        אנא הכנס את מפתח ה-API שלך מ-Google AI Studio. המפתח יישמר באופן מקומי בדפדפן שלך.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apikey"
                        label="Gemini API Key"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenApiKeyDialog(false)} color="inherit">ביטול</Button>
                    <Button onClick={handleSaveKey} variant="contained">שמור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
