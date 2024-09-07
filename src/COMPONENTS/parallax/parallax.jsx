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
import { BannerIndex } from "../banner/index-banner";

////import parallax500w from "../../assets/image/page-index/500w-parallax.jpg";
//import parallax1000w from "../../assets/image/page-index/1000w-parallax.jpg";
//import parallax1500w from "../../assets/image/page-index/1500w-parallax.jpg";
import parallax2000w from "../../assets/image/page-index/2000w-parallax.jpg";

import "../../style/CSS/parallax.css";

//declaration des function
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
                  ${parallax500w} 500w,
                  ${parallax1000w} 1000w,
                  ${parallax1500w} 1500w,
                  ${parallax2000w} 2000w,
          `}
            sizes="
                  (max-width: 575px), 
                  (max-width: 993px) , 
                  (max-width: 1500px) , 
                  (min-width: 1900px) , 
                   "*/
            src={parallax2000w}
            alt="des mains sur un clavier d'ordinateur"
          />
        </ParallaxBannerLayer>
         <BannerIndex /> 
      </ParallaxBanner>
    </ParallaxProvider>
  );
}

export { Parallax };
