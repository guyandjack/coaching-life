//function composant "NavBAr"
//import des hooks
import { useState, useEffect } from "react";

//import des composants enfants
import { ReactSVG } from "react-svg";

//import des fonctions
import { isScreenMobil } from "../../UTILS/fonctions/isScreenMobil.js";
//impot de feuilles de style
import "../../style/CSS/shared-class.css";
import "../../style/CSS/navbar.css";

//table de verite pour la logique d' affichage des composants de la "NavBAR"

function NavBar() {
  let [isSmallScreen, setIsSmallScreen] = useState();
  let [isClicked, setIsclicked] = useState(false);

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
      {/*<!-- declaration des svg de la page *******************
       **********************start *******************
       *************************************************-->*/}

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
              <li>
                <a href="index.html">Accueil</a>
              </li>
              <li>
                <a href="/src/HTML/prestation.html">Prestation</a>
              </li>
              <li>
                <a href="/src/HTML/quisuisje.html">Qui suis-je</a>
              </li>
              <li>
                <a href="/src/HTML/avis.html">Témoignages</a>
              </li>
              <li>
                <a href="/src/HTML/contact.html">Contact</a>
              </li>
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
          <li className="burger-menu-li">
            <a className="burger-menu-li-a" href="index.html">
              Accueil
            </a>
          </li>
          <li className="burger-menu-li">
            <a className="burger-menu-li-a" href="/src/HTML/prestation.html">
              Prestation
            </a>
          </li>
          <li className="burger-menu-li">
            <a className="burger-menu-li-a" href="/src/HTML/quisuisje.html">
              Qui suis-je
            </a>
          </li>
          <li className="burger-menu-li">
            <a className="burger-menu-li-a" href="/src/HTML/avis.html">
              Témoignages
            </a>
          </li>
          <li className="burger-menu-li">
            <a className="burger-menu-li-a" href="/src/HTML/contact.html">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { NavBar };
