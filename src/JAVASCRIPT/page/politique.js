import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

divData.setAttribute(
  "data-fr",
  `${url}/public/fr/politique-de-confidancialite.html`
);
divData.setAttribute("data-de", `${url}/public/de/`);
divData.setAttribute("data-en", `${url}/public/en/`);
