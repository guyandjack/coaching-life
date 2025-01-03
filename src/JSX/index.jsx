///rendu de page dasboard.html

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";


//import des composants enfants

import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
 


//import { CardSmallContainer } from "../COMPONENTS/card/cardSmallContainer.jsx";
//import { Footer } from "../COMPONENTS/footer/footer.jsx";
// Lazy load du composant Footer avec un export nommé
// eslint-disable-next-line react-refresh/only-export-components
const Footer = React.lazy(() => import('../COMPONENTS/footer/footer.jsx').then(module => ({ default: module.Footer })));

//import { Spinner } from "../COMPONENTS/spinner/spinner.jsx";

import { Parallax } from "../COMPONENTS/parallax/parallax.jsx";


//insertion des composants

const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    
    <NavBar />
  </React.StrictMode>
);

// Rendu du composant Spinner dans le DOM
/*const spinnerElement = document.getElementById("RC-spinner");
ReactDOM.createRoot(spinnerElement).render(
  <React.StrictMode>
    <Spinner />
  </React.StrictMode>
);*/

//rendu du composant parallax
const parallaxComponent = document.getElementById("RC-parallax");
ReactDOM.createRoot(parallaxComponent).render(
  <React.StrictMode>
    <Parallax />
  </React.StrictMode>
);

const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Suspense>
      <Footer />
    </Suspense>
  </React.StrictMode>
);
