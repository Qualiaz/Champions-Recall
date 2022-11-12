import React, { useEffect, useState, useCallback, useRef } from "react";
//data
import dataChamps from "./data/champs.json";

//utils
import hasDuplicateValuesArr from "./utils/hasDuplicateValuesArr";

//layouts
import Header from "./layouts/Header/Header";
import Main from "./layouts/Main/Main";

//components
import Card from "./components/Card/Card";

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

  const [didPlayerLose, setDidPlayerLose] = useState(false);

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
    console.log("set cards on mount");
  }, []);

  // When user levels up
  useEffect(() => {
    if (level >= 2) {
      randomizeCards();
      setCardsLevel(() => generateCards(level * 2));
    }
  }, [level]);

  const winLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    randomizeCards();
    setSelectedCards([]);
  };

  const winRound = () => {
    setCurrentScore((prevCurrentScore) => prevCurrentScore + 1);
  };

  const checkWin = () => {
    const hasDuplicateSelectedCards = hasDuplicateValuesArr(selectedCards);
    // when user wins level
    if (
      cardsLevel.length === selectedCards.length &&
      selectedCards.length >= 1
    ) {
      winLevel();
    }
    // when user wins round
    if (!hasDuplicateSelectedCards && selectedCard) {
      winRound();
    }
    // when user loses
    if (hasDuplicateSelectedCards) {
      setDidPlayerLose(true);
    }
  };

  const handleClickCard = (e) => {
    const targetCard = e.target.dataset.champName;
    setSelectedCard(() => targetCard);
    setSelectedCards((prevSelectedCards) => {
      return [...prevSelectedCards, targetCard];
    });
  };

  // when player loses
  useEffect(() => {
    if (didPlayerLose) {
      setSelectedCards([]);
      randomizeCards();
      setCardsLevel(generateCards(3));
      setLevel(1);
      setCurrentScore(0);
      setDidPlayerLose(false);
    }
  }, [didPlayerLose]);

  // when player wins
  useEffect(() => {
    if (selectedCards.length >= 1) {
      checkWin();
      randomizeCardsLevel();
    }
  }, [selectedCards]);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore]);

  return (
    <div className="app">
      <Header highScore={highScore} currentScore={currentScore} />
      <Main level={level}>
        {cardsLevel.map((champ) => (
          <Card
            champ={champ}
            key={"key-" + champ}
            clickEvent={handleClickCard}
          />
        ))}
      </Main>
    </div>
  );
};

export default App;
