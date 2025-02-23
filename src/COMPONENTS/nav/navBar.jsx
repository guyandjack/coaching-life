/*function composant "NavBAr"*/
//import des hooks
import { useEffect, useRef, useState } from "react";

//import des composants enfants
import { ReactSVG } from "react-svg";
import { CustomCollapse } from "../collapse/collapse.jsx";

//import des data
//import { breakPoint } from "../../UTILS/breakpoint/break_point.js";

//import des fonctions
import { isXLargeScreen } from "../../UTILS/fonctions/isScreenMobil.js";
import {
  getNavBarContent,
  setHrefLinkLanguage,
  styleLinkNavBar,
} from "../../UTILS/fonctions/styleLinkNavBar.js";
import { localOrProd } from "../../UTILS/fonctions/testEnvironement";
import { getPageLanguage } from "../../UTILS/fonctions/checkPageLanguage.js";

//import des image et logo
import iconClose from "../../assets/icons/close.svg";
import iconLanguage from "../../assets/icons/icon-language.svg";
import iconMenuBurger from "../../assets/icons/menu-burger-40x40.svg";
import logoSocoaching from "../../assets/logo/logo-monogramme-v4.svg";
import fr_flag from "../../assets/icons/france.png";
import en_flag from "../../assets/icons/united-kingdom.png";
import de_flag from "../../assets/icons/germany.png";

let objectUrl = localOrProd();
let url = objectUrl.url;

//import de feuilles de style
import "../../style/CSS/navbar.css";

//function principale

