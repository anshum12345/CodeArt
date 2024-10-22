// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import BlogPage from './BlogPage'; // Import the Blog page
import CodeCompiler from './CodeCompiler'; // Import the Code Compiler page
import CodeFile from './CodeFile'; // Import the CodeFile page
import Path1 from './Path1'; // Import Path1 component
import Path2 from './Path2'; // Import Path2 component
import Path3 from './Path3'; // Import Path3 component
import Path4 from './Path4'; // Import Path4 component
import './index.css'; // Your global styles

const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/app" element={<App />} />
                <Route path="/blog" element={<BlogPage />} /> {/* Route for Blog */}
                <Route path="/compiler" element={<CodeCompiler />} /> {/* Route for Code Compiler */}
                <Route path="/codefile" element={<CodeFile />} /> {/* Route for CodeFile */}
                <Route path="/path1" element={<Path1 />} /> {/* New route for Button 1 */}
                <Route path="/path2" element={<Path2 />} /> {/* New route for Button 2 */}
                <Route path="/path3" element={<Path3 />} /> {/* New route for Button 3 */}
                <Route path="/path4" element={<Path4 />} /> {/* New route for Button 4 */}
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
