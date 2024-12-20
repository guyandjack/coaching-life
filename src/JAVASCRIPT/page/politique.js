import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute(
  "data-fr",
  `${url}/public/fr/politique-de-confidancialite.html`
);
divData.setAttribute("data-de", `${url}/public/de/geheimhaltungspolitik.html`);
divData.setAttribute("data-en", `${url}/public/en/privacy-policy.html`);
