import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import LangList from './LangList';
import copy_icon from './asset/copy_icon.gif';
import download from './asset/download.png';
import { toast } from 'react-hot-toast';

const Path1 = () => {
    const [code, setCode] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode by default
    const DayName = new Date().toLocaleString('en-US', { weekday: 'long' });

    const runCode = () => {
        try {
            toast.success("Code Execution Started");
            eval(code);
        } catch (err) {
            toast.error("Please Enter Valid Code");
            console.error(err);
        }
    };

    const clearOutput = () => {
        const consoleOutput = document.getElementById('consoleOutput');
        if (consoleOutput) {
            consoleOutput.innerHTML = "";
            toast.success("Output Cleared");
        }
    };

    const copyContent = () => {
        navigator.clipboard.writeText(code)
            .then(() => toast.success("Copied to Clipboard"))
            .catch(err => toast.error("Failed to copy"));
    };

    const codeToFile = () => {
        toast.success("Download Started");
        const blob = new Blob([code], { type: "text/javascript" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `CodoFile-(${DayName})`;
        link.click();
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const consoleOutput = document.getElementById('consoleOutput');
        const originalConsoleLog = console.log;

        const consoleLogHandler = (message) => {
            if (consoleOutput) {
                const paragraph = document.createElement('p');
                paragraph.textContent = message;
                consoleOutput.appendChild(paragraph);
            }
            originalConsoleLog(message); // Call the original console.log
        };

        console.log = consoleLogHandler;

        return () => {
            console.log = originalConsoleLog; // Restore original console.log on cleanup
        };
    }, []);

    return (
        <Box className={`jsContainer ${isDarkMode ? '' : 'light-mode'}`} sx={{ padding: '2rem', textAlign: 'center' }}>
            <style>
                {`
                    body {
                        margin: 0;
                        font-family: 'Arial', sans-serif;
                        background-color: ${isDarkMode ? '#121212' : '#ffffff'};
                        color: ${isDarkMode ? '#ffffff' : '#000000'};
                        transition: background-color 0.5s, color 0.5s;
                    }

                    .jsContainer {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        min-height: 100vh;
                    }

                    .jsBody {
                        background: ${isDarkMode ? '#1e1e1e' : '#f0f0f0'};
                        border-radius: 8px;
                        padding: 20px;
                        width: 90%;
                        max-width: 800px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    }

                    textarea {
                        width: 100%;
                        height: 200px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        padding: 10px;
                        background: ${isDarkMode ? '#333' : '#ffffff'};
                        color: ${isDarkMode ? '#fff' : '#000'};
                        transition: background 0.5s, color 0.5s;
                    }

                    .runHeaderJS {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }

                    .vbtn {
                        background: none;
                        border: none;
                        cursor: pointer;
                        margin-right: 10px;
                    }

                    .btn {
                        background-color: #4caf50;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .clear {
                        background-color: #f44336;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    #consoleOutput {
                        border: 1px solid #ccc;
                        padding: 10px;
                        margin-top: 10px;
                        max-height: 200px;
                        overflow-y: auto;
                        background: ${isDarkMode ? '#222' : '#e0e0e0'};
                        color: ${isDarkMode ? '#fff' : '#000'};
                    }

                    @media (max-width: 600px) {
                        .jsBody {
                            width: 100%;
                        }
                    }
                `}
            </style>
            <button onClick={toggleDarkMode}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <div className="jsBody wholeeditorBody">
                <div className="leftLang">
                    <LangList leftcolorjs="white" />
                </div>
                <div className="PlaygroundMain">
                    <div className='runHeaderJS'>
                        <div className='jsleftheaderfile jsfile'>
                            <mark><h2>index.js</h2></mark>
                            <div className='runbtn'>
                                <button className='vbtn' onClick={copyContent}>
                                    <img className='voicebtn' src={copy_icon} alt='CopyClip' />
                                </button>
                                <button className='vbtn' onClick={codeToFile}>
                                    <img className='voicebtn' src={download} alt='DownloadCode' />
                                </button>
                                <button className='btn btn1' onClick={runCode}>RUN</button>
                            </div>
                        </div>
                        <div className='jsrightheaderfile jsfile'>
                            <mark><p>OUTPUT</p></mark>
                            <button className='clear' onClick={clearOutput}>Clear</button>
                        </div>
                    </div>
                    <div className='jsplayground playground'>
                        <div className='leftplayground snippet'>
                            <textarea 
                                className='dartpython' 
                                data-testid="jsTextarea" 
                                value={code} 
                                onChange={(e) => setCode(e.target.value)} 
                                placeholder='console.log("Hello CodeArt");'
                            />
                        </div>
                        <h1 className="invisible">
                            <mark>Output</mark>
                        </h1>
                        <div className='rightplayground snippet' id='consoleOutput' />
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Path1;
