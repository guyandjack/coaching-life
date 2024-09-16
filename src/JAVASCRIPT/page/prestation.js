/*************************************************
 * ********concerne la page prestation  *******
 * **********************************************/

// Import uniquement le JS du composant Carousel
import { Carousel } from "materialize-css";

//import des fonctions
/* eslint-disable no-unused-vars */
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des breakPoints
import { breakPoint } from "../../UTILS/breakpoint/break_point";
//import forEach from "@babel/runtime-corejs3/core-js-stable/core-js-stable/instance/for-each.js";

//declaration des varibles globales

/**************** concerne le carousel********* start***** */

//element carousel
let carouselElement = document.querySelector(".carousel");

//Objet option d'initialisation du carousel
let option = {};

//instance du carousel
let instance = null;

let activeSliderId = null;

let activedSlider = null;

// options pour initialiser le caroussel mode desktop
let optionsDesktop = {
  duration: 0,
  dist: -150,
  shift: 150,
  numVisible: 3,
  fullWidth: false,
  //onCycleTo: handleCycleTo,
};

// options pour initialiser le caroussel mode mobile
let optionsMobile = {
  duration: 0,
  numVisible: 1,
  fullWidth: true,
  //onCycleTo: handleCycleTo
};

//container arrow slide
let arrowNext = document.querySelector("#arrow-next");
let arrowPrev = document.querySelector("#arrow-prev");

//svg arrow
let arrows = document.querySelectorAll(".icon-arrow-slider");

/**************** concerne le carousel********* end ***** */

/**************** concerne le menu fixed ********* start ***** */

//menu fixed container
const menuFixedContainer = document.querySelector(".menu-fixed-container");
const target1 = document.querySelector("#target-1");
const target2 = document.querySelector(".lieu-des-prestations");

//menu fixed li
const coachingVie = document.querySelector("#c-v");
const coachingCarriere = document.querySelector("#c-c");
const coachingEntreprise = document.querySelector("#c-e");

//option de configuration de l'intersection observer
let ratio = 0.1;
const optionsObserver = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const targetObserver1 = target1;
const targetObserver2 = target2;
console.log("target observer 1: " + targetObserver1)
console.log("target observer 2: " + targetObserver2)





/**************** concerne le menu fixed ********* end ***** */

/**************** concerne les artixles principaux ********* start ***** */

//main conteneur des articles
let mainContainerArticle = document.querySelector("#main-container-prestation");

// trois articles principaux
let articleLife = document.getElementById("coaching-de-vie");
let articleJob = document.getElementById("coaching-de-cariere");
let articleEntreprise = document.getElementById("coaching-en-entreprise");

/**************** concerne les artixles principaux ********* end ***** */

//declaration des fonctions

/***** gestion de la logique du carousel **************** start ****** */

// Ajoute le gestionnaire d'événements `onCycleTo` après l'initialisation complète
// car la callback est appelée a chaque initialisation
// ellene doit etre appele uniquement au click sur les fleche du slider
function addCycleToHandler() {
  // Ajouter dynamiquement `onCycleTo` seulement après l'initialisation complète
  if (instance) {
    instance.options.onCycleTo = handleCycleTo;
    instance.options.duration = 200;
  }
}

//caalback appelle a chaque click sur les fleche du slider
function handleCycleTo() {
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  colorArrowSlider(activeSliderId);
  activedSlider = activeSliderId;
}

//positionne le carousel sur le slider precedament consulte apres une initialisation

function setGoodSlide() {
  if (activedSlider !== null) {
    console.log("Active slide stored: " + activedSlider);

    switch (activedSlider) {
      case "slider-1":
        instance.set(0); // Pour le premier slide
        break;
      case "slider-2":
        instance.set(1); // Pour le deuxième slide
        break;
      case "slider-3":
        instance.set(2); // Pour le troisième slide
        break;
      default:
        console.warn("No valid slider found in storage.");
        break;
    }
  }
}

// Fonction pour initialiser le carousel avec
//les options appropriées en fonction de la taille d'ecran
function initCarousel() {
  const sizeScreen = window.innerWidth;
  let option;

  if (sizeScreen >= breakPoint.large_Max) {
    option = optionsDesktop; // Définir les options pour desktop
  } else {
    option = optionsMobile; // Définir les options pour mobile
  }

  if (instance) {
    instance.destroy(); // Détruire l'instance existante si elle existe
  }

  // Initialiser le carousel avec les nouvelles options
  instance = Carousel.init(carouselElement, option);

  console.log("Options pour init ajustement: ", instance.options);

  // Positionner le carousel sur le slide correct
  setGoodSlide();

  addCycleToHandler();
  console.log("Options après ajustement: ", instance.options);
}

//adapte les class du carousel avant initialisation suivant documenetation materialiseCSS
function changeCarousselClass() {
  let sizeScreen = window.innerWidth;

  if (sizeScreen >= breakPoint.large_Max) {
    //console.log("drand ecran detcté: " + sizeScreen);
    carouselElement.classList.remove("carousel-slider");
    return;
  } else {
    carouselElement.classList.add("carousel-slider");
    return;
  }
}

//recupere l'id du slider visible a l' ecran
function getActiveSliderId() {
  let activeElement = document.querySelector(".carousel-item.active");

  activeSliderId = activeElement.id;

  return activeSliderId;
}

