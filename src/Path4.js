// src/Path4.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material';
import { LightMode, DarkMode, Mic, Stop, FileCopy, Clear } from '@mui/icons-material';
import 'regenerator-runtime/runtime'; 
import useClipboard from "react-use-clipboard";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LangList from './LangList';
import { toast } from 'react-hot-toast';

const Path4 = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const [darkMode, setDarkMode] = useState(true); // Initialize with dark mode

  const phraseToSymbolMap = {
    'semicolon': ';',
    'semi colon': ';',
    'comma': ',',
    'colon': ':',
    'dot': '.',
    'open parentheses': '(',
    'close parentheses': ')',
    'open round bracket': '(',
    'close round bracket': ')',
    'open curly bracket': '{',
    'close curly bracket': '}',
    'open square bracket': '[',
    'close square bracket': ']',
    'open single codes': "'",
    'close single codes': "'",
    'open double codes': '"',
    'close double codes': '"'
  };

  const startListening = () => {  
    toast.success("Start Speaking");
    toast.loading("Listening...", { duration: 10 });
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const processTranscript = (transcript) => {
    let processedTranscript = transcript;
    for (const [phrase, symbol] of Object.entries(phraseToSymbolMap)) {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      processedTranscript = processedTranscript.replace(regex, symbol);
    }
    setTextToCopy(processedTranscript);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    processTranscript(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const clearAll = () => {
    setTextToCopy("");
    resetTranscript();
    toast.success("Text Cleared");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        backgroundColor: theme.palette.background.default, 
        padding: '2rem',
        transition: 'background-color 0.3s ease', 
      }}>
        <Grid container spacing={2} sx={{ width: '100%', maxWidth: '600px' }}>
          <Grid item xs={12}>
            <LangList leftcolorv="white"/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Voice to Text Converter</Typography>
          </Grid>
          <Grid item xs={12}>
            <div 
              className="voiceTextContainer" 
              style={{ textAlign: 'center' }}
            >
              <div 
                className="voice2TextOutput" 
                onClick={() => setTextToCopy(textToCopy)} 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <mark>
                  <Typography variant="h6" className='voiceresultclass'>{textToCopy}</Typography>
                </mark>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} container spacing={1} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={startListening} startIcon={<Mic />}>Start</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={SpeechRecognition.stopListening} startIcon={<Stop />}>Stop</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={setCopied} startIcon={<FileCopy />}>{isCopied ? "Copied" : "Copy"}</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={clearAll} startIcon={<Clear />}>Clear</Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              onClick={toggleDarkMode} 
              sx={{ mt: 2, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: darkMode ? '#ccc' : '#333' }}}
              startIcon={darkMode ? <LightMode /> : <DarkMode />}
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Path4;
