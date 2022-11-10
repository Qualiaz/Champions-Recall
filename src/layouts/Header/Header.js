import "./Header.scss";

export default function Header({ highScore, currentScore }) {
  return (
    <header>
      <h1 className="logo">Champions recall</h1>
      <div className="score__container">
        <p className="score__highest">High score: {highScore}</p>
        <p className="score__current">Current score: {currentScore}</p>
      </div>
    </header>
  );
}
