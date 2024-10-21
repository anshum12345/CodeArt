// src/Footer.js
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Message sent from: ${email}\nMessage: ${message}`);
        setEmail('');
        setMessage('');
    };

    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://www.linkedin.com/in/anshum-dwivedi-67530922a/" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/640px-Linkedin_icon.svg.png" alt="LinkedIn" className="social-logo" />
                </a>
                <a href="https://github.com/anshum12345" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png" alt="GitHub" className="social-logo" />
                </a>
                <a href="https://www.instagram.com/dwivedianshum" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-logo" />
                </a>
            </div>
            <div className="contact-form">
                <h3>Connect with Us</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>
                <a href="mailto:anshumdwivedi8@gmail.com" style={{ display: 'inline-block', marginTop: '10px' }}>
                    <button type="button">Send Mail</button>
                </a>
            </div>
            <style jsx>{`
                .footer {
                    background-color: #0A1828; /* Dark classic blue */
                    color: #BFA181; /* Gold text color */
                    padding: 2rem;
                    text-align: center;
                    font-family: 'Arial', sans-serif; /* Clean sans-serif font */
                    position: relative;
                }

                .social-links {
                    margin-bottom: 1.5rem;
                    display: flex;
                    justify-content: center; /* Center logos */
                }

                .social-links a {
                    margin: 0 1rem;
                    transition: transform 0.3s; /* Add transition for scaling */
                }

                .social-links a:hover {
                    transform: scale(1.1); /* Scale effect on hover */
                }

                .social-logo {
                    width: 50px; /* Fixed width for logos */
                    height: 50px; /* Fixed height for logos */
                    transition: filter 0.3s; /* Add transition for color change */
                }

                .contact-form {
                    margin-top: 1.5rem;
                }

                .contact-form h3 {
                    margin-bottom: 1rem;
                    color: #D7CFCF; /* Changed to beige */
                    animation: fadeIn 0.5s ease; /* Fade-in animation */
                }

                .contact-form input,
                .contact-form textarea {
                    width: 100%;
                    max-width: 400px;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                    border: 1px solid #D7CFCF; /* Beige border */
                    border-radius: 5px;
                    background-color: #2A2F3B; /* Dark input background */
                    color: #EAEAEA; /* Light text */
                    transition: border-color 0.3s;
                    font-family: 'Verdana', sans-serif; /* More attractive font */
                    font-size: 1rem; /* Adjust font size */
                }

                .contact-form input::placeholder,
                .contact-form textarea::placeholder {
                    color: #BFA181; /* Placeholder color */
                    opacity: 0.7; /* Slightly transparent */
                }

                .contact-form input:focus,
                .contact-form textarea:focus {
                    border-color: #FFC107; /* Gold border on focus */
                    outline: none;
                }

                .contact-form button {
                    background-color: #178582; /* Turquoise button */
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 0.5rem 2rem;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.3s;
                    font-size: 1rem; /* Adjust font size */
                }

                .contact-form button:hover {
                    background-color: #146f6c; /* Darker turquoise on hover */
                    transform: translateY(-2px); /* Lift effect */
                }

                @media (max-width: 768px) {
                    .contact-form input,
                    .contact-form textarea {
                        max-width: 90%;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
