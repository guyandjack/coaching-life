import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants

import { NavBar } from "../COMPONENTS/nav/navBar.jsx";

import { Footer } from "../COMPONENTS/footer/footer.jsx";

import { Spinner } from "../COMPONENTS/spinner/spinner.jsx";

// eslint-disable-next-line no-unused-vars
import { Error404 } from "../COMPONENTS/error404/error404.jsx";


//insertion des composants

const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

// Rendu du composant Spinner dans le DOM
const spinnerElement = document.getElementById("RC-spinner");
ReactDOM.createRoot(spinnerElement).render(
  <React.StrictMode>
    <Spinner />
  </React.StrictMode>
);

// Rendu du composant error-404 dans le DOM
 const error404Element = document.getElementById("RC-error-404");
ReactDOM.createRoot(error404Element).render(
  <React.StrictMode>
    <Error404 />
  </React.StrictMode>
); 

const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);