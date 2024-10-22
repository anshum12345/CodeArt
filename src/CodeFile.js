// src/CodeFile.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CodeFile.css'; // Ensure CSS file is imported
import Header from './Header'; // Import the Header component

// Import images from the assets folder
import image1 from './asset/image1.svg'; // Adjust the path if necessary
import image2 from './asset/image2.svg'; // Adjust the path if necessary
import image3 from './asset/image3.svg'; // Adjust the path if necessary
import image4 from './asset/image4.svg'; // Adjust the path if necessary

const CodeFile = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        document.body.classList.toggle('dark-mode', !isDarkMode); // Toggle dark mode class
    };

    const tools = [
        {
            title: "JavaScript Compiler",
            path: '/path1',
            image: image1,
        },
        {
            title: "Real-Time Website Editor",
            path: '/path2',
            image: image2,
        },
        {
            title: "Image To Code",
            path: '/path3',
            image: image3,
        },
        {
            title: "Voice To Code",
            path: '/path4',
            image: image4,
        },
    ];

    return (
        <Box className="codefile-container">
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Typography variant="h2" className="codefile-heading">CodeFile</Typography>
            <Typography variant="body1" className="codefile-description">
                Think, Speak, Code, Repeat
            </Typography>

            <Box className="coding-tools-container">
                {tools.map((tool, index) => (
                    <Box key={index} className="coding-tool">
                        <img src={tool.image} alt={tool.title} className="coding-tool-image" />
                        <Typography variant="h5" className="tool-title">{tool.title}</Typography>
                        <Button
                            variant="contained"
                            className="tool-button"
                            onClick={() => navigate(tool.path)}
                        >
                            Get Started
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CodeFile;
