import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-fr", `${url}/fr/.html`);
divData.setAttribute("data-de", `${url}/de/kundenbewertungen.html`);
divData.setAttribute("data-en", `${url}/en/customer-testimonials.html`);
