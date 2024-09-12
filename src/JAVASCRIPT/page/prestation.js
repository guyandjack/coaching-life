

/*************************************************
 * ********concerne la gestion du carousel*******
 * **********************************************/

// Import uniquement le JS du composant Carousel
import { Carousel } from "materialize-css";


/* eslint-disable no-unused-vars */
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des breakPoints
import { breakPoint } from "../../UTILS/breakpoint/break_point";


//declaration des varibles

//container arrow
let arrowNext = document.querySelector("#arrow-next");
let arrowPrev = document.querySelector("#arrow-prev");

//menu fixed container
const menuFixedContainer = document.querySelector("#coaching-life");

//menu fixed
const coachingVie = document.querySelector("#c-v");
const coachingCarriere = document.querySelector("#c-c");
const coachingEntreprise = document.querySelector("#c-e");

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

let activedSlider = null;

// options pour initialiser le caroussel
let optionsDesktop = {
    duration: 0,
    dist: -150,
    shift: 150,
    numVisible: 3,
    fullWidth: false,
    //onCycleTo: handleCycleTo,
    
    };

let optionsMobile = {
    duration: 0,
    numVisible:1,
    fullWidth: true,
    //onCycleTo: handleCycleTo
    };



//declaration des functions

// Ajoute le gestionnaire d'événements `onCycleTo` après l'initialisation complète
function addCycleToHandler() {
  // Ajouter dynamiquement `onCycleTo` seulement après l'initialisation complète
  if (instance) {
    instance.options.onCycleTo = handleCycleTo;
    instance.options.duration = 200;
  }
}

function handleCycleTo() {
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  colorArrowSlider(activeSliderId);
  activedSlider = activeSliderId;
}

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

// Fonction pour initialiser le carousel avec les options appropriées
function initCarouselOption() {
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

function changeCarousselClass() {
  let sizeScreen = window.innerWidth;
  
  if (sizeScreen >= breakPoint.large_Max) {
    //console.log("drand ecran detcté: " + sizeScreen);
    carouselElement.classList.remove("carousel-slider");
    return;
  }
  else {
    carouselElement.classList.add("carousel-slider");
    return;
    
  }
}

function getActiveSliderId() {
  let activeElement = document.querySelector(".carousel-item.active");

  activeSliderId = activeElement.id;
  
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

arrowNext.addEventListener("click", () => {
  instance.next(1);

  activedSlider = getActiveSliderId();
});

arrowPrev.addEventListener("click", () => {
  instance.prev(1);
  activedSlider = getActiveSliderId();
});

coachingVie.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
});
coachingCarriere.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
});
coachingEntreprise.addEventListener("click", (e) => {
  displayServiceByMenuFixed(activeSliderId, e.target.id);
  activedSlider = getActiveSliderId();
});



(function () {
  changeCarousselClass();
  initCarouselOption();
  getActiveSliderId();
  displaySelectedService(activeSliderId);
  
  
  
})();

window.addEventListener("resize", () => {
  changeCarousselClass();
  initCarouselOption();
 
  
  
});

/**
 *detrmine l'url courante et affiche le contenu correspondant vie/carriere/entreprise
 * issus des liens de la page index
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


