//composant "containerCardArticle"

//import du contenu
import { useEffect, useState } from "react";

//import ds composants enfants
import { CardAvis } from "./formCardAvis.jsx";

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
    
    
   

  useEffect(() => {
    let cardContainer = document.querySelector(".card-avis-container");

    if (displayList) {
      cardContainer.classList.remove("hide-list");
      //console.log("je suis dans la condition qui affiche la liste");
    } else {
      cardContainer.classList.add("hide-list");
      //console.log("je suis dans la condition qui ferme la liste");
    }

    

    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllAvis() {
    //const token = localStorage.getItem("token");

    
    try {
      // Requête pour récupérer les avis
      const response = await fetch(`${url}/avis`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
      });

      // Vérification si la réponse est OK
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des avis");
      }

      // Extraction des données JSON
      const result = await response.json();
      setArrayAvis(result);
    } catch (error) {
      console.error("Erreur:", error);
      setArrayAvis([]); // En cas d'erreur, afficher une liste vide
    } finally {
      setDisplayList(true); // Afficher la liste (vide ou remplie)
    }
  }


  return (
    <div className="flex-column-start-center form-dashboard">
      <div className="form-title">Suprimer un avis</div>
      <div className="btn-container flex-row-space_evenly-center">
        <button
          className="btn-update-article"
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
          arrayAvis.map((card) => {
            return (
              <li key={card.id}>
                <CardAvis
                  lastname={card.last_name}
                  firstname={card.first_name}
                  content={card.content}
                  imgurl={card.url_img}
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

export { CardAvisContainer };

