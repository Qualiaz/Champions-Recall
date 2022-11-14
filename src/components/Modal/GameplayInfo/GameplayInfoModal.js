import "./GameplayInfoModal.scss";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";

export default function GameplayInfo({ closeHandler }) {
  const tipViews = ["tipOne", "tipTwo"];
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [currentTipView, setCurrentTipView] = useState(tipViews[0]);
  const [isBtnNextDisabled, setIsBtnNextDisabled] = useState(false);
  const [isBtnPrevDisabled, setIsBtnPrevDisabled] = useState(true);

  const btnRules = useRef();

  const switchOpenInfo = () => {
    if (isRulesOpen) {
      setIsTipsOpen(true);
      setIsRulesOpen(false);
    }

    if (isTipsOpen) {
      btnRules.current.focus();
      setIsRulesOpen(true);
      setIsTipsOpen(false);
    }
  };

  const switchTipView = (btn) => {
    const currentTipViewIndex = tipViews.findIndex((e) => e === currentTipView);
    if (btn === "next") {
      setCurrentTipView(tipViews[currentTipViewIndex + 1]);
    }
    if (btn === "prev") {
      setCurrentTipView(tipViews[currentTipViewIndex - 1]);
    }
  };

  // disabled buttons
  useEffect(() => {
    // next button
    if (tipViews[tipViews.length - 1] === currentTipView)
      setIsBtnNextDisabled(true);
    else setIsBtnNextDisabled(false);
    // prev button
    if (tipViews[0] === currentTipView) setIsBtnPrevDisabled(true);
    else setIsBtnPrevDisabled(false);
  }, [currentTipView]);

  return ReactDOM.createPortal(
    <div className="gameplay-info__background">
      <div className="gameplay-info__container">
        <div className="gameplay-info__buttons__container">
          <div className="gameplay-info__buttons__main">
            <button
              className="gameplay-info__button--rules gameplay-info__button"
              onClick={switchOpenInfo}
              disabled={isRulesOpen}
              ref={btnRules}
            >
              Rules
            </button>
            <button
              className="gameplay-info__button--tips gameplay-info__button"
              onClick={switchOpenInfo}
              disabled={isTipsOpen}
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
        {isRulesOpen && (
          <div className="gameplay-info__rules">
            <h3 className="gameplay-info__rules__title">Rules</h3>
            <div className="gameplay-info__rules__main">
              <p>The gameplay rules are very simple. </p>
              <br />
              <p>
                All you have to do is to pick the unique cards and you will
                progress through the levels.
              </p>
              <br />
              <p>
                The order of the cards are changing everytime you select a card.
                Once you select all unique cards you advance to the next level.
                The deck is changing on every new level.
              </p>
              <br />
              <p>
                Make sure you check out the tips to find out a technique memory
                champions use (and even Sherlock)!
              </p>
            </div>
          </div>
        )}
        {isTipsOpen && (
          <div className="gameplay-info__tips">
            <h3 className="gameplay-info__tips__title">Tips</h3>
            <div className="gameplay-info__tips__main">
              <button
                className="tips__btn--left"
                onClick={() => switchTipView("prev")}
                disabled={isBtnPrevDisabled}
              >
                left
              </button>
              {currentTipView === "tipOne" && (
                <div className="tip__view--1">
                  <p>Ever heard of the loci method?</p>
                  <p> What about a memory palace?</p>
                  <br />
                  <p>
                    Perhaps you have heard of the memory palace on the Sherlock
                    TV series. But this method is actually very old and used by
                    many memory champions during competitions.
                  </p>
                </div>
              )}
              {currentTipView === "tipTwo" && (
                <div className="tip__view--2">
                  <p>Hello nubs</p>
                </div>
              )}
              <button
                className="tips__btn--right"
                id="tipBtnRight"
                onClick={() => switchTipView("next")}
                disabled={isBtnNextDisabled}
              >
                right
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
