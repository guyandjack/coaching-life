//import des fonctions
import { isScreenMobil } from "../../../UTILS/fonctions/isScreenMobil.js";

import { localOrProd } from "../../../UTILS/fonctions/testEnvironement.js";

//Variables representant les liens de la bannierre
const linkTitleVie = document.querySelector("#vie");
const linkTitleCarriere = document.querySelector("#carriere");
const linkTitleEntreprise = document.querySelector("#entreprise");

//gere l' afficha des liens sur ecran mobile < 700

function displayLink() {
  let containerLink = document.querySelector(".link-container");
  let isSmallScreen = isScreenMobil();

  console.log("fonction is runing");

  if (isSmallScreen && containerLink.classList.contains("hide")) {
    containerLink.classList.remove("hide");
    return;
  }

  if (!isSmallScreen && !containerLink.classList.contains("hide")) {
    containerLink.classList.add("hide");
    return;
  }
}

function setUrlLink(url) {
  linkTitleVie.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#vie`
  );
  linkTitleCarriere.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#carriere`
  );
  linkTitleEntreprise.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#entreprise`
  );
}

// script principal

window.document.addEventListener("resize", function (e) {
  console.log("evenement resize: " + e);
  displayLink();
});

//determine l' url entre dev et prod
let objectUrl = localOrProd();
let url = objectUrl.url;

//modifie l' attribut href des liens
setUrlLink(url);
