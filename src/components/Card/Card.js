import { useState } from "react";

// data
import dataChamps from "../../data/champs.json";

// styles
import "./Card.scss";

export default function Card({ champ, clickEvent }) {
  const imgLocalPath = (champ) => {
    return `./images/${champ}_0.jpg`;
  };

  //just in case
  const imgUrlPath = (champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`;
  };

  return (
    <>
      <div onClick={clickEvent} className="card">
        <img src={imgLocalPath(champ)} alt="" />
      </div>
    </>
  );
}