//affiche l' article principal en fonction du slide actif/affiche dans le caroussel
function displaySelectedService(activeSliderId) {
  switch (activeSliderId) {
    case "slider-1":
      articleLife.classList.remove("hide");
      articleJob.classList.add("hide");
      articleEntreprise.classList.add("hide");

      break;
    case "slider-2":
      articleJob.classList.remove("hide");
      articleEntreprise.classList.add("hide");
      articleLife.classList.add("hide");
      break;
    case "slider-3":
      articleEntreprise.classList.remove("hide");
      articleJob.classList.add("hide");
      articleLife.classList.add("hide");
      break;

    default:
      articleLife.classList.remove("hide");
      articleJob.classList.add("hide");
      articleEntreprise.classList.add("hide");
      break;
  }
}

//
function displayServiceByMenuFixed(activeSliderId, menufixedli) {
  switch (activeSliderId) {
    case "slider-1":
      if (menufixedli == "c-v") {
        return;
      }
      if (menufixedli == "c-c") {
        instance.next(1);
        //instance.set(2)
      }
      if (menufixedli == "c-e") {
        instance.prev(1);
        //instance.set(3)
      }

      break;
    case "slider-2":
      if (menufixedli == "c-v") {
        instance.prev(1);
      }
      if (menufixedli == "c-c") {
        return;
      }
      if (menufixedli == "c-e") {
        instance.next(1);
      }

      break;
    case "slider-3":
      if (menufixedli == "c-v") {
        instance.next(1);
      }
      if (menufixedli == "c-c") {
        instance.prev(1);
      }
      if (menufixedli == "c-e") {
        return;
      }

      break;

    default:
      break;
  }
}

function displayMenuFixed() {

  if (window.innerWidth < breakPoint.large_Max) {
    menuFixedContainer.classList.add("hide");
    return
  }
  //callback de l'intersection observer
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.target === target1) {
        // Quand on intersecte target1, afficher le menu
        if (entry.isIntersecting) {
          //observer.unobserve(targetObserver2);
          menuFixedContainer.classList.remove("hide")
        } else {
          // Si on quitte target1 (scroll vers le haut), cacher le menu
          //menuFixedContainer.classList.add("hide")
        }
      }

      if (entry.target === target2) {
        // Si on intersecte target2 (scroll vers le bas), cacher le menu
        if (entry.isIntersecting) {
          //observer.unobserve(targetObserver1);
          menuFixedContainer.classList.add("hide")
        }  else {
          // Si on quitte target2 (scroll vers le haut), afficher le menu
          menuFixedContainer.classList.remove("hide");
          //observer.unobserve(targetObserver2);
        } 
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, optionsObserver);

    observer.observe(targetObserver1);
    observer.observe(targetObserver2);
  
  
}

function colorArrowSlider(activeElementId) {
  if (window.innerWidth > breakPoint.large_Max) {
    arrows.forEach((arrow) => {
      arrow.classList.remove(
        "color-arrow-second",
        "color-arrow-third",
        "color-arrow-fourth"
      );
    });
    return;
  }

  switch (activeElementId) {
    case "slider-1":
      arrows.forEach((arrow) => {
        arrow.classList.remove("color-arrow-third", "color-arrow-fourth");
        arrow.classList.add("color-arrow-second");
      });
      break;

    case "slider-2":
      arrows.forEach((arrow) => {
        arrow.classList.remove(
          "color-arrow-second",

          "color-arrow-fourth"
        );
        arrow.classList.add("color-arrow-third");
      });

      break;

    case "slider-3":
      arrows.forEach((arrow) => {
        arrow.classList.remove("color-arrow-second", "color-arrow-third");
        arrow.classList.add("color-arrow-fourth");
      });
      break;

    default:
      arrows.forEach((arrow) => {
        arrow.classList.remove(
          "color-arrow-second",
          "color-arrow-third",
          "color-arrow-fourth"
        );
        arrow.classList.add("color-arrow-second");
      });
      break;
  }
}

/**
 *affiche l'article principal en fonction de l'url de la page courante
 */
function displayContent() {
  const activeUrl = new URL(window.location.href);
  let hash = activeUrl.hash;
  if (hash !== undefined && hash !== null) {
    console.log("url de la page: " + activeUrl.hash);

    switch (hash) {
      case "#vie":
        break;
      case "#carriere":
        instance.next(1);
        activedSlider = getActiveSliderId();
        break;
      case "#entreprise":
        instance.next(2);
        activedSlider = getActiveSliderId();
        break;

      default:
        undefined;

        break;
    }
  }
}

/*************************************************
 * ********              *******
 * **********************************************/

arrowNext.addEventListener("click", () => {
  instance.next(1);

  activedSlider = getActiveSliderId();
});

arrowPrev.addEventListener("click", () => {
  instance.prev(1);
  activedSlider = getActiveSliderId();
});

(function () {
  changeCarousselClass();
  initCarousel();
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  colorArrowSlider(activeSliderId);
})();

window.addEventListener("resize", () => {
  changeCarousselClass();
  initCarousel();
  colorArrowSlider(activeSliderId);
});

/*************************************************
 * ********concerne le div href lang*******
 * **********************************************/

const divData = document.querySelector("#info-href");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute(
  "data-fr",
  `${url}/fr/prestations-de-coaching-individuel-et-en-entreprise.html`
);
divData.setAttribute(
  "data-de",
  `${url}/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html`
);
divData.setAttribute(
  "data-en",
  `${url}/en/services-of-individual-and-business-coaching.html`
);

displayContent();

/*************************************************
 * ********concerne le menu fixed*******
 * **********************************************/
displayMenuFixed();

window.addEventListener("resize", () => {
  displayMenuFixed();
});

coachingVie.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
  mainContainerArticle.scrollIntoView({behavior:"smooth"});
  
});
coachingCarriere.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
  mainContainerArticle.scrollIntoView({behavior:"smooth"});
  
});
coachingEntreprise.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
  mainContainerArticle.scrollIntoView({behavior:"smooth"});
  
});
