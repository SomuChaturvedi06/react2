// src/components/PostContext.js
import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 5000); // simulate 5 seconds loading
    };
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, loading }}>
      {children}
    </PostContext.Provider>
  );
};
