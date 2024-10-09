///rendu de page dasboard.html

import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants

import { NavBar } from "../COMPONENTS/nav/navBar.jsx";

import { Footer } from "../COMPONENTS/footer/footer.jsx";



import { CardClientContainer } from "../COMPONENTS/card/cardArticleClientContainer.jsx";

//insertion des composants

const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);



const articleClient = document.getElementById("RC-article-client");
ReactDOM.createRoot(articleClient).render(
  <React.StrictMode>
    <CardClientContainer />
  </React.StrictMode>
);

const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
