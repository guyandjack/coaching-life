//rendu de page dasboard.html

import React from "react";

import ReactDOM from "react-dom/client";

//import des composants enfants
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
//import { CardSmallContainer } from "../COMPONENTS/card/cardSmallContainer.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";

//import { Spinner } from "../COMPONENTS/spinner/spinner.jsx";
import { FormChangePassword } from "../COMPONENTS/form/formChangePassword.jsx";
import { FormAddAvis } from "../COMPONENTS/form/formAddAvis.jsx";
//import { FormChangeAvis } from "../COMPONENTS/form/formChangeAvis.jsx";
import { FormAddArticle } from "../COMPONENTS/form/formAddArticle.jsx";
import { CardArticleContainer } from "../COMPONENTS/form/cardFormArticleContainer.jsx";
//import { CardAvis } from "../COMPONENTS/card/cardAvis.jsx";
import { CardAvisContainer } from "../COMPONENTS/form/cardFormAvisContainer.jsx";


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

const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);

//affiche le composant "FormChangePassword"

const containerFormChangePassword = document.getElementById(
  "RC-form-change-password"
);
const rootFormChangePassword = ReactDOM.createRoot(containerFormChangePassword);
rootFormChangePassword.render(
  <React.StrictMode>
    <FormChangePassword />
  </React.StrictMode>
);

//affiche le composant "AddAvis"

const containerFormAddAvis = document.getElementById("RC-form-add-avis");
const rootFormAddAvis = ReactDOM.createRoot(containerFormAddAvis);
rootFormAddAvis.render(
  <React.StrictMode>
    <FormAddAvis />
  </React.StrictMode>
);

// Rendu du composant deleteAvis dans le DOM
const containerFormDeleteAvis = document.getElementById("RC-form-delete-avis");
const rootFormDeleteAvis = ReactDOM.createRoot(containerFormDeleteAvis);
rootFormDeleteAvis.render(
  <React.StrictMode>
    <CardAvisContainer />
  </React.StrictMode>
);


// Rendu du composant formAddArticle dans le DOM
const formAddArticleElement = document.getElementById("RC-form-add-article");
ReactDOM.createRoot(formAddArticleElement).render(
  <React.StrictMode>
    <FormAddArticle />
  </React.StrictMode>
);

// Rendu du composant formAddArticle dans le DOM
const cardArticleContainerdelete = document.getElementById("RC-container-delete-article");
ReactDOM.createRoot(cardArticleContainerdelete).render(
  <React.StrictMode>
    <CardArticleContainer />
  </React.StrictMode>
);
