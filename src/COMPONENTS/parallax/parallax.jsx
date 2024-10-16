// eslint-disable-next-line no-unused-vars
import {
  ParallaxBanner,
  // eslint-disable-next-line no-unused-vars
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";

import { useEffect, useState } from "react";

import { breakPoint } from "../../UTILS/breakpoint/break_point.js";

//import des composants enfants
import { BannerIndex } from "../banner/index-banner.jsx";

//import parallax500w from "../../assets/image/page-index/500w-image-index.webp";
//import parallax1000w from "../../assets/image/page-index/1000w-image-index.webp";
//import parallax1500w from "../../assets/image/page-index/1500w-parallax.jpg";
//import parallax2000w from "../../assets/image/page-index/2000w-parallax.jpg";
import parallax2000w from "../../assets/image/page-index/image-index.webp";

//import des fonctions


import "../../style/CSS/parallax.css";

//declaration des function

function getLanguage() {
  let htmlElement = document.querySelector("html");
  let lang = htmlElement.getAttribute("lang");
  return lang
}


function changeRatio(displayWidth) {
  const { large_Max, x_large_Max, small_Max, medium_Max } = breakPoint;

  if (displayWidth <= small_Max) return "1 / 1.5";
  if (displayWidth <= medium_Max) return "1 / 1";
  if (displayWidth <= large_Max) return "1 / 1";
  if (displayWidth <= x_large_Max) return "2 / 1";
  return "3 / 1";
}

function updateRatio(seteur) {
  let displayWidth = window.innerWidth;
  let newRatio = changeRatio(displayWidth);
  seteur(newRatio);
}

function Parallax() {
  const [ratio, setRatio] = useState();
  const [language, setLanguage] = useState();

  useEffect(() => {
    let lang = getLanguage();
    setLanguage(lang);
  }, []);


  useEffect(() => {
    updateRatio(setRatio);

    window.addEventListener("resize", () => {
      updateRatio(setRatio);
    });
    return () => {
      window.addEventListener("resize", () => {
        updateRatio(setRatio);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ParallaxProvider>
      <ParallaxBanner style={{ aspectRatio: `${ratio}` }}>
        <ParallaxBannerLayer speed={-20}>
          <img
            /*srcSet={`
                  ${parallax500w} 600w,
                  ${parallax1000w} 1000w,
                  ${parallax2000w} 2000w,
          `}
            sizes="
                  (max-width: 575px) 575px, 
                  (max-width: 993px) 993px, 
                  2000px
                   "*/
            src={parallax2000w}
            alt="hommes et femmes d'affaire qui font des sauts de joi sur un fond de building et de couché de soleil"
          />
        </ParallaxBannerLayer>
         <BannerIndex lang={language} /> 
      </ParallaxBanner>
    </ParallaxProvider>
  );
}

export { Parallax };
