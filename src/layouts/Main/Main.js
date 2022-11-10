import { useState } from "react";

//components
import Card from "../../components/Card/Card";

//styles
import "./Main.scss";

export default function Main(props) {
  return (
    <main>
      {/* {props.children} */}
      <div className="cards__container">
        <Card />
      </div>
    </main>
  );
}
