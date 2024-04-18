/* eslint-disable react/prop-types */
// composant carte "cardPrestation"

import { ReactSVG } from "react-svg";

//import des feuilles de style
import "../../style/CSS/card-prestation.css";

// eslint-disable-next-line no-unused-vars
function CardPrestationLeft({ title, text, urlImg }) {
  return (
    <div className="card-prestation flex-row-space_between-center">
      <div className="container-text flex-column-space_evenly-center">
        <h2 className="h2">{title}</h2>
        <p className="card-prestation-text">{text}</p>
      </div>
      <div className="container-picture">
        <ReactSVG
          className="logo"
          src="/src/assets/logo/logo-coaching-black.svg"
        />
        <img className="blob blob-right" src={urlImg} alt={"description"}></img>
      </div>
    </div>
  );
}
function CardPrestationRight({ title, text, urlImg }) {
  return (
    <div className="card-prestation flex-row_reverse-space_between-center">
      <div className="container-text flex-column-space_evenly-center">
        <h2 className="h2">{title}</h2>
        <p className="card-prestation-text ">{text}</p>
      </div>
      <div className="container-picture">
        <ReactSVG
          className="logo"
          src="/src/assets/logo/logo-coaching-black.svg"
        />
        <img className="blob blob-left" src={urlImg} alt={"description"}></img>
      </div>
    </div>
  );
}
export { CardPrestationLeft, CardPrestationRight };
