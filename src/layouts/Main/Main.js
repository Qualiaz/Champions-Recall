import "./Main.scss";

export default function Main({ level, children: Card }) {
  return (
    <main>
      <h3 className="level">Level: {level}</h3>
      <div className="cards__container">{Card}</div>
    </main>
  );
}
