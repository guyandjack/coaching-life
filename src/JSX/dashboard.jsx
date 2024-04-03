//rendu de page dasboard.html

import React from "react";

import ReactDOM from "react-dom/client";

//import des composants enfants
import { FormChangePassword } from "../COMPONENTS/form/formChangePassword.jsx";
import { FormAddAvis } from "../COMPONENTS/form/formAddAvis.jsx";
import { FormChangeAvis } from "../COMPONENTS/form/formChangeAvis.jsx";

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

//affiche le composant "ChangeAvis"

const containerFormChangeAvis = document.getElementById("RC-form-change-avis");
const rootFormChangeAvis = ReactDOM.createRoot(containerFormChangeAvis);
rootFormChangeAvis.render(
  <React.StrictMode>
    <FormChangeAvis />
  </React.StrictMode>
);
