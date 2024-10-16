/*function composant "NavBAr"*/
//import des hooks
import { useState, useEffect, useRef } from "react";

//import des composants enfants
import { ReactSVG } from "react-svg";

//import des fonctions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement";
import { isScreenMobil } from "../../UTILS/fonctions/isScreenMobil.js";
import {
  styleLinkNavBar,
  getNavBarContent,
  setHrefLinkLanguage,
} from "../../UTILS/fonctions/styleLinkNavBar.js";

//import des image et logo
import logoSocoaching from "../../assets/logo/logo-monogramme-v4.svg";
import iconMenuBurger from "../../assets/icons/menu-burger-40x40.svg";
import iconLanguage from "../../assets/icons/icon-language.svg";
import iconClose from "../../assets/icons/close.svg";


let objectUrl = localOrProd();
let url = objectUrl.url;

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
          <a
            href={`${url}/index.html`}
            aria-label="Accueil"
          >
            <ReactSVG
              src={logoSocoaching}
              className="logo-coaching-svg"
              title="logo de l'entreprise socoaching"
            />
          </a>
        </div>
        {isSmallScreen && !isClicked ? (
          <div className=" container-burger" onClick={() => clickBurger()}>
            <ReactSVG
              src={iconMenuBurger}
              className="logo-burger-svg"
            />
          </div>
        ) : null}
        {!isSmallScreen ? (
          <div className="container-nav flex-row-end-center">
            <ul className="container-link flex-row-start-center">
              {selectedContent.map((link, index) => {
                return (
                  <li
                    key={index}
                    className="flex-row-center-center container-link-li"
                  >
                    <a id={link.id} className="nav-link" href={link.href}>
                      {link.text}
                      <span className="indicator"></span>
                    </a>
                  </li>
                );
              })}
              { <li className="container-lang flex-column-center-center">
                <div className="container-icon-lang">
                  <ReactSVG
                    src={iconLanguage}
                    beforeInjection={(svg) => {
                      svg.classList.add("icon-language");
                    }}
                  />
                </div>

                <ul className="list-lang flex-row-space_between-center">
                  <li className="list-lang-li flex-column-center-center">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={href_de.current}
                    >
                      De
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={href_en.current}
                    >
                      En
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={href_fr.current}
                    >
                      Fr
                    </a>
                  </li>
                </ul>
              </li> }
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
              src={iconClose}
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
          { <li className="">
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
          </li> }
        </ul>
      </div>
    </div>
  );
}

export { NavBar };
