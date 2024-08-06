import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

divData.setAttribute("data-fr", `${url}/public/fr/mentions-legales.html`);
divData.setAttribute("data-de", `${url}/public/de/impressum.html`);
divData.setAttribute("data-en", `${url}/public/en/legal-notice.html`);
