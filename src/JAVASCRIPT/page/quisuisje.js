import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-de", `${url}/public/de/uber-mich.html`);
divData.setAttribute("data-en", `${url}/public/en/about-me.html`);
divData.setAttribute("data-fr", `${url}/public/fr/qui-suis-je.html`);

refLangDE.setAttribute("href", `${url}/public/de/uber-mich.html`);
refLangEN.setAttribute("href", `${url}/public/en/about-me.htmll`);
refLangFR.setAttribute("href", `${url}/public/fr/qui-suis-je.html`);
refLangDefault.setAttribute("href", `${url}/public/fr/qui-suis-je.html`);

