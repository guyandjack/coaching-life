//composant "CardTestimonialContainer"
import { useState, useEffect, useRef } from "react";

//import ds composants enfants
import { CardTestimonial } from "../../COMPONENTS/card/cardTestimonial.jsx";

//import des feuilles de style
import "../../style/CSS/card-testimonial-container.css";

//declaration des fonctions

/**
 *
 *
 * @return {array} tableau qui contien tous les commentaires
 */
async function getAllAvis() {
  try {
    const resultFetch = await fetch("http://localhost:5500/api/avis", {
      method: "GET",
    });

    let jsonResult = await resultFetch.json();
    console.log("new array: " + Array.from(jsonResult));

    return Array.from(jsonResult);
  } catch (error) {
    console.log("imposiible de faire la requette fetch: " + error);
  }
}

function modulo(index) {
  let trueIndex = index + 1;
  if (trueIndex % 2 == 0) {
    return true;
  }
  return false;
}

function CardTestimonialContainer() {
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsloaded] = useState(false);
  const arrayAvis = useRef([]);

  useEffect(() => {
    if (arrayAvis["current"].length < 1) {
      let allAvis = getAllAvis();
      allAvis.then((result) => {
        arrayAvis.current = result;
        setIsloaded(true);
      });
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return isLoaded ? (
    <ul className="flex-column-start-center card-testimonial-container animation-slider">
      {arrayAvis["current"].map((card, index) => {
        return (
          <li key={index}>
            <CardTestimonial
              avatarUrl={card["url_img"]}
              testimonialText={card["content"]}
              testimonialLastName={card["last_name"]}
              testimonialFirstName={card["first_name"]}
              themeColor={modulo(index)}
            />
          </li>
        );
      })}
    </ul>
  ) : null;
}

export { CardTestimonialContainer };
