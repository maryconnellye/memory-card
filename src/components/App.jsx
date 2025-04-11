import React, { useState, useEffect } from 'react'

function App() {
  const [stickers, setStickers] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  useEffect(() => {
    // Fetch animal stickers from GIPHY
    const fetchStickers = async () => {
      const apiKey = '1LjchmzcIjUVPfBjEVByQdqGQtDPcySV'; 
      const url = `https://api.giphy.com/v1/stickers/search?q=animals&api_key=${apiKey}&limit=10`;
      const response = await fetch(url);
      const data = await response.json();
      setStickers(data.data);
    };
    
    fetchStickers();
  }, []);
  
  const handleClick = (stickerId) => {
    if (clickedButtons.includes(stickerId)) {
      // Button has already been clicked, reset game
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedButtons([]);
    } else {
      // New unique click
      setClickedButtons([...clickedButtons, stickerId]);
      setScore(score + 1);
    }
    
  };
  return (
    <div>
    <h2>Score: {score}</h2>
    <h2>Best Score: {bestScore}</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
      {stickers.map((sticker) => (
        <button
        key={sticker.id}
        onClick={() => handleClick(sticker.id)}
        style={{
          background: 'none',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
        }}
        >
          <img
            src={sticker.images.fixed_width.url}
            alt={sticker.title}
            style={{ width: '100px', height: '100px' }}
            />
        </button>
      ))}
    </div>
  </div>
);
}

export default App;