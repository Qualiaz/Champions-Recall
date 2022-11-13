import "./GameplayInfoModal.scss";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

export default function GameplayInfo({ closeHandler }) {
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const [isTipsOpen, setIsTipsOpen] = useState(false);

  const switchOpenInfo = () => {
    if (isRulesOpen) {
      setIsTipsOpen(true);
      setIsRulesOpen(false);
    }
    if (isTipsOpen) {
      setIsRulesOpen(true);
      setIsTipsOpen(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="gameplay-info__background">
      <div className="gameplay-info__container">
        <div className="gameplay-info__buttons__container">
          <div className="gameplay-info__buttons__main">
            <button
              className="gameplay-info__button--rules gameplay-info__button"
              onClick={switchOpenInfo}
            >
              Rules
            </button>
            <button
              className="gameplay-info__button--tips gameplay-info__button"
              onClick={switchOpenInfo}
            >
              Tips
            </button>
          </div>
          <div className="gameplay-info__buttons__options">
            <button
              className="gameplay-info__button gameplay-info__button--close"
              onClick={closeHandler}
            >
              Close
            </button>
          </div>
        </div>
        {isRulesOpen && <div className="gameplay-info__rules">Rules</div>}
        {isTipsOpen && <div className="gameplay-info__tips">Tips</div>}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
