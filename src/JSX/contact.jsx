import React from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";
import { FormContact } from "../COMPONENTS/form/formContact.jsx";

//import du contenu des cartes

//insertion du menu de navigation
const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

//insertion du formulaire de contact
const containerFormContact = document.getElementById("RC-form-contact");
ReactDOM.createRoot(containerFormContact).render(
  <React.StrictMode>
    <FormContact />
  </React.StrictMode>
);

//insertion du footer
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
