import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';
import Head from './Head'; // Import the Head component
import './BlogPage.css'; // Import the CSS file for additional styles

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [userInteractions, setUserInteractions] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('blogPosts'));
        if (savedPosts) {
            setPosts(savedPosts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }, [posts]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            setPosts([...posts, { title, description, link, likes: 0, dislikes: 0 }]);
            setTitle('');
            setDescription('');
            setLink('');
        }
    };

    const handleLike = (index) => {
        if (!userInteractions[index]?.liked) {
            const updatedPosts = [...posts];
            updatedPosts[index].likes += 1;
            setPosts(updatedPosts);
            setUserInteractions((prev) => ({
                ...prev,
                [index]: { liked: true, disliked: false },
            }));
        }
    };

    const handleDislike = (index) => {
        if (!userInteractions[index]?.disliked) {
            const updatedPosts = [...posts];
            updatedPosts[index].dislikes += 1;
            setPosts(updatedPosts);
            setUserInteractions((prev) => ({
                ...prev,
                [index]: { liked: false, disliked: true },
            }));
        }
    };

    const handleDelete = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].deleteAnimation = true;
        setPosts(updatedPosts);
        setTimeout(() => {
            setPosts((prev) => prev.filter((_, i) => i !== index));
            setUserInteractions((prev) => {
                const newInteractions = { ...prev };
                delete newInteractions[index];
                return newInteractions;
            });
        }, 300);
    };

    const handleReadMore = (url) => {
        window.open(url, '_blank');
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
        },
        h1: {
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
        },
        input: {
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: isDarkMode ? '#444' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        readMoreButton: {
            display: 'inline-block',
            marginTop: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
        },
        readMoreButtonHover: {
            backgroundColor: '#0056b3',
            transform: 'scale(1.05)',
        },
        post: {
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: isDarkMode ? '#555' : '#f9f9f9',
        },
        title: {
            fontSize: '1.5rem',
        },
        description: {
            color: '#666',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            marginRight: '5px',
        },
        deleteButton: {
            background: 'none',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontSize: '1.2rem',
        },
    };

    return (
        <div style={styles.container}>
            <Head toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <h1 style={styles.h1}>CodeArt Blog</h1>
            <p>Welcome to the blog! Upload some good coding problems.</p>

            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Problem Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={styles.input}
                />
                <textarea
                    placeholder="Problem Explanation"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ ...styles.input, height: '100px', resize: 'none' }}
                />
                <input
                    type="url"
                    placeholder="Problem Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Blog Post</button>
            </form>

            {posts.map((post, index) => (
                <div key={index} style={styles.post}>
                    <h2 style={styles.title}>{post.title}</h2>
                    <p style={styles.description}>{post.description}</p>
                    {post.link && (
                        <button
                            style={styles.readMoreButton}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.readMoreButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.readMoreButton.backgroundColor}
                            onClick={() => handleReadMore(post.link)}
                        >
                            Read more
                        </button>
                    )}
                    <div>
                        <button 
                            className="iconButton" 
                            onClick={() => handleLike(index)} 
                            disabled={userInteractions[index]?.liked}
                        >
                            <FaThumbsUp /> ({post.likes})
                        </button>
                        <button 
                            className="iconButton" 
                            onClick={() => handleDislike(index)} 
                            disabled={userInteractions[index]?.disliked}
                        >
                            <FaThumbsDown /> ({post.dislikes})
                        </button>
                        <button 
                            className="deleteButton" 
                            onClick={() => handleDelete(index)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogPage;
