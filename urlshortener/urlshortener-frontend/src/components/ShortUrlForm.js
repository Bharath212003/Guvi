import React, { useState } from 'react';
import axios from 'axios';

const ShortUrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/url/shorten', { originalUrl: longUrl }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError('Error shortening URL');
    }
  };

  return (
    <div className="container">
      <h2>Create Short URL</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Long URL</label>
          <input type="url" className="form-control" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Shorten URL</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {shortUrl && <div><strong>Short URL: </strong><a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></div>}
    </div>
  );
};

export default ShortUrlForm;
