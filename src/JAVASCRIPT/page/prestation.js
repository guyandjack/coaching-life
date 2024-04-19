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

//Objet option d'initialisation du carousel
let option = {};

//instance du carousel
let instance = null;

// options pour initialiser le caroussel
let optionsDesktop = {
  dist: -100,
  numVisible: 3,
  shift: 200,
  onCycleTo: function findActiveSlider() {
    let activeSlider = document.querySelector(".carousel-item , .active");
    //console.log("aczive slider id: " + activeSlider.id);
  },
};

let optionMediumMobile = {
  fullWidth: true,
  onCycleTo: function findActiveSlider() {
    let activeSlider = document.querySelector(".carousel-item , .active");
    //console.log("aczive slider id: " + activeSlider.id);
  },
};

let optionSmallMobile = {
  fullWidth: true,
  onCycleTo: function findActiveSlider() {
    let activeSlider = document.querySelector(".carousel-item , .active");
    //console.log("aczive slider id: " + activeSlider.id);
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

function storeIdSliderInLocalStorage(id) {
  localStorage.setItem("idSlider", id);
}

//scrip principal
await changeCarousselClass();
initCarouselOption();
//console.log(instance.center);

arrowNext.addEventListener("click", () => {
  //console.log("next arrow clicked");
  instance.next(1);
  let activeSlider = document.querySelector(".carousel-item , .active");
  //console.log("aczive slider id: " + activeSlider.id);

  let idSlider = instance.center;
  //console.log("id slider: " + idSlider);
  storeIdSliderInLocalStorage("idSlider", idSlider);
});

arrowPrev.addEventListener("click", () => {
  //console.log("prev arrow clicked");
  instance.prev(1);
  let activeSlider = document.querySelector(".carousel-item , .active");
  //console.log("aczive slider id: " + activeSlider.id);

  let idSlider = instance.center;
  //console.log("id slider: " + idSlider);
  storeIdSliderInLocalStorage("idSlider", idSlider);
});

window.addEventListener("resize", async () => {
  await changeCarousselClass();
  initCarouselOption();
});
