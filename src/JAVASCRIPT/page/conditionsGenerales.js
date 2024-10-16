import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");
//const link = document.querySelector("#link-politique");



let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-fr",`${url}/public/fr/conditions-generales-utilisation.html`);
divData.setAttribute(
  "data-de",
  `${url}/public/de/allgemeine-nutzungsbedingungen.html`
);
divData.setAttribute(
  "data-en",
  `${url}/public/en/general-terms-of-use.html`
);
//link.setAttribute("href", `${url}/public/fr/politique-de-confidencialite.html`);
