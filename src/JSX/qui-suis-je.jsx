import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";
import { CardResume } from "../COMPONENTS/card/cardResume.jsx";

//import du contenu des cartes

//insertion du menu de navigation
const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

//insertion du menu de navigation
/*const containerCardResume = document.getElementById("RC-card-resume");
ReactDOM.createRoot(containerCardResume).render(
  <React.StrictMode>
    <CardResume />
  </React.StrictMode>
);*/

//insertion du footer
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
