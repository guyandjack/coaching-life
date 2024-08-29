
import { CardArticleClient } from "./cardArticleClient";

//import du contenu
import { useState, useEffect } from "react";



//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";


//import des feuilles de style
import "../../style/CSS/card-article-container.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;


 

function CardClientContainer() {
  const [arrayArticle, setArrayArticle] = useState([]);

  // Fonction pour récupérer les articles
  const getAllArticle = async () => {
    try {
      const response = await fetch(`${url}/article`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`, // Décommentez et utilisez le token si nécessaire
        },
      });

      // Vérifie si la réponse est correcte
      if (response.ok) {
        const result = await response.json();
          setArrayArticle(result);
          //console.log("tableau des clef result :" + Object.entries(result))
          
      } else {
        // Réinitialise si la réponse n'est pas correcte
        //setArrayArticle([]);
        console.error("Failed to fetch articles: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching articles: ", error);
      setArrayArticle([]);
    }
  };

  // Utilisation de useEffect pour exécuter getAllArticle une fois que le composant est monté
  useEffect(() => {
    getAllArticle();
  }, []); // Le tableau vide [] assure que l'effet se déclenche seulement au montage

  return (
    <ul className="flex-row-space_evenly-center-wrap card-article-container">
      {arrayArticle.length > 0 ? (
        arrayArticle.map((card, index) => (
          <li key={card.id || index}>
            {" "}
            {/* Utilisez card.id si disponible */}
            <CardArticleClient
              titre={card.title}
              resume={card.resume}
              imgUrl={card.url_img}
              path={card.url_article}
            />
          </li>
        ))
      ) : (
        <div>{"Aucun article à afficher"}</div>
      )}
    </ul>
  );
}

export default CardClientContainer;


// eslint-disable-next-line no-undef
export {CardClientContainer} 
