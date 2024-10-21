import React from 'react';
import { AppBar, Toolbar, Button, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Head = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      sx={{
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#000',
        boxShadow: 'none',
        transition: 'background-color 0.5s ease, color 0.5s ease', // Add transition for smooth effect
      }}
    >
      <Toolbar 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: { xs: '0 10px', sm: '0 20px' },
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        <div>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')} 
            sx={{
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'background-color 0.3s ease, color 0.3s ease', // Transition for buttons
              '&:hover': {
                backgroundColor: isDarkMode ? '#ff4081' : '#ccc',
                color: '#fff',
              },
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/app')} 
            sx={{
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: isDarkMode ? '#ff4081' : '#ccc',
                color: '#fff',
              },
            }}
          >
            Download Your Code
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Switch 
            checked={isDarkMode} 
            onChange={toggleTheme} 
            sx={{
              color: isDarkMode ? '#fff' : '#000',
              marginLeft: '20px',
              '& .MuiSwitch-track': {
                backgroundColor: isDarkMode ? '#bbb' : '#ccc',
                transition: 'background-color 0.5s ease', // Transition for track
              },
              '&.Mui-checked .MuiSwitch-thumb': {
                backgroundColor: '#ff4081', // Color for the thumb when checked
              },
            }} 
          />
          {isDarkMode ? <FaMoon style={{ color: '#fff', fontSize: '1.5rem' }} /> : <FaSun style={{ color: '#000', fontSize: '1.5rem' }} />}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Head;
