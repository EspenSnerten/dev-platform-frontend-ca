import React, { useState } from 'react';
import axios from 'axios';

const PostFormComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
    author: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dev-platform-cyad8yo0f-espensnerten.vercel.app/api/posts', formData);
      console.log('Post successful:', response.data);
      // Optionally, you can clear the form after successful submission
      setFormData({
        title: '',
        content: '',
        published: false,
        author: '',
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleChange} />
        </div>
        <div>
          <label>Published:</label>
          <input type="checkbox" name="published" checked={formData.published} onChange={e => setFormData(prevState => ({ ...prevState, published: e.target.checked }))} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostFormComponent;