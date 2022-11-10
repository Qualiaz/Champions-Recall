import React, { useEffect } from "react";
import champs from "./data/champs.json";
import "./App.scss";

const App = () => {
  const imgUrlPath = (champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`;
  };

  const imgLocalPath = (champ) => {
    return `./images/${champ}_0.jpg`;
  };

  return (
    <div className="images_container">
      {champs.map((champ) => (
        <img width="120px" src={imgLocalPath(champ.name)} alt={champ.name} />
      ))}
    </div>
  );
};

export default App;
