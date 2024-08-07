import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
import { FormLogin } from "../COMPONENTS/form/formLogin.jsx";
import { NavBar } from "../COMPONENTS/nav/navBar.jsx";
import { Footer } from "../COMPONENTS/footer/footer.jsx";

//affiche le composant "navbar"

const rootElement = document.getElementById("RC-nav-bar");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

//affiche le composant "formlogin"

const containerFormLogin = document.getElementById("RC-form-login");
const rootFormLogin = ReactDOM.createRoot(containerFormLogin);
rootFormLogin.render(
  <React.StrictMode>
    <FormLogin />
  </React.StrictMode>
);

//affiche le composant "footer"
const footerContainer = document.getElementById("RC-footer");
ReactDOM.createRoot(footerContainer).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);
