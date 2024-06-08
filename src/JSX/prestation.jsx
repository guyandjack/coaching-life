import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
//import { CardPrestationContainer } from "../COMPONENTS/card/cardPrestationContainer.jsx";
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";

//import du contenu des cartes
//import { cardContentPrestationFr } from "../DATA/cardContent/fr/cardContentPrestation-fr.js";

//insertion du menu de navigation
const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

//insertion des cartes de prestation
/* const containerCardPrestation = document.getElementById(
  "RC-container-card-prestation"
);
ReactDOM.createRoot(containerCardPrestation).render(
  <React.StrictMode>
    <CardPrestationContainer
      cardContentPrestation={cardContentPrestationFr}
      coachingType={"pageCoachingDeVie"}
    />
  </React.StrictMode>
); */

//insertion du footer
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
