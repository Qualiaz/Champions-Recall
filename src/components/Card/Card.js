// styles
import "./Card.scss";

export default function Card({ champ, clickEvent }) {
  const imgLocalPath = (champ) => {
    return `./images/champs/${champ}_0.jpg`;
  };

  //just in case
  const imgUrlPath = (champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`;
  };

  return (
    <>
      <div onClick={clickEvent} className="card">
        <img
          src={imgLocalPath(champ)}
          data-champ-name={champ}
          alt="champion card"
        />
      </div>
    </>
  );
}