function NavBar() {
  let [isSmallScreen, setIsSmallScreen] = useState(isXLargeScreen());
  let [isClicked, setIsclicked] = useState(false);
  const [isToken, setIsToken] = useState(false);

  let selectedContent = getNavBarContent();

  const containerLogo = useRef(null);
  const collapseElement = useRef(null);

  let href_fr = useRef("");
  let href_en = useRef("");
  let href_de = useRef("");

  const langText = useRef("");

  const langFrMainMenu = useRef(null);
  const langDeMainMenu = useRef(null);
  const langEnMainMenu = useRef(null);

  const langFrBurgerMenu = useRef(null);
  const langDeBurgerMenu = useRef(null);
  const langEnBurgerMenu = useRef(null);

  //gere l'effet de style sur les liens en fonction de l'url de la page
  useEffect(() => {
    if (!isSmallScreen) {
      styleLinkNavBar();
    }
    return () => {};
  });

  //determine la valeur de l' attribut "href" des liens de la liste choix des langues mainMenu et menuBurger
  useEffect(() => {
    let result = setHrefLinkLanguage();
    href_de.current = result.de ?? null;
    href_en.current = result.en ?? null;
    href_fr.current = result.fr ?? null;
    if (
      langFrMainMenu.current &&
      langEnMainMenu.current &&
      langDeMainMenu.current
    ) {
      langDeMainMenu.current.href = href_de.current;
      langEnMainMenu.current.href = href_en.current;
      langFrMainMenu.current.href = href_fr.current;
    }
    if (
      langFrBurgerMenu.current &&
      langEnBurgerMenu.current &&
      langDeBurgerMenu.current
    ) {
      langDeBurgerMenu.current.href = href_de.current;
      langEnBurgerMenu.current.href = href_en.current;
      langFrBurgerMenu.current.href = href_fr.current;
    }
  }, [isSmallScreen]);

  //ajoute un atribut aria-label en fonction de la langue de la page
  useEffect(() => {
    let lang = getPageLanguage();
   
    switch (lang) {
      case "fr":
        if (
          langFrMainMenu.current &&
          langEnMainMenu.current &&
          langDeMainMenu.current
        ) {
          langText.current = "Selection de la langue";
          langFrMainMenu.current.setAttribute(
            "aria-label",
            "Change la langue en francais"
          );
          langEnMainMenu.current.setAttribute(
            "aria-label",
            "Change la langue en anglais"
          );
          langDeMainMenu.current.setAttribute(
            "aria-label",
            "Change la langue en allemand"
          );
        }

        if (
          langFrBurgerMenu.current &&
          langEnBurgerMenu.current &&
          langDeBurgerMenu.current
        ) {
          langFrBurgerMenu.current.setAttribute(
            "aria-label",
            "Change la langue en francais"
          );
          langEnBurgerMenu.current.setAttribute(
            "aria-label",
            "Change la langue en anglais"
          );
          langDeBurgerMenu.current.setAttribute(
            "aria-label",
            "Change la langue en allemand"
          );
        }
        break;
      case "de":
        if (
          langFrMainMenu.current &&
          langEnMainMenu.current &&
          langDeMainMenu.current
        ) {
          langText.current = "Auswahl der Sprache";
          langFrMainMenu.current.setAttribute(
            "aria-label",
            "Ändere die Sprache auf Deutsch"
          );
          langEnMainMenu.current.setAttribute(
            "aria-label",
            "Ändert die Sprache auf Englisch"
          );
          langDeMainMenu.current.setAttribute(
            "aria-label",
            "Ändert die Sprache auf Deutsch"
          );
        }
        if (
          langFrBurgerMenu.current &&
          langEnBurgerMenu.current &&
          langDeBurgerMenu.current
        ) {
          langFrBurgerMenu.current.setAttribute(
            "aria-label",
            "Ändere die Sprache auf Deutsch"
          );
          langEnBurgerMenu.current.setAttribute(
            "aria-label",
            "Ändert die Sprache auf Englisch"
          );
          langDeBurgerMenu.current.setAttribute(
            "aria-label",
            "Ändert die Sprache auf Deutsch"
          );
        }
        break;
      case "en":
        if (
          langFrMainMenu.current &&
          langEnMainMenu.current &&
          langDeMainMenu.current
        ) {
          langText.current = "Change language";
          langFrMainMenu.current.setAttribute(
            "aria-label",
            "Change language to French"
          );
          langEnMainMenu.current.setAttribute(
            "aria-label",
            "Change language to English"
          );
          langDeMainMenu.current.setAttribute(
            "aria-label",
            "Change language to German"
          );
        }
        if (
          langFrBurgerMenu.current &&
          langEnBurgerMenu.current &&
          langDeBurgerMenu.current
        ) {
          langFrBurgerMenu.current.setAttribute(
            "aria-label",
            "Change language to French"
          );
          langEnBurgerMenu.current.setAttribute(
            "aria-label",
            "Change language to English"
          );
          langDeBurgerMenu.current.setAttribute(
            "aria-label",
            "Change language to German"
          );
        }
        break;

      default:
        break;
    }
  },[isSmallScreen]);

  function clickBurger() {
    if (!isClicked) {
      setIsclicked(true);
    }
    return;
  }

  //modifie le state qui gere l' affichage du composant "collapse"
  function isSession() {
    if (localStorage.getItem("token")) {
      setIsToken(true);
      return true;
    }
    setIsToken(false);
    return false;
  }

  

  //determine si l'ecran est de type mobile, et ajuste le "UseState" en fonction
  useEffect(() => {
    let isMobilDisplay = isXLargeScreen();

    setIsSmallScreen(isMobilDisplay);

    window.addEventListener("resize", () => {
      let isMobilDisplays = isXLargeScreen();

      setIsSmallScreen(isMobilDisplays);
    });

    return () => {
      window.removeEventListener("resize", () => {
        let isMobilDisplays = isXLargeScreen();

        setIsSmallScreen(isMobilDisplays);
      });
    };
  }, []);

  useEffect(() => {
    //detect si un token d' authentification  est present
    isSession();

    

    //verifie si un token est present toutes les  seconsdes
    let inter = setInterval(() => {
      console.log("verifie le token chaque secondes.");
      isSession();
      
    }, 1000);

    return () => {
      clearInterval(inter);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav>
      {/*!isSmallScreen || (isSmallScreen && !isClicked) ? () : null*/}
      <div
        style={{ minHeight: "70px" }} // coreection CLS
        className={
          isSmallScreen /*&& !isClicked*/
            ? "nav-bar flex-row_reverse-space_between-center"
            : "nav-bar flex-row-space_between-center"
        }
      >
        <div
          className={
            isSmallScreen
              ? "flex-row-center-center wrapper-logo"
              : "flex-row_reverse-center-center wrapper-logo"
          }
        >
          <div
            ref={collapseElement}
            className="flex-column-center-center wrapper-collapse"
          >
            {isToken ? <CustomCollapse /> : null}
          </div>

          <div ref={containerLogo} className="container-logo">
            <a href={`${url}/index.html`} aria-label="Accueil">
              <ReactSVG
                src={logoSocoaching}
                className="logo-coaching-svg"
                title="logo de l'entreprise socoaching"
              />
            </a>
          </div>
        </div>

        {isSmallScreen && !isClicked ? (
          <div className=" container-burger" onClick={() => clickBurger()}>
            <ReactSVG src={iconMenuBurger} className="logo-burger-svg" />
          </div>
        ) : null}

        {!isSmallScreen ? (
          <div className="container-nav flex-row-end-center">
            <ul className="relative container-link flex-row-start-center">
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

              <li className="flex-column-center-center container-lang ">
                <div className="container-icon-lang">
                  <ReactSVG
                    src={iconLanguage}
                    beforeInjection={(svg) => {
                      svg.classList.add("icon-language");
                      svg.setAttribute("aria-label", `${langText.current}`);
                    }}
                  />
                </div>

                <ul className="flex-column-space_evenly-center list-lang ">
                  <li className="list-lang-li">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={""}
                      ref={langDeMainMenu}
                    >
                      <img
                        src={de_flag}
                        alt="german flag"
                        width={25}
                        height={25}
                      ></img>
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={""}
                      ref={langEnMainMenu}
                    >
                      <img
                        src={en_flag}
                        alt="german flag"
                        width={25}
                        height={25}
                      ></img>
                    </a>
                  </li>
                  <li className="list-lang-li">
                    <a
                      className="list-lang-li-a flex-column-center-center"
                      href={""}
                      ref={langFrMainMenu}
                    >
                      <img
                        src={fr_flag}
                        alt="german flag"
                        width={25}
                        height={25}
                      ></img>
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
            <ReactSVG src={iconClose} className="icon-close-svg" />
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
          {
            <li className="burger-menu-li">
              <ul className="burger-menu-lang flex-row-start-center">
                <li className="burger-menu-lang-li flex-row-center-center">
                  <a
                    className="burger-menu-lang-li-a"
                    href={""}
                    ref={langDeBurgerMenu}
                  >
                    <img
                      src={de_flag}
                      alt="german flag"
                      width={25}
                      height={25}
                    ></img>
                  </a>
                </li>
                <li className="burger-menu-lang-li flex-row-center-center">
                  <a
                    className="burger-menu-lang-li-a"
                    href={""}
                    ref={langEnBurgerMenu}
                  >
                    <img
                      src={en_flag}
                      alt="uk flag"
                      width={25}
                      height={25}
                    ></img>
                  </a>
                </li>
                <li className="burger-menu-lang-li flex-row-center-center">
                  <a
                    className="burger-menu-lang-li-a"
                    href={""}
                    ref={langFrBurgerMenu}
                  >
                    <img
                      src={fr_flag}
                      alt="french flag"
                      width={25}
                      height={25}
                    ></img>
                  </a>
                </li>
              </ul>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}

export { NavBar };
