//composant "Card"

//import des feuilles de style
import "../../style/CSS/card-small.css";

// eslint-disable-next-line react/prop-types
function CardSmall({ title, img, text, href }) {
  return (
    <a className="card-small flex-column-start-center" href={href}>
      <h2 className="card-title">{title}</h2>
      <img className="card-img" src={img} alt="decoration du lien"></img>
      <p className="card-text">{text}</p>
      <span className="card-btn">Voir la prestation</span>
    </a>
  );
}

export { CardSmall };
