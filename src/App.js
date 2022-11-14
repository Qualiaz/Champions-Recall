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
import GameLostModal from "./components/Modal/gamelost/GameLostModal";
import GameplayInfoModal from "./components/Modal/GameplayInfo/GameplayInfoModal";

//styles
import "./App.scss";

const App = () => {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [cards, setCards] = useState(dataChamps);
  const [cardsLevel, setCardsLevel] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // const [didPlayerLose, setDidPlayerLose] = useState(false);
  const [gameLostModal, setGameLostModal] = useState(false);
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
      selectedCards.length >= 1
    ) {
      winLevel();
    }
    // user won round
    if (!hasDuplicateSelectedCards && selectedCard) {
      winRound();
    }
    // user lost
    if (hasDuplicateSelectedCards) {
      setGameLostModal(true);
      // setDidPlayerLose(true);
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

  // When player loses
  const resetGame = () => {
    setGameLostModal(false);
    setSelectedCards([]);
    setSelectedCard(null);
    randomizeCards();
    setCardsLevel(generateCards(3));
    setLevel(1);
    setCurrentScore(0);
    // setDidPlayerLose(false);
  };

  // When user levels up
  useEffect(() => {
    if (level >= 2) {
      randomizeCards();
      setCardsLevel(() => generateCards(level * 2));
    }
  }, [level]);

  // Set high score
  useEffect(() => {
    if (currentScore > highScore) {
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
      <GameLostModal open={gameLostModal} onClose={resetGame} />
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
