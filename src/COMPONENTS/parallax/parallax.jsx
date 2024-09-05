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
            src="/src/assets/image/page-index/ville-fond-bleu-rose-2.jpg"
            alt="Sahara Desert landscape"
          />
        </ParallaxBannerLayer>
        <BannerIndex />
      </ParallaxBanner>
    </ParallaxProvider>
  );
}

export { Parallax };
