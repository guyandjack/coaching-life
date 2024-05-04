//function composant "NavBAr"
//import des hooks
import { useState, useEffect, useRef } from "react";

//import des composants enfants
import { ReactSVG } from "react-svg";

//import des fonctions
import { isScreenMobil } from "../../UTILS/fonctions/isScreenMobil.js";
import {
  styleLinkNavBar,
  getNavBarContent,
  setHrefLinkLanguage,
} from "../../UTILS/fonctions/styleLinkNavBar.js";

//import de feuilles de style
import "../../style/CSS/navbar.css";

//declaration des fonctions

function NavBar() {
  let [isSmallScreen, setIsSmallScreen] = useState();
  let [isClicked, setIsclicked] = useState(false);

  let selectedContent = getNavBarContent();

  let href_fr = useRef("");
  let href_en = useRef("");
  let href_de = useRef("");

  //gere l' effet de style sur les liens en fonction de l'url de la page
  useEffect(() => {
    if (!isSmallScreen) {
      styleLinkNavBar();
    }
    return () => {};
  });

  //attribut la route des liens de la liste choix des langues
  useEffect(() => {
    let result = setHrefLinkLanguage();

    href_de.current = result.de;
    href_en.current = result.en;
    href_fr.current = result.fr;
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
      {/*!isSmallScreen || (isSmallScreen && !isClicked) ? () : null*/}
      <div
        className={
          isSmallScreen /*&& !isClicked*/
            ? "nav-bar flex-row_reverse-space_between-center"
            : "nav-bar flex-row-space_between-center"
        }
      >
        <div className="container-logo">
          <ReactSVG
            src="/src/assets/logo/logo-monogramme.svg"
            className="logo-coaching-svg"
          />
        </div>
        {isSmallScreen && !isClicked ? (
          <div className="container-burger" onClick={() => clickBurger()}>
            <ReactSVG
              src="/src/assets/icons/menu-burger-v2.svg"
              className="logo-burger-svg"
            />
          </div>
        ) : null}
        {!isSmallScreen ? (
          <div className="container-nav flex-row-end-center">
            <ul className="container-link flex-row-start-center">
              {selectedContent.map((link, index) => {
                return (
                  <li key={index} className="container-link-li">
                    <a id={link.id} className="nav-link" href={link.href}>
                      {link.text}
                      <span className="indicator"></span>
                    </a>
                  </li>
                );
              })}
              <li className="container-lang flex-column-start-center">
                <ReactSVG
                  src="/src/assets/icons/icon-language.svg"
                  beforeInjection={(svg) => {
                    svg.classList.add("icon-language");
                  }}
                />
                <ul className="list-lang flex-row-space_evenly-center">
                  <li className="list-lang-li">
                    <a className="list-lang-li-a" href={href_de.current}>
                      De
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a className="list-lang-li-a" href={href_en.current}>
                      En
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a className="list-lang-li-a" href={href_fr.current}>
                      Fr
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <div
        className={
          isSmallScreen && isClicked ? "menu-burger open" : "menu-burger close "
        }
      >
        <ul className="burger-menu-list flex-column-start-start">
          <li
            className="burger-menu-li flex-row-center-center"
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
              <li key={index} className="burger-menu-li flex-row-center-center">
                <a className="burger-menu-li-a" href={link.href}>
                  {link.text}
                </a>
              </li>
            );
          })}
          <li className="">
            <ul className="burger-menu-lang flex-row-start-center">
              <li className="burger-menu-lang-li flex-row-center-center">
                <a className="burger-menu-lang-li-a" href={href_de.current}>
                  De
                </a>
              </li>
              <li className="burger-menu-lang-li flex-row-center-center">
                <a className="burger-menu-lang-li-a" href={href_en.current}>
                  En
                </a>
              </li>
              <li className="burger-menu-lang-li flex-row-center-center">
                <a className="burger-menu-lang-li-a" href={href_fr.current}>
                  Fr
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { NavBar };
