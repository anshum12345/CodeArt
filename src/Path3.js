// src/Path1.js
import React, { useState } from 'react';
import { Box, Typography, Button, TextareaAutosize } from '@mui/material';
import Tesseract from 'tesseract.js';
import { toast } from "react-hot-toast";
import logo from './asset/logo.png';

import { Brightness4, Brightness7 } from '@mui/icons-material'; // Icons for dark/light mode
import { IconButton } from '@mui/material';

const Path1 = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [imagePath, setImagePath] = useState("/mainLogo.png");
    const [text, setText] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleChange = (event) => {
        toast.success('File Added.');
        setImagePath(URL.createObjectURL(event.target.files[0]));
    };

    const handleClick = () => {
        toast.loading("Converting into Text...");
        setIsLoading(true);
        Tesseract.recognize(
            imagePath, 'eng',
            { logger: m => console.log(m) }
        )
        .then(result => {
            setText(result.data.text);
            toast.remove();
            toast.success("Image Converted");
        })
        .catch(err => {
            console.error(err);
            toast.remove();
            toast.error("Please Check Internet Connection");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const copyContent = () => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to Clipboard");
    };

    const clear = () => {
        toast.success("Output Cleared");
        setText("");
        // setImagePath("/mainLogo.png");
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            backgroundColor: isDarkMode ? '#121212' : '#f5f5f5', 
            color: isDarkMode ? '#e0e0e0' : '#333', 
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease-in-out',
        }}>
            <IconButton onClick={toggleTheme} sx={{ position: 'absolute', top: '1rem', right: '1rem', color: isDarkMode ? '#e0e0e0' : '#333' }}>
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <img 
                src={logo} 
                alt="Logo" 
                style={{ width: '150px', marginBottom: '1rem', animation: 'fadeIn 0.5s' }} 
            />
            
            <Typography variant="h2" sx={{ 
                marginBottom: '1rem', 
                fontWeight: 'bold', 
                animation: 'fadeIn 0.5s'
            }}>
                Image to Text Converter
            </Typography>
            <Typography variant="body1" sx={{ 
                marginBottom: '2rem', 
                color: isDarkMode ? '#b0bec5' : '#555', 
                animation: 'fadeIn 0.5s 0.3s'
            }}>
                Convert images to text easily:
            </Typography>
            
            <div className="imageMain" style={{ position: 'relative', textAlign: 'center', padding: '1rem' }}>
                {/* <img 
                    src={imagePath} 
                    className='Image-Logo' 
                    alt="logo" 
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1rem', animation: 'zoomIn 0.5s' }} 
                /> */}
                <input 
                    className='imagefiletype' 
                    type="file" 
                    onChange={handleChange} 
                    style={{ 
                        marginBottom: '1rem', 
                        padding: '0.5rem', 
                        backgroundColor: isDarkMode ? '#424242' : '#fff', 
                        color: isDarkMode ? '#e0e0e0' : '#000', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }} 
                />
                
                <div className="imagebutton" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        onClick={copyContent} 
                        sx={{
                            backgroundColor: '#1e88e5',
                            transition: 'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Copy
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleClick} 
                        disabled={isLoading}
                        sx={{
                            backgroundColor: '#1e88e5',
                            transition: 'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        {isLoading ? "Loading..." : "Convert To Text"}
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={clear} 
                        sx={{
                            backgroundColor: '#d32f2f',
                            transition: 'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#f44336',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Clear
                    </Button>
                </div>
                
                <div className="image-text-box" style={{ marginTop: '1rem' }}>
                    <TextareaAutosize
                        minRows={5}
                        placeholder='Your Text Here'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{
                            width: '100%', 
                            borderRadius: '8px', 
                            padding: '0.5rem', 
                            border: `1px solid ${isDarkMode ? '#424242' : '#ccc'}`, 
                            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                            color: isDarkMode ? '#e0e0e0' : '#000',
                            transition: 'border 0.3s',
                            '&:focus': {
                                borderColor: '#2196f3',
                                outline: 'none',
                            },
                        }}
                    />
                </div>
            </div>

            {/* Add keyframe animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes zoomIn {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </Box>
    );
};

export default Path1;
