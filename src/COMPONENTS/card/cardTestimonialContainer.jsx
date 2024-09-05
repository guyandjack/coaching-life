//composant "CardTestimonialContainer"
//import { useState, useEffect } from "react";

//import ds composants enfants
import { CardTestimonial } from "../../COMPONENTS/card/cardTestimonial.jsx";

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

  // Utilisation de useEffect pour appeler getAllAvis lors du montage du composant
  useEffect(() => {
    const fetchAvis = async () => {
      const avis = await getAllAvis();
      setArrayAvis(avis); // Met à jour l'état avec les avis récupérés
    };

    fetchAvis();
  }, []); // Le tableau de dépendances vide [] assure que l'effet se déclenche seulement au montage

  return arrayAvis.length > 0 ? (
    <ul className="flex-column-start-center card-testimonial-container animation-slider">
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
    <div>{"Aucun avis à afficher"}</div>
  );
}

export { CardTestimonialContainer };

