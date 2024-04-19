//function composant "NavBAr"
//import des hooks
import { useState, useEffect } from "react";

//import des composants enfants
import { ReactSVG } from "react-svg";

//import des fonctions
import { isScreenMobil } from "../../UTILS/fonctions/isScreenMobil.js";
import {
  styleLinkNavBar,
  getNavBarContent,
} from "../../UTILS/fonctions/styleLinkNavBar.js";

//import de feuilles de style
import "../../style/CSS/navbar.css";

//declaration des fonctions

function NavBar() {
  let [isSmallScreen, setIsSmallScreen] = useState();
  let [isClicked, setIsclicked] = useState(false);
  //let [selectedContent, setSelectedContent] = useState();
  let selectedContent = getNavBarContent();

  //gere l' effet de style sur les liens en fonction de l'url de la page
  useEffect(() => {
    if (!isSmallScreen) {
      styleLinkNavBar();
    }
    return () => {};
  });

  function clickBurger() {
    if (!isClicked) {
      setIsclicked(true);
    }
    return;
  }

  //determine si l' ecran est de type mobile, et ajuste le "UseState" en fonction
  useEffect(() => {
    let isMobilDisplay = isScreenMobil();

    setIsSmallScreen(isMobilDisplay);

    window.addEventListener("resize", () => {
      let isMobilDisplays = isScreenMobil();

      setIsSmallScreen(isMobilDisplays);
    });

    return () => {
      window.removeEventListener("resize", () => {
        isScreenMobil(setIsSmallScreen);
      });
    };
  }, []);
  return (
    <div>
      {!isSmallScreen || (isSmallScreen && !isClicked) ? (
        <div
          className={
            isSmallScreen && !isClicked
              ? "nav-bar flex-row_reverse-space_between-center"
              : "nav-bar flex-row-space_between-center"
          }
        >
          <div className="container-logo">
            <ReactSVG
              src="/src/assets/logo-coaching-bicolor-v2.svg"
              className="logo-coaching-svg"
            />
          </div>
          {isSmallScreen && !isClicked ? (
            <div onClick={() => clickBurger()}>
              <ReactSVG
                src="/src/assets/icons/menu-burger-v2.svg"
                className="logo-burger-svg"
              />
            </div>
          ) : null}
          {!isSmallScreen ? (
            <ul className="container-link flex-row-start-center">
              {selectedContent.map((link, index) => {
                return (
                  <li key={index}>
                    <a id={link.id} className="nav-link" href={link.href}>
                      {link.text}
                      <span className="indicator"></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div
        className={
          isSmallScreen && isClicked ? "menu-burger open" : "menu-burger "
        }
      >
        <ul className="burger-menu-list flex-column-start-start">
          <li
            className="burger-menu-li"
            onClick={() => {
              setIsclicked(false);
            }}
          >
            <ReactSVG
              src="/src/assets/icons/close.svg"
              className="icon-close-svg"
            />
          </li>
          {selectedContent.map((link, index) => {
            return (
              <li key={index} className="burger-menu-li">
                <a className="burger-menu-li-a" href={link.href}>
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { NavBar };
