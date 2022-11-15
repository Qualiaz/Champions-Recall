import ReactDOM from "react-dom";

//assets
import gameOverImg from "./game-over.png";

//styles
import "./GameOverModal.scss";

export default function GameOverModal({ onClose }) {
  return ReactDOM.createPortal(
    <div className="game-over__background">
      <div className="game-over__container">
        <span className="game-over__text">Game Over</span>
        <button className="game-over__button" onClick={onClose}>
          Try again
        </button>
        <img className="game-over__img" src={gameOverImg} alt="" />
      </div>
    </div>,
    document.getElementById("portal")
  );
}
