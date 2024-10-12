import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";
import { Error404 } from "../COMPONENTS/error404/error404.jsx";

//import du contenu des cartes

//insertion du menu de navigation
const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

//insertion de la page error-404
const containerError = document.getElementById("RC-error-404");
ReactDOM.createRoot(containerError).render(
  <React.StrictMode>
    <Error404 />
  </React.StrictMode>
);



//insertion du footer
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
