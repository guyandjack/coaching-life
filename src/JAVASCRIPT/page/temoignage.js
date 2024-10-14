import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-de", `${url}/public/de/kundenbewertungen.html`);
divData.setAttribute("data-en", `${url}/public/en/customer-testimonials.html`);
divData.setAttribute("data-fr", `${url}/public/fr/temoignages-clients.html`);

refLangDE.setAttribute("href", `${url}/public/de/kundenbewertungen.html`);
refLangEN.setAttribute("href", `${url}/public/en/customer-testimonials.html`);
refLangFR.setAttribute("href", `${url}/public/fr/temoignages-clients.html`);
refLangDefault.setAttribute("href", `${url}/public/fr/temoignages-clients.html`);
