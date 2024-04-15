/* eslint-disable react/prop-types */
// composant carte "cardPrestation"

//import des feuilles de style
import "../../style/CSS/card-prestation.css";

function CardPrestationLeft({ title, text, urlImg }) {
  return (
    <div className="card-prestation flex-row-space_between-center">
      <div className="container-text">
        <h2 className="h2">{title}</h2>
        <p className="card-prestation-text">{text}</p>
      </div>
      <div className="container-picture">
        <img className="blob" src={urlImg} alt={"description"}></img>
        <div className="logo"></div>
      </div>
    </div>
  );
}
function CardPrestationRight({ title, text, urlImg }) {
  return (
    <div className="card-prestation flex-row_reverse-space_between-center">
      <div className="container-text">
        <h2 className="h2">{title}</h2>
        <p className="card-prestation-text">{text}</p>
      </div>
      <div className="container-picture">
        <img className="blob" src={urlImg} alt={"description"}></img>
        <div className="logo"></div>
      </div>
    </div>
  );
}
export { CardPrestationLeft, CardPrestationRight };
