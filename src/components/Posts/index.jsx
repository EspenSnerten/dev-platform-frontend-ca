import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev-platform-cyad8yo0f-espensnerten.vercel.app/api/posts');
        if (!response.data) {
          throw new Error('Failed to fetch posts');
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`https://dev-platform-cyad8yo0f-espensnerten.vercel.app/api/posts/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== postId));
        console.log('Post deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Published: {post.published ? 'Yes' : 'No'}</p>
            <p>Author: {post.author ? post.author.name : 'Unknown'}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;