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

/***********permet de declencher les animation lorsque l' element est visible*****
 * ******************************************************************************/

//attends que le contenu du DOM soit charge sur la page
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null, // null signifie que l'élément sera observé par rapport au viewport
    rootMargin: "0px",
    threshold: 0.2, // 10% de l'élément doit être visible pour déclencher l'observation
  };

  //declaration du construxteur intersectionviewer
  const observerArticle = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("transition-article");
        observer.unobserve(entry.target); // arrêter d'observer une fois que la classe est ajoutée
      }
    });
  }, observerOptions);

  // Sélectionner les éléments pour la transition article
  const elementsArticle = document.querySelectorAll(".link-article");
  elementsArticle.forEach((element) => {
    observerArticle.observe(element);
  });

  //declaration du construxteur intersectionviewer
  const observerText = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("transition-text");
        observer.unobserve(entry.target); // arrêter d'observer une fois que la classe est ajoutée
      }
    });
  }, observerOptions);

  // Sélectionner les éléments pour la transition text
  const elementsText = document.querySelectorAll(
    ".container-text-2, .container-text-3"
  );
  console.log("elements tesxt: " + elementsText);
  elementsText.forEach((element) => {
    console.log(element.textContent);
  });
  elementsText.forEach((element) => {
    observerText.observe(element);
  });
});

window.document.addEventListener("resize", function (e) {
  console.log("evenement resize: " + e);
  displayLink();
});
//determine l' url entre dev et prod
let objectUrl = localOrProd();
let url = objectUrl.url;

//modifie l' attribut href des liens
setUrlLink(url);
