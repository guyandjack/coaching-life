//composant "Card"

//import du contenu
import { cardContent } from "../../DATA/cardContent/cardContent.js";

//import ds composants enfants
import { CardSmall } from "../../COMPONENTS/card/cardSmall.jsx";

//import des feuilles de style
import "../../style/CSS/card-small-container.css";

function CardSmallContainer() {
  return (
    <ul className="card-small-container flex-row-space_evenly-center-wrap">
      {cardContent.map((card, index) => {
        return (
          <li key={index}>
            <CardSmall
              title={card.title}
              img={card.urlImg}
              text={card.text}
              href={card.href}
            />
          </li>
        );
      })}
    </ul>
  );
}

export { CardSmallContainer };
