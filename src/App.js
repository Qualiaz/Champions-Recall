import React, { useEffect, useState, useCallback } from "react";
//data
import dataChamps from "./data/champs.json";

//utils
import hasDuplicateValuesArr from "./utils/hasDuplicateValuesArr";

//layouts
import Header from "./layouts/Header/Header";
import Main from "./layouts/Main/Main";

//components
import Card from "./components/Card/Card";
import GameOverModal from "./components/Modal/GameOver/GameOverModal";
import GameplayInfoModal from "./components/Modal/GameplayInfo/GameplayInfoModal";

//styles
import "./App.scss";

const App = () => {
  const highScoreLocalStorage = localStorage.getItem("highScore");

  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(highScoreLocalStorage || 0);
  const [currentScore, setCurrentScore] = useState(0);

  const [cards, setCards] = useState(dataChamps);
  const [cardsLevel, setCardsLevel] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isGameOverModal, setIsGameOverModal] = useState(false);
  const [isGameplayInfoModal, setIsGameplayInfoModal] = useState(false);

  const generateCards = useCallback((length) => {
    let champs = [];
    for (let i = 0; i < length; i++) {
      champs.push(cards[i].name);
    }
    return champs;
  }, []);

  const randomizeCards = () => {
    const randomCards = dataChamps.sort(() => Math.random() - 0.5);
    return setCards(() => [...randomCards]);
  };

  const randomizeCardsLevel = () => {
    const randomCardsLevel = cardsLevel.sort(() => Math.random() - 0.5);
    return setCardsLevel(() => [...randomCardsLevel]);
  };

  // Initial cards to render
  useEffect(() => {
    randomizeCards();
    setCardsLevel(() => generateCards(3));
  }, []);

  const winLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    randomizeCards();
    setSelectedCard(null);
    setSelectedCards([]);
  };

  const winRound = () => {
    setCurrentScore((prevCurrentScore) => prevCurrentScore + 1);
    randomizeCardsLevel();
  };

  const checkWin = () => {
    const hasDuplicateSelectedCards = hasDuplicateValuesArr(selectedCards);
    // user won level
    if (
      cardsLevel.length === selectedCards.length &&
      selectedCards.length >= 1 &&
      !hasDuplicateSelectedCards
    ) {
      winLevel();
    }
    // user won round
    if (!hasDuplicateSelectedCards && selectedCard) {
      winRound();
    }
    // user lost
    if (hasDuplicateSelectedCards) {
      setIsGameOverModal(true);
    }
  };

  // When user selects a card
  const handleClickCard = (e) => {
    const targetCard = e.target.dataset.champName;
    setSelectedCard(() => targetCard);
    setSelectedCards((prevSelectedCards) => {
      return [...prevSelectedCards, targetCard];
    });
  };

  useEffect(() => {
    if (selectedCards.length >= 1) {
      checkWin();
    }
  }, [selectedCards]);

  const resetGame = () => {
    setIsGameOverModal(false);
    setSelectedCards([]);
    setSelectedCard(null);
    randomizeCards();
    setCardsLevel(generateCards(3));
    setLevel(1);
    setCurrentScore(0);
  };

  // When user levels up
  useEffect(() => {
    if (level >= 2) {
      randomizeCards();
      setCardsLevel(() => generateCards(level * 2));
    }
  }, [level]);

  // Set High Score
  useEffect(() => {
    if (currentScore > highScore) {
      localStorage.setItem("highScore", currentScore);
      setHighScore(currentScore);
    }
  }, [currentScore]);

  return (
    <div className="app">
      <Header
        highScore={highScore}
        currentScore={currentScore}
        gameplayInfoHandler={() => setIsGameplayInfoModal(true)}
      />
      <Main level={level}>
        {cardsLevel.map((champ) => (
          <Card champ={champ} key={champ} clickEvent={handleClickCard} />
        ))}
      </Main>
      {isGameOverModal && <GameOverModal onClose={resetGame} />}
      {isGameplayInfoModal && (
        <GameplayInfoModal
          closeHandler={() => {
            setIsGameplayInfoModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
