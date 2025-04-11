import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [stickers, setStickers] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [score, setScore] = useState(15);
  const [bestScore, setBestScore] = useState(0);

  let winningMessage = "";

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };


  useEffect(() => {
    // Fetch animal stickers from GIPHY
    const fetchStickers = async () => {
      const apiKey = '1LjchmzcIjUVPfBjEVByQdqGQtDPcySV'; 
      const url = `https://api.giphy.com/v1/stickers/search?q=animals&api_key=${apiKey}&limit=16`;
      const response = await fetch(url);
      const data = await response.json();
      setStickers(shuffleArray(data.data));
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

    } else if (score === 16) {
      winningMessage = "You win!";

    } else {
      // New unique click
      setClickedButtons([...clickedButtons, stickerId]);
      setScore(score + 1);

      setStickers(prev => shuffleArray(prev));

    }
    
  };
  return (
    <div className='app'>
      <div className='header'>
          <h1>Memory Card Game</h1>
          <h3>Click each card ONCE!</h3>
      </div>
      <div className='scores'>
        <h2>Score: {score}</h2>
        <h2>Best Score: {bestScore}</h2>
      </div>

    <div className='cards'>
      {stickers.map((sticker) => (
        <button
        key={sticker.id}
        onClick={() => handleClick(sticker.id)}
        >
          <img
            src={sticker.images.fixed_width.url}
            alt={sticker.title}
            />
        </button>
      ))}
    </div>
    <h2>{winningMessage}</h2>
  </div>
);
}

export default App;