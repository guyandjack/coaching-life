import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";
import { CardTestimonialContainer } from "../COMPONENTS/card/cardTestimonialContainer.jsx";
//import { Spinner } from "../COMPONENTS/spinner/spinner.jsx";

//import du contenu des cartes

//insertion du menu de navigation
const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);
// Rendu du composant Spinner dans le DOM
/* const spinnerElement = document.getElementById("RC-spinner");
ReactDOM.createRoot(spinnerElement).render(
  <React.StrictMode>
    <Spinner />
  </React.StrictMode>
); */

//insertion de la banner avis
const avisBanner = document.getElementById("RC-container-avis");
ReactDOM.createRoot(avisBanner).render(
  <React.StrictMode>
    <CardTestimonialContainer />
  </React.StrictMode>
);

//insertion du footer
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
