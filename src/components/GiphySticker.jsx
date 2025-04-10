import React, { useState } from 'react';

const GiphyStickers = () => {
  const [query, setQuery] = useState('');
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const API_KEY = '1LjchmzcIjUVPfBjEVByQdqGQtDPcySV';

  const fetchStickers = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${query}&limit=15`);
      const data = await response.json();

      if (response.ok) {
        setStickers(data.data);
      } else {
        setError('Failed to fetch stickers');
      }
    } catch (err) {
      setError(`An error occurred while ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h1>Search for Giphy Stickers</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={fetchStickers}>Fetch Stickers</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {stickers.map((sticker) => (
          <img
            key={sticker.id}
            src={sticker.images.fixed_height.url}
            alt={sticker.title}
            style={{ margin: '10px', width: '150px', height: '150px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default GiphyStickers;

