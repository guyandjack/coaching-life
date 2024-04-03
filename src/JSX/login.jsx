import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { FormLogin } from "../COMPONENTS/form/formLogin.jsx";

//affiche le composant "formsendavis"

const containerFormLogin = document.getElementById("RC-form-login");
const rootFormLogin = ReactDOM.createRoot(containerFormLogin);
rootFormLogin.render(
  <React.StrictMode>
    <FormLogin />
  </React.StrictMode>
);
