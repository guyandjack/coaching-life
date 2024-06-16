/* eslint-disable no-unused-vars */
/*************************************************
 * ********concerne la gestion du carousel*******
 * **********************************************/

//import des breakPoints
import { breakPoint } from "../../UTILS/breakpoint/break_point";

//declaration des varibles
let arrowNext = document.querySelector("#arrow-next");
let arrowPrev = document.querySelector("#arrow-prev");

let elem = document.querySelector(".carousel");

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
  onCycleTo: () => {
    getActiveSliderId();
    displaySelectedService(activeSliderId);
  },
};

let optionMediumMobile = {
  fullWidth: true,
  onCycleTo: () => {
    getActiveSliderId();
    displaySelectedService(activeSliderId);
  },
};

let optionSmallMobile = {
  fullWidth: true,
  onCycleTo: () => {
    getActiveSliderId();
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
    // eslint-disable-next-line no-undef
    /* console.log(
      "carousel initialisé avec option plein ecran: " + option.fullWidth
    );
    console.log(
      "carousel initialisé avec option num visible: " + option.numVisible
    ); */
    // eslint-disable-next-line no-undef
    instance = M.Carousel.init(elem, option);
  } else {
    instance.destroy();
    /* console.log(
      "carousel initialisé type 2 avec option plein ecran: " + option.fullWidth
    );
    console.log(
      "carousel initialisé type 2 avec option num visible: " + option.numVisible
    ); */
    // eslint-disable-next-line no-undef
    instance = M.Carousel.init(elem, option);
  }
}

async function changeCarousselClass() {
  let sizeScreen = window.innerWidth;
  //console.log("taille de l'ecran: " + sizeScreen);

  if (sizeScreen <= breakPoint.small_Min) {
    //console.log("petit ecran detcté: " + sizeScreen);
    elem.classList.add("carousel-slider", "center");
    return;
  }
  if (
    sizeScreen >= breakPoint.small_Min &&
    sizeScreen <= breakPoint.large_Min
  ) {
    //console.log("moyen ecran detcté: " + sizeScreen);
    elem.classList.add("carousel-slider", "center");
    return;
  }
  if (sizeScreen >= breakPoint.large_Max) {
    //console.log("drand ecran detcté: " + sizeScreen);
    elem.classList.remove("carousel-slider", "center");
    return;
  }
}

function getActiveSliderId() {
  let activeSlider = document.querySelector(".carousel-item.active");

  activeSliderId = activeSlider.id;
  return activeSliderId;
}

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

arrowNext.addEventListener("click", () => {
  instance.next(1);
});

arrowPrev.addEventListener("click", () => {
  instance.prev(1);
});

//scrip principal
await changeCarousselClass();
initCarouselOption();
getActiveSliderId();
displaySelectedService(activeSliderId);
//console.log(instance.center);

window.addEventListener("resize", async () => {
  await changeCarousselClass();
  initCarouselOption();
  getActiveSliderId();
  displaySelectedService(activeSliderId);
});
