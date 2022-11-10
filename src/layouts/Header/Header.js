import "./Header.scss";

export default function Header() {
  return (
    <header>
      <h1 className="logo">Champions recall</h1>
      <div className="score__container">
        <p className="score__highest">Highest score: 32</p>
        <p className="score__current">Current score: 12</p>
      </div>
    </header>
  );
}
