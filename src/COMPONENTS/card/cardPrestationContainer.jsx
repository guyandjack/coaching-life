/* eslint-disable react/prop-types */
//import des composants enfants
import { CardPrestationLeft, CardPrestationRight } from "./cardPrestation.jsx";

//import des feuilles de style
import "../../style/CSS/card-prestation-container.css";

//declaration des functions
function isPair(nbr) {
  if ((nbr + 1) % 2 == 0) {
    return true;
  }
  return false;
}

// eslint-disable-next-line react/prop-types
function CardPrestationContainer({ cardContentPrestation, coachingType }) {
  return (
    <ul className="flex-column-start-center container-card-prestation ">
      {cardContentPrestation[coachingType].map((content, index) => {
        return (
          <li className="container-card-prestation__li" key={index}>
            {isPair(index) ? (
              <CardPrestationLeft
                title={content["titre"]}
                text={content["contenu"]}
                urlImg={content["img500"]}
              />
            ) : (
              <CardPrestationRight
                title={content["titre"]}
                text={content["contenu"]}
                urlImg={content["img500"]}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export { CardPrestationContainer };
