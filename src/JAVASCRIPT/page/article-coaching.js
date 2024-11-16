import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute(
  "data-de",
  `${url}/public/de/artikel-coaching-personale-entwicklung-unternehmen.html`
);
divData.setAttribute(
  "data-en",
  `${url}/public/en/article-coaching-personal-development-company.html`
);
divData.setAttribute(
  "data-fr",
  `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`
);

refLangDE.setAttribute(
  "href",
  `${url}/public/de/artikel-coaching-personale-entwicklung-unternehmen.html`
);
refLangEN.setAttribute(
  "href",
  `${url}/public/en/article-coaching-personal-development-company.html`
);
refLangFR.setAttribute(
  "href",
  `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`
);
refLangDefault.setAttribute(
  "href",
  `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`
);
