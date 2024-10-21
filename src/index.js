// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import BlogPage from './BlogPage'; // Import the Blog page
import CodeCompiler from './CodeCompiler'; // Import the Code Compiler page
import './index.css'; // Your global styles

const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/app" element={<App />} />
                <Route path="/blog" element={<BlogPage />} /> {/* New route for Blog */}
                <Route path="/compiler" element={<CodeCompiler />} /> {/* New route for Code Compiler */}
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
