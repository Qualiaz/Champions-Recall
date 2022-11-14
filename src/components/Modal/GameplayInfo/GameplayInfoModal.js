import "./GameplayInfoModal.scss";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import tipExample from "./tip-example.png";

export default function GameplayInfo({ closeHandler }) {
  const tipViews = [
    "tipOne",
    "tipTwo",
    "tipThree",
    "tipFour",
    "tipFive",
    "tipSix",
  ];
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [currentTipView, setCurrentTipView] = useState(tipViews[0]);
  const [isBtnNextDisabled, setIsBtnNextDisabled] = useState(false);
  const [isBtnPrevDisabled, setIsBtnPrevDisabled] = useState(true);

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

  const switchTipView = (btn) => {
    const currentTipViewIndex = tipViews.findIndex((e) => e === currentTipView);
    if (btn === "next") {
      setCurrentTipView(tipViews[currentTipViewIndex + 1]);
    }
    if (btn === "prev") {
      setCurrentTipView(tipViews[currentTipViewIndex - 1]);
    }
  };

  // disable buttons
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
              className=" gameplay-info__button--close gameplay-info__button"
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
                className="tip__btn tip__btn--prev"
                onClick={() => switchTipView("prev")}
                disabled={isBtnPrevDisabled}
              >
                prev
              </button>
              {currentTipView === "tipOne" && (
                <div className="tip__view tip__view--1">
                  <p>Ever heard of the loci method?</p>
                  <p>No? Memory journey then?</p>
                  <p>What about a memory palace?</p>
                  <br />
                  <p>
                    Perhaps you have heard of the memory palace on the Sherlock
                    TV series. But this method is actually very old and used by
                    many memory champions during competitions.
                  </p>
                </div>
              )}
              {currentTipView === "tipTwo" && (
                <div className="tip__view tip__view--2">
                  <p>This technique uses visualization.</p>
                  <br />
                  <p>
                    Right now perhaps you are sitting in your room, in the
                    office, or somewhere outside. Regardless of where you are,
                    you probably know your way around. Where is the kitchen,
                    office bathroom, or that cool restaurant in the city.
                  </p>
                  <br />
                  <p>
                    Think of some known place that you would like to go from
                    where you are, and try to visualize the path to go there.
                    Pick a spot that is nearby at the moment.
                  </p>
                  <br />
                  <p>e.g starting point is your room, go to the kitchen.</p>
                </div>
              )}
              {currentTipView === "tipThree" && (
                <div className="tip__view tip__view--3">
                  <p>
                    Now do it again but stop on specific spots on the path and
                    add the images that you would like to remember
                  </p>
                  <br />
                  <p>Here is an example of how that might look like...</p>
                </div>
              )}
              {currentTipView === "tipFour" && (
                <div className="tip__view tip__view--4">
                  <img className="tip__view--4__img" src={tipExample} alt="" />
                </div>
              )}
              {currentTipView === "tipFive" && (
                <div className="tip__view tip__view--5">
                  <p>
                    In our example you go from the sofa to the dining table.
                  </p>
                  <br />
                  <p>
                    So, imagine you are sitting on the sofa next to Azir.
                    Perhaps you have a talk with him or you see him doing
                    something funny. Tnen you take a walk right behind the sofa.
                    You see Gnar on the floor playing with a yarn, like cats do.
                    Then you go sit at the table and you see Amumu sad and you
                    try to comfort him.
                  </p>
                </div>
              )}
              {currentTipView === "tipSix" && (
                <div className="tip__view tip__view-6">
                  <p>
                    You can even group the images in one spot to save space.
                  </p>
                  <br />
                  <p>
                    For example Azir can play with Gnar on the sofa and then
                    Amumu catches them both with his badges.
                  </p>
                  <br />
                  <p>
                    This can be more useful and even quicker since you make the
                    informations interact with each other. However, in case you
                    try to remember the order of the images, that might be a
                    little tricky. But hey, we are not remembering the sequence
                    of pi and we don't need the order in this game!
                  </p>
                </div>
              )}

              <button
                className="tip__btn tip__btn--next"
                onClick={() => switchTipView("next")}
                disabled={isBtnNextDisabled}
              >
                next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
