import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

divData.setAttribute("data-fr", `${url}/fr/politique-de-confidancialite.html`);
divData.setAttribute("data-de", `${url}/de/`);
divData.setAttribute("data-en", `${url}/en/`);
