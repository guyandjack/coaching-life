/// Import du CSS et du JS depuis 'materialize-css' via npm
//import 'materialize-css/dist/css/materialize.min.css';  // Import du CSS depuis le dossier dist
//import 'materialize-css/dist/js/materialize.min.js';

// Import uniquement le JS du composant Carousel
import { Carousel } from "materialize-css";
console.log("contenu de lôbjet Carousel: " + Carousel);

/* eslint-disable no-unused-vars */
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

/*************************************************
 * ********concerne la gestion du carousel*******
 * **********************************************/

//import des breakPoints
import { breakPoint } from "../../UTILS/breakpoint/break_point";
import { BiArrowBack } from "react-icons/bi";

//declaration des varibles
//container arrow
let arrowNext = document.querySelector("#arrow-next");
let arrowPrev = document.querySelector("#arrow-prev");

//svg arrow
let arrows = document.querySelectorAll(".icon-arrow-slider");

let carouselElement = document.querySelector(".carousel");

let articleLife = document.getElementById("coaching-de-vie");
let articleJob = document.getElementById("coaching-de-cariere");
let articleEntreprise = document.getElementById("coaching-en-entreprise");

//Objet option d'initialisation du carousel
let option = {};

//instance du carousel
let instance = null;

let activeSliderId = null;

// options pour initialiser le caroussel
let optionsDesktop = {
  dist: -100,
  numVisible: 3,
  shift: 200,
  onCycleTo: (el, dragged) => {
    //getActiveSliderId();
    activeSliderId = el.id;
    displaySelectedService(activeSliderId);
  },
};

let optionMediumMobile = {
  fullWidth: true,
  onCycleTo: (el, dragged) => {
    //getActiveSliderId();
    activeSliderId = el.id;
    displaySelectedService(activeSliderId);
  },
};

let optionSmallMobile = {
  fullWidth: true,
  onCycleTo: (el, dragged) => {
    //getActiveSliderId();
    activeSliderId = el.id;
    displaySelectedService(activeSliderId);
  },
};

//declaration des functions

function initCarouselOption() {
  let sizeScreen = window.innerWidth;
  //console.log("taille de l'ecran: " + sizeScreen);

  if (sizeScreen <= breakPoint.small_Min) {
    option = optionSmallMobile;
  }
  if (
    sizeScreen >= breakPoint.small_Min &&
    sizeScreen <= breakPoint.large_Min
  ) {
    option = optionMediumMobile;
  }
  if (sizeScreen >= breakPoint.large_Max) {
    option = optionsDesktop;
  }

  if (instance == null) {
    //instance = M.Carousel.init(elem, option);
    instance = Carousel.init(carouselElement, {
      option,
    });
    const observer = new MutationObserver(() => {
      getActiveSliderId();
      displaySelectedService(activeSliderId);
      colorArrowSlider(activeSliderId);
    });

    // Observer le changement d'attribut ou de classe de l'élément actif
    observer.observe(instance.el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  } else {
    instance.destroy();

    //instance = M.Carousel.init(elem, option);
    instance = Carousel.init(carouselElement, {
      option,
    });

    //creation d' un observer
    const observer = new MutationObserver(() => {
      getActiveSliderId();
      displaySelectedService(activeSliderId);
      colorArrowSlider(activeSliderId);
    });

    // Observer le changement d'attribut ou de classe de l'élément actif
    observer.observe(instance.el, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
}

function changeCarousselClass() {
  let sizeScreen = window.innerWidth;
  //console.log("taille de l'ecran: " + sizeScreen);

  if (sizeScreen <= breakPoint.small_Min) {
    //console.log("petit ecran detcté: " + sizeScreen);
    carouselElement.classList.add("carousel-slider", "center");
    return;
  }
  if (
    sizeScreen >= breakPoint.small_Min &&
    sizeScreen <= breakPoint.large_Min
  ) {
    //console.log("moyen ecran detcté: " + sizeScreen);
    carouselElement.classList.add("carousel-slider", "center");
    return;
  }
  if (sizeScreen >= breakPoint.large_Max) {
    //console.log("drand ecran detcté: " + sizeScreen);
    carouselElement.classList.remove("carousel-slider", "center");
    return;
  }
}

function getActiveSliderId() {
  let activeSlider = document.querySelector(".carousel-item.active");

  activeSliderId = activeSlider.id;
  //console.log("active slider id:" + activeSliderId)
  return activeSliderId;
}

function displaySelectedService(activeSliderId) {
  //adapte la couleur des fleche du slider
  

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

function colorArrowSlider(activeElementId) {
  if (window.innerWidth > breakPoint.large_Max) {
   arrows.forEach((arrow) => {
     arrow.classList.remove("color-arrow-second","color-arrow-third", "color-arrow-fourth");
   });
    return
  }

  switch (activeElementId) {
    case "slider-1":
      arrows.forEach((arrow) => {
        arrow.classList.remove(
          
          "color-arrow-third",
          "color-arrow-fourth"
        );
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
        arrow.classList.remove(
          "color-arrow-second",
          "color-arrow-third",
          
        );
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

arrowNext.addEventListener("click", () => {
  instance.next(1);
});

arrowPrev.addEventListener("click", () => {
  instance.prev(1);
});

/**
 *detrmine l' url courante et affiche le contenu correspondant vie/carriere/entreprise
 *
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

        break;
      case "#entreprise":
        instance.next(2);

        break;

      default:
        undefined;

        break;
    }
  }
}

(function () {
  changeCarousselClass();
  initCarouselOption();
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  //colorArrowSlider(activeSliderId);
})();

window.addEventListener("resize", () => {
  changeCarousselClass();
  initCarouselOption();
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  //colorArrowSlider(activeSliderId);
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
