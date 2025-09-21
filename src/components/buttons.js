export default function Buttons({ onFeed, onPet, onPlay, onSleep }) {
  return (
    <div className="buttons-container">
      <button onClick={onFeed}>Feed 🍗</button>
      <button onClick={onPet}>Pet ❤️</button>
      <button onClick={onPlay}>Play ⚽</button>
      <button onClick={onSleep}>Sleep 🌙</button>
    </div>
  );
}
