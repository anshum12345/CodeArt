// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [buttonClicked, setButtonClicked] = useState(null);
    const [loading, setLoading] = useState(true);
    const [textColor, setTextColor] = useState('beige'); // Default text color
    const [showColorOptions, setShowColorOptions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = (path, buttonId) => {
        setButtonClicked(buttonId);
        setTimeout(() => {
            navigate(path);
            setButtonClicked(null);
        }, 300);
    };

    const handleColorChange = (color) => {
        setTextColor(color);
        setShowColorOptions(false); // Hide color options after selection
    };

    const toggleColorOptions = () => {
        setShowColorOptions((prev) => !prev);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Box className="home-container">
            {/* Header Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
            <IconButton onClick={toggleColorOptions}>
    <ColorLensIcon sx={{ color: '#4B3D2E' }} /> {/* Navy-beige mix in rgba */}
</IconButton>


            </Box>

            {/* Color Options */}
            {showColorOptions && (
                <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', animation: 'fadeIn 0.3s' }}>
                    {['red', 'green', 'blue', 'orange', 'purple'].map((color) => (
                        <Box
                            key={color}
                            onClick={() => handleColorChange(color)}
                            sx={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: color,
                                cursor: 'pointer',
                                borderRadius: '50%',
                                boxShadow: `0 0 5px ${color}`,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                    boxShadow: `0 0 10px ${color}`,
                                },
                            }}
                        />
                    ))}
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: 'auto',
                    padding: '2rem',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '2rem',
                        maxWidth: 600,
                    }}
                >
                <h1 className="heading" style={{ color: textColor, fontFamily: 'Lobster, cursive', animation: 'fadeIn 1s' }}>
    Welcome to CodeArt
</h1>
<h2 className="subheading" style={{ color: textColor, fontFamily: 'Roboto, sans-serif', animation: 'fadeIn 1.5s' }}>
    CodeArt is a code editor for the web.
</h2>
<p className="description" style={{ color: textColor, fontFamily: 'Roboto, sans-serif', animation: 'fadeIn 2s' }}>
In CodeArt, you can easily download, compile, and run your code. Our blog offers articles and videos on key data structures and algorithms (DSA) to enhance your learning experience and Upload your problems also.
</p>

                    <Button
                        className={`animated-button ${buttonClicked === 'app' ? 'clicked' : ''}`}
                        onClick={() => handleButtonClick('/app', 'app')}
                    >
                        Download Your Code
                    </Button>
                    <Button
                        className={`animated-button ${buttonClicked === 'blog' ? 'clicked' : ''}`}
                        onClick={() => handleButtonClick('/blog', 'blog')}
                    >
                        Go to Blog
                    </Button>
                    <Button
                        className={`animated-button ${buttonClicked === 'compiler' ? 'clicked' : ''}`}
                        onClick={() => handleButtonClick('/compiler', 'compiler')}
                    >
                        Go to Code Compiler
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'text.primary',
                        borderRadius: '10px',
                        padding: '2rem',
                        height: 'auto',
                        width: 'auto',
                    }}
                >
                    <img
                        alt="Code Editor"
                        src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010129.jpg?t=st=1729522826~exp=1729526426~hmac=1d8919bd66b39143aa6681e0dc058113e117c566c7eb57eeec7b5fb82ae7813c&w=996"
                        className="image"
                    />
                </Box>
            </Box>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/918052078680?text=Hi%2C%20Welcome%20to%20CodeArt...this%20is%20the%20message.%20My%20email%20is%20youremail@example.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.whatsappButton}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    style={styles.whatsappLogo}
                />
            </a>

            <Footer />
            <Chatbot />
        </Box>
    );
};

const styles = {
    whatsappButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s',
        zIndex: 1000,
    },
    whatsappLogo: {
        width: '30px',
        height: '30px',
    },
};

export default HomePage;
