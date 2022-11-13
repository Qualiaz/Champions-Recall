import "./Header.scss";

export default function Header({
  highScore,
  currentScore,
  gameplayInfoHandler,
}) {
  return (
    <header>
      <div className="flex-helper"></div>
      <h1 className="logo">Champions recall</h1>
      <div className="score__container">
        <p className="score__highest">High score: {highScore}</p>
        <p className="score__current">Current score: {currentScore}</p>
      </div>
      <div className="info-and-links">
        <div className="br" />
        <button className="info__button" onClick={gameplayInfoHandler}>
          Gameplay Info
        </button>
        <div className="br-small"></div>
        <div className="social_links">
          <a href="#">Github</a>
        </div>
      </div>
    </header>
  );
}
