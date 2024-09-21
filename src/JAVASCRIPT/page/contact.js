import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");


let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute(
  "data-fr",
  `${url}/fr/contactez-votre-coach-individuel-et-en-entreprise.html`
);
divData.setAttribute(
  "data-de",
  `${url}/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`
);
divData.setAttribute(
  "data-en",
  `${url}/en/contact-your-individual-and-business-coach.html`
);

refLangDE.setAttribute(
  "href",
  `${url}/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`
);
refLangEN.setAttribute(
  "href",
  `${url}/en/contact-your-individual-and-business-coach.html`
);
refLangFR.setAttribute(
  "href",
  `${url}/fr/contactez-votre-coach-individuel-et-en-entreprise.html`
);
refLangDefault.setAttribute(
  "href",
  `${url}/fr/contactez-votre-coach-individuel-et-en-entreprise.html`
);
