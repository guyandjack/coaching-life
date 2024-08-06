import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

divData.setAttribute("data-fr", `${url}/fr/qui-suis-je.html`);
divData.setAttribute("data-de", `${url}/de/uber-mich.html`);
divData.setAttribute("data-en", `${url}/en/about-me.html`);
