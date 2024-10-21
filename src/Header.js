import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true); // Set initial state to true for dark mode

  useEffect(() => {
    // Set initial styles based on dark mode
    document.body.style.backgroundColor = isDarkMode ? '#19202b' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: isDarkMode ? '#19202b' : '#f0f0f0', // Light gray for day mode
      color: isDarkMode ? '#fff' : '#000',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      fontFamily: 'Arial, sans-serif', // Change font family
    }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'center', // Center align items
        padding: { xs: '0 10px', sm: '0 20px' },
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}>
          Code Compiler
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '20px' }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')} 
            sx={{
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? '#ff4081' : '#ccc', // Hover color based on theme
                color: '#fff',
              },
            }}>
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/blog')} 
            sx={{
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? '#ff4081' : '#ccc', // Hover color based on theme
                color: '#fff',
              },
            }}>
            Go to Blog
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/app')} 
            sx={{
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? '#ff4081' : '#ccc', // Hover color based on theme
                color: '#fff',
              },
            }}>
            Download Your Code
          </Button>
          <Switch 
            checked={isDarkMode} 
            onChange={handleToggleTheme} 
            sx={{
              color: isDarkMode ? '#fff' : '#000', // Change switch color based on theme
            }} 
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
