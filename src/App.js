import React, { useEffect, useState } from "react";

//data
import dataChamps from "./data/champs.json";

//layouts
import Header from "./layouts/Header/Header";
import Main from "./layouts/Main/Main";

//components
import Card from "./components/Card/Card";

//styles
import "./App.scss";

const App = () => {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [cards, setCards] = useState(dataChamps);
  const [cardsLevel, setCardsLevel] = useState([]);
  const [level, setLevel] = useState(1);

  // Cards generator
  const generateCards = (length) => {
    let champs = [];
    for (let i = 0; i < length; i++) {
      champs.push(cards[i].name);
    }
    return champs;
  };

  const randomizeCards = () => {
    const randomCards = dataChamps.sort(() => Math.random() - 0.5);
    setCards(() => [...randomCards]);
  };

  const randomizeCardsLevel = () => {
    const randomCardsLevel = cardsLevel.sort(() => Math.random() - 0.5);
    setCardsLevel(() => [...randomCardsLevel]);
  };

  // Initial cards to render
  useEffect(() => {
    randomizeCards();
    setCardsLevel(() => generateCards(3));
  }, []);

  // When user levels up
  useEffect(() => {
    if (level >= 2) {
      randomizeCards();
      setCardsLevel(() => generateCards(level * 2));
      console.log(cardsLevel);
    }
  }, [level]);

  return (
    <div className="app">
      <Header highScore={highScore} currentScore={currentScore} />
      <Main level={level}>
        {cardsLevel.map((champ) => (
          <Card champ={champ} clickEvent={randomizeCardsLevel} />
        ))}
      </Main>
      <button onClick={() => randomizeCards()}>Randomize cards (1)</button>

      <button onClick={() => setLevel((prev) => prev + 1)}>One level up</button>
    </div>
  );
};

export default App;
