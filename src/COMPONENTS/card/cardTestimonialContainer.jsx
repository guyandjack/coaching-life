//composant "CardTestimonialContainer"
//import { useState, useEffect } from "react";

//import ds composants enfants
import { CardTestimonial } from "../../COMPONENTS/card/cardTestimonial.jsx";
import { Spinner } from "../../COMPONENTS/spinner/spinner.jsx";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des feuilles de style
import "../../style/CSS/card-testimonial-container.css";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;

//declaration des fonctions

import { useState, useEffect } from "react";

// Fonction pour récupérer les avis
const getAllAvis = async () => {
  try {
    
    const response = await fetch(`${url}/avis`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Vérifie si la réponse est correcte
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to fetch avis: ", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching avis: ", error);
    return [];
  }
};

function modulo(index) {
  return (index + 1) % 2 === 0;
}

function CardTestimonialContainer() {
  const [arrayAvis, setArrayAvis] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Spinner visible au départ

  

  useEffect(() => {
    const fetchAvis = async () => {
      setIsVisible(true); // Affiche le spinner
      try {
        const avis = await getAllAvis(); // Attendre la récupération des avis
        setArrayAvis(avis); // Met à jour l'état avec les avis récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      } finally {
        setTimeout(() => {
          setIsVisible(false);
        },500)
      }
    };
    
    fetchAvis(); // Appel de la fonction pour récupérer les avis
    
  }, []); // [] assure que l'effet se déclenche seulement au montage

  return (
    <div className="card-testimonial-container">
      {isVisible ?
        <Spinner
          visible={isVisible} /> :
        null}
      
      {arrayAvis.length > 0 ? (
        <ul className="flex-column-start-center animation-slider">
          {arrayAvis.map((card, index) => (
            <li key={card.id}>
              <CardTestimonial
                avatarUrl={card.url_img}
                testimonialText={card.content}
                testimonialLastName={card.last_name}
                testimonialFirstName={card.first_name}
                themeColor={modulo(index)}
              />
            </li>
          ))}
        </ul>
      ) : (
        !isVisible && <div>Aucun avis à afficher</div> // Affiche ce message uniquement si le spinner est caché
      )}
    </div>
  );
}

export { CardTestimonialContainer };



