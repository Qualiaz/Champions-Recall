import React, { useEffect } from "react";

//layouts
import Header from "./layouts/Header/Header";
import Main from "./layouts/Main/Main";

//styles
import "./App.scss";

const App = () => {
  const imgUrlPath = (champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`;
  };

  const imgLocalPath = (champ) => {
    return `./images/${champ}_0.jpg`;
  };

  return (
    <div className="app">
      <Header />
      <Main>
        <p>Hids</p>
      </Main>
    </div>
  );
};

export default App;
