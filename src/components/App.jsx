import { useState } from 'react'
import GiphySticker from './GiphySticker'

function App({ query, setQuery }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Memory Card</h1>
        <p className="how-to">
         How good is your memory?  Click each image ONLY ONCE to win. 
        </p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for stickers"
        />        
      <div className="card">
        {/* <p className="score">Score: {scoreCount}</p>
        <p className="best-score">Best Score: {highestScoreCount}</p> */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
      <GiphySticker />
      <div>
       
      </div>
    </>
  )
}

export default App
