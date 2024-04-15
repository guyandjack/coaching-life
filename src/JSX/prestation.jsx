import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { CardPrestationContainer } from "../COMPONENTS/card/cardPrestationContainer.jsx";

//import du contenu des cartes
import { cardContentPrestationFr } from "../DATA/cardContent/fr/cardContentPrestation-fr.js";

const containerCardPrestation = document.getElementById(
  "RC-container-card-prestation"
);
ReactDOM.createRoot(containerCardPrestation).render(
  <React.StrictMode>
    <CardPrestationContainer
      cardContentPrestation={cardContentPrestationFr}
      coachingType={"pageCoachingDeVie"}
    />
  </React.StrictMode>
);
