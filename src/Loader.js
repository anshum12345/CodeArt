// src/Loader.js
import React from 'react';

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Loading...</p>
            <style jsx>{`
                .loader {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* Full screen height */
                    background-color: #0A1828; /* Same background color as the home page */
                    color: #BFA181; /* Gold text color */
                    font-family: sans-serif; /* Use the same font */
                }

                .spinner {
                    border: 8px solid rgba(191, 161, 129, 0.3); /* Light gold border */
                    border-top: 8px solid #BFA181; /* Gold border for the spinner */
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite; /* Spin animation */
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;
