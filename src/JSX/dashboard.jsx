//rendu de page dasboard.html

import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { FormChangePassword } from "../COMPONENTS/form/formChangePassword";

//affiche le composant "formsendavis"

const containerFormSetPassword = document.getElementById("rc-form-password");
const rootFormSetPassword = ReactDOM.createRoot(containerFormSetPassword);
rootFormSetPassword.render(
  <React.StrictMode>
    <FormChangePassword />
  </React.StrictMode>
);
