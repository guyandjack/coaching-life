import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";

//import des composants enfants
//import { SimpleSlider } from "../COMPONENTS/slider/slider.jsx";
import { Carousel } from "../COMPONENTS/slider/slider-swiper.jsx";

//affiche le composant "simpleslider"

/*const containerSlider = document.getElementById("RC-slider");
const rootSlider = ReactDOM.createRoot(containerSlider);
rootSlider.render(
  <React.StrictMode>
    <SimpleSlider />
  </React.StrictMode>
);*/

const containerCarousel = document.getElementById("RC-carousel");
const rootCarousel = ReactDOM.createRoot(containerCarousel);
rootCarousel.render(
  <React.StrictMode>
    <Carousel />
  </React.StrictMode>
);
