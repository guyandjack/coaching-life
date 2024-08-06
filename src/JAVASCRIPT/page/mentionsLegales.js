import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

divData.setAttribute("data-fr", `${url}/fr/mentions-legales.html`);
divData.setAttribute("data-de", `${url}/de/impressum.html`);
divData.setAttribute("data-en", `${url}/en/legal-notice.html`);
