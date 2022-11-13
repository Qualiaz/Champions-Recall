import ReactDOM from "react-dom";

//styles
import "./GameLostModal.scss";

export default function GameLostModal({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="player-lost__container">
      <p>You lost</p>
      <button onClick={onClose}>Try again</button>
    </div>,
    document.getElementById("portal")
  );
}
