//composant "containerCardArticle"

//import du contenu
import { useState, useEffect } from "react";

//import ds composants enfants
import { CardAvis } from "./cardAvis.jsx";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des feuilles de style
import "../../style/CSS/card-article-container.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;


function CardAvisContainer() {
    const [arrayAvis, setArrayAvis] = useState([]);
    const [displayList, setDisplayList] = useState(true);
    
    console.log("url de base dans avis container : " + url);
  //const isArray = useRef(false);

  useEffect(() => {
    let cardContainer = document.querySelector(".card-avis-container");

    if (displayList) {
      cardContainer.classList.remove("hide-list");
      console.log("je suis dans la condition qui affiche la liste");
    } else {
      cardContainer.classList.add("hide-list");
      console.log("je suis dans la condition qui ferme la liste");
    }

    return () => {};
  }, [displayList]);

  function getAllAvis() {
    const token = localStorage.getItem("token");

    let promesse = fetch(`${url}/avis`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    promesse.then((response) => {
      if (response.ok) {
        response
          .json()
          .then((result) => {
            setArrayAvis(result);
            setDisplayList(true);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setArrayAvis([]);
        setDisplayList(true);
      }
    });
  }

  return (
    <div className="flex-column-start-center form-dashboard">
      <div className="form-title">Suprimer un avis</div>
      <div className="btn-container flex-row-space_evenly-center">
        <button
          className="btn-update-article "
          type="button"
          onClick={() => {
            getAllAvis();
          }}
        >
          {"Mettre à jour la liste d'avis"}
        </button>
        {arrayAvis.length > 0 ? (
          <button
            className="btn-display-avis"
            type="button"
            onClick={() => {
              setDisplayList(!displayList);
            }}
          >
            {displayList ? "fermer la liste" : "Afficher les avis"}
          </button>
        ) : null}
      </div>
      <ul className="flex-row-space_evenly-center-wrap card-avis-container">
        {arrayAvis.length > 0 ? (
          arrayAvis.map((card, index) => {
            return (
              <li key={index}>
                <CardAvis
                        lastname={card.content}
                  firstname={card.first_name}
                        content= {card.content}
                  imgurl={card.url_img}
                  index={index}
                  id={card.id}
                />
              </li>
            );
          })
        ) : (
          <div>{"Aucun avis publié sur le site"}</div>
        )}
      </ul>
    </div>
  );
}

export { CardAvisContainer};
