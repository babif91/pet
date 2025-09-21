import './App.css';
import Buttons from './components/buttons';
import { useState, useEffect } from 'react';

export default function App() {
  const [mood, setMood] = useState('neutral');
  const [isFeeding, setIsFeeding] = useState(false);
  const [energy, setEnergy] = useState(5);
  const [hearts, setHearts] = useState(0);
  const [popup, setPopup] = useState('');
  const [lovePopupShown, setLovePopupShown] = useState(false); 

  function handleFeed() {
    setMood('happy');
    setEnergy(prev => Math.min(prev + 1, 5));
    setHearts(prev => Math.min(prev + 1, 5));
    setIsFeeding(true);
    new Audio(process.env.PUBLIC_URL + '/feed.mp3').play();
    setTimeout(() => {
      setMood('neutral');
      setIsFeeding(false);
    }, 2000);
  }

  function handlePet() {
    setMood('pet'); 
    setHearts(prev => Math.min(prev + 1, 5));
    new Audio(process.env.PUBLIC_URL + '/pet.mp3').play();
    setTimeout(() => {
      setMood('neutral');
    }, 5000);
  }

  function handlePlay() {
    setMood('play'); 
    setEnergy(prev => Math.max(prev - 1, 0));
    setHearts(prev => Math.min(prev + 1, 5));
    new Audio(process.env.PUBLIC_URL + '/play.mp3').play();
    setTimeout(() => {
      setMood('neutral');
    }, 5000);
  }

  function handleSleep() {
    setMood('sleep'); 
    setEnergy(prev => Math.min(prev + 1, 5));
    setHearts(prev => Math.min(prev + 1, 5));
    new Audio(process.env.PUBLIC_URL + '/sleep.mp3').play();
    setTimeout(() => {
      setMood('neutral');
    }, 5000);
  }

  // ✅ Check if hearts reached 5 and popup hasn't been shown yet
  useEffect(() => {
    if (hearts === 5 && !lovePopupShown) {
      setPopup('Your Pet Loves You ❤️');
      setLovePopupShown(true); // Mark as shown so it never pops up again
    }
  }, [hearts, lovePopupShown]);

  // Existing popup logic for low energy
  useEffect(() => {
    if (energy === 0) {
      setPopup('Your pet might be hungry or tired!');
    }
  }, [energy]);

  return (
    <div className="container">
      <h1 className="title">Virtual Pet 🐾</h1>
      <p className={`cat${mood !== 'neutral' ? ' bounce' : ''}`}>
        {mood === 'neutral'
          ? '🐱'
          : mood === 'happy'
          ? '😽'
          : mood === 'pet'
          ? '😻'
          : mood === 'play'
          ? '😺'
          : mood === 'sleep'
          ? '😽'
          : '🐱'}
      </p>
      {mood === 'pet' && (
        <span className="heart-anim">❤️</span>
      )}
      {mood === 'play' && (
        <span className="ball-anim">⚽</span>
      )}
      {mood === 'sleep' && (
        <span className="sleep-anim">💤</span>
      )}

    <div className="buttons-container">
  <Buttons 
    onFeed={handleFeed} 
    onPet={handlePet} 
    onPlay={handlePlay} 
    onSleep={handleSleep} 
  />
</div>

      {/* Food Rain Animation */}
      {isFeeding && (
        <div className="food-rain">
          {[...Array(30)].map((_, i) => {
            const left = Math.random() * 95;
            const delay = Math.random() * 1;
            return (
              <span
                key={i}
                className="food-drop"
                style={{ left: `${left}%`, animationDelay: `${delay}s` }}
              >
                🥔
              </span>
            );
          })}
        </div>
      )}

      {/* Status Bar */}
      <div className="status-bar">
        <div className="energy-box">
          {Array.from({ length: 5 }).map((_, i) =>
            <span key={i}>{i < energy ? '⚡' : '⚡︎'}</span>
          )}
        </div>
        <div className="hearts-box">
          {Array.from({ length: 5 }).map((_, i) =>
            <span key={i}>{i < hearts ? '❤️' : '♡'}</span>
          )}
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-window">
          <div className="popup-content">
            <p>{popup}</p>
            <button onClick={() => setPopup('')}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}