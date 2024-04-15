///rendu de page dasboard.html

import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants

import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
//import { CardSmallContainer } from "../COMPONENTS/card/cardSmallContainer.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";

const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

/*const cardContainer = document.getElementById("RC-card-container");
ReactDOM.createRoot(cardContainer).render(
  <React.StrictMode>
    <CardSmallContainer />
  </React.StrictMode>
);*/

const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
