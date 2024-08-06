import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

let url = localOrProd();

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
