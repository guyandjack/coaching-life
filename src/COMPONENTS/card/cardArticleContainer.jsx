//composant "containerCardArticle"

//import du contenu
import { useState, useEffect } from "react";

//import ds composants enfants
import { CardArticle } from "./cardArticle.jsx";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";


//import des feuilles de style
import "../../style/CSS/card-article-container.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;


function CardArticleContainer() {
  
  const [arrayArticle, setArrayArticle] = useState([]);
  const [displayList, setDisplayList] = useState(true);

  useEffect(() => {
    let cardContainer = document.querySelector(".card-article-container");
    
    if (displayList) {
      cardContainer.classList.remove("hide-list");
      console.log("je suis dans la condition qui affiche la liste");
      
    }
    else {
      cardContainer.classList.add("hide-list");
      console.log("je suis dans la condition qui ferme la liste");
    }

    return () => {
      
    };
  
  }, [displayList]);
  
  

  

  function getAllArticle() {

          
      let response = fetch(`${url}/article`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      
      });

      response.then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            setArrayArticle(result);
            setDisplayList(true);
                      
          });
        }
        else {
          alert("impossible d' afficher les articles")
        }
      });
    
    
  }

  
  return (
    <div className="flex-column-start-center form-dashboard">
      <div className="form-title">Gestions des articles</div>
      <div className="btn-container flex-row-space_evenly-center">
        <button
          className="btn-update-article "
          type="button"
          onClick={() => {
            getAllArticle();
          }}
        >
          {"Mettre à jour la liste d' articles"}
        </button>
        {arrayArticle.length > 0 ? (
          <button
            className="btn-display-article"
            type="button"
            onClick={() => {
              setDisplayList(!displayList);
            }}
          >
            {displayList ? "fermer la liste" : "Afficher les articles"}
          </button>
        ) : null}
      </div>
      <ul className="flex-row-space_evenly-center-wrap card-article-container">
        {arrayArticle.map((card, index) => {
          return (
            <li key={index}>
              <CardArticle
                title={card.title}
                resume={card.resume}
                imgUrl={card.url_img}
                index={index}
                id={card.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { CardArticleContainer };
