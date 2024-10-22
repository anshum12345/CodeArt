// src/Path1.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LangList from './LangList';
import html from './asset/html.png';
import css from './asset/css.png';
import js from './asset/js.png';
import { toast } from 'react-hot-toast';
import { WbSunny, Nightlight } from '@mui/icons-material';

const Path1 = () => {
    const [darkMode, setDarkMode] = useState(true);
    const html_code = useRef(null);
    const css_code = useRef(null);
    const js_code = useRef(null);
    const result = useRef(null);
    const run_button = useRef(null);
  
    useEffect(() => {
        const run = () => { 
            localStorage.setItem('html_code', html_code.current.value);
            localStorage.setItem('css_code', css_code.current.value);
            result.current.contentDocument.body.innerHTML = `<style>${localStorage.css_code}</style>` + localStorage.html_code;
        };

        const jsrun = () => {
            toast.success('Saved');
            localStorage.setItem('js_code', js_code.current.value);
            result.current.contentWindow.eval(localStorage.js_code);
        };
    
        html_code.current.onkeyup = () => run();
        css_code.current.onkeyup = () => run();
        run_button.current.onclick = () => jsrun();

        html_code.current.value = localStorage.html_code || '';
        css_code.current.value = localStorage.css_code || '';
        js_code.current.value = localStorage.js_code || '';
    }, []);
  
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: darkMode ? '#121212' : '#ffffff', color: darkMode ? '#ffffff' : '#000000' }}>
            <style>
                {`
                    body {
                        margin: 0;
                        font-family: 'Roboto', sans-serif;
                    }

                    .voiceContainer {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .voiceBody {
                        background-color: ${darkMode ? '#1e1e1e' : '#ffffff'};
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        padding: 1rem;
                    }

                    .htmlcodeEditor {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .codemaincode {
                        background-color: ${darkMode ? '#2a2a2a' : '#f9f9f9'};
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        transition: all 0.3s ease;
                        overflow: auto;
                        height: 200px; /* Increased height */
                    }

                    .codemaincode:hover {
                        border-color: #4a90e2;
                        box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
                    }

                    .webeditorheading {
                        display: flex;
                        align-items: center;
                        padding: 0.5rem;
                        font-size: 1.2rem;
                        color: ${darkMode ? '#ffffff' : '#333'};
                    }

                    .webeditorheading img {
                        width: 24px;
                        height: 24px;
                        margin-right: 0.5rem;
                    }

                    textarea {
                        width: 100%;
                        height: 100%;
                        padding: 0.5rem;
                        border: none;
                        border-radius: 5px;
                        resize: none;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 1rem;
                        outline: none;
                        transition: border-color 0.3s ease;
                        color: ${darkMode ? '#ffffff' : '#000000'};
                        background-color: ${darkMode ? '#333' : '#ffffff'};
                        white-space: pre-wrap;
                    }

                    textarea:focus {
                        border: 1px solid #4a90e2;
                    }

                    .jsrunbtn {
                        margin-left: 10px;
                        background-color: #4a90e2;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    .jsrunbtn:hover {
                        background-color: #357ab8;
                    }

                    iframe {
                        border: none;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        height: 200px; /* Increased height */
                        background-color: ${darkMode ? '#2a2a2a' : '#f9f9f9'}; /* Same color as code boxes */
                    }

                    @media (min-width: 600px) {
                        .voicePlayground {
                            display: flex;
                            justify-content: space-between;
                        }

                        .editormain {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 1rem;
                        }
                    }
                `}
            </style>
            <Box sx={{ flex: 1, padding: '1rem' }}>
                <IconButton onClick={toggleDarkMode} sx={{ mb: 2 }}>
                    {darkMode ? <WbSunny sx={{ color: '#FFD700' }} /> : <Nightlight sx={{ color: '#FFD700' }} />}
                </IconButton>
                
                <div className="voiceContainer">
                    <div className="voiceBody wholeeditorBody">
                        <div className="leftLang">
                            <LangList leftcolorhtml="white" />
                        </div>
                        <h1 className="invisible"><mark>Web Editor</mark></h1>
                        <div className="voicePlayground">
                            <div className="htmlcodeEditor">
                                <div className="editormain">
                                    <div className="html-code codemaincode">
                                        <h1 className='webeditorheading'><img src={html} alt="HTML"/> HTML</h1>
                                        <textarea data-testid="htmlTextarea" ref={html_code}></textarea>
                                    </div>
                                    <div className="css-code codemaincode">
                                        <h1 className='webeditorheading'><img src={css} alt="CSS"/> CSS</h1>
                                        <textarea data-testid="cssTextarea" ref={css_code}></textarea>
                                    </div>
                                    <div className="js-code codemaincode">
                                        <h1 className='webeditorheading'>
                                            <img src={js} alt="JavaScript"/> JavaScript 
                                            <button data-testid="runButton" ref={run_button} className='jsrunbtn'>RUN</button>
                                        </h1>
                                        <textarea spellCheck='false' ref={js_code}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            <Box sx={{ flex: 1, padding: '1rem' }}>
                <h1 className="invisible"><mark>Output</mark></h1>
                <iframe title='result' data-testid="result" id='result' ref={result}></iframe>
            </Box>
        </Box>
    );
};

export default Path1;
