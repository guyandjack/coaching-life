//Composant footer

//import des hook
import { useEffect, useRef, useState } from "react";

//import librairie emoji
import * as emoji from "node-emoji";
//import des fonctions
import { getPageLanguage } from "../../UTILS/fonctions/checkPageLanguage.js";
import { getFooterContent } from "../../UTILS/fonctions/styleLinkFooter.js";

//import des composants enfants
import { ReactSVG } from "react-svg";
import { CardResume } from "../card/cardResume.jsx";
import { EcoIndexBadge } from "../ecoIndexBadge/ecoIndexBadge.jsx";

//import des images et svg
import quoteSvg from "/src/assets/design/quote.svg";

//import des feuilles de style
import "../../style/CSS/footer.css";

function Footer() {
  // eslint-disable-next-line no-unused-vars
  const [isLoged, setIsLoged] = useState(false);

  let contentFooter = getFooterContent();

  const ecolabelText = useRef(null);
  const ecolabelLink = useRef(null);
  const ecolabelTextScore = useRef(null);

  useEffect(() => {
    let lang = getPageLanguage();

    if (ecolabelText.current && ecolabelLink.current && ecolabelTextScore.current) {
      switch (lang) {
        case "fr":
          ecolabelTextScore.current.textContent = "Score:"
          ecolabelText.current.textContent = "Agissons pour une conception numérique responsable.";
          ecolabelLink.current.textContent = "Méthode de notation";
          break;
        case "en":
          ecolabelTextScore.current.textContent = "Score:"
          ecolabelText.current.textContent = "Let's take action for responsible digital design.";
          ecolabelLink.current.textContent = "Scoring method";
          break;
        case "de":
          ecolabelTextScore.current.textContent = "Punktzahl:";
          ecolabelText.current.textContent = "Handeln wir für ein verantwortungsbewusstes digitales Design.";
          ecolabelLink.current.textContent = "Bewertungsmethode";
          break;

        default:
          break;
      }
    }
  }, []);

  return (
    <div
      style={{ minHeight: "350px" }} // coreection CLS
      className="container-footer flex-column-start-center"
    >
      <div className="footer flex-column-center-center">
        <div className="footer-card flex-column-start-center">
          <CardResume />
        </div>
        <ul className="footer-list flex-column-start-start">
          {contentFooter.header.map((link, index) => {
            return (
              <li key={index} className="footer-list-li">
                <a className="footer-list-li-a" href={link.href}>
                  {link.text}
                </a>
              </li>
            );
          })}

          {isLoged ? (
            <li className="footer-list-li">
              <a className="footer-list-li-a" href="#">
                Admin
              </a>
            </li>
          ) : null}
        </ul>
        <ul className="footer-list flex-column-start-start">
          {contentFooter.footer.map((link, index) => {
            return (
              <li key={index} className="footer-list-li">
                <a className="footer-list-li-a" href={link.href}>
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-column-center-center ecolabel">
        <div className="flex-row-center-center relative">
          <ReactSVG className="ecolabel-quote" src={quoteSvg} />
          <p
            className="ecolabel-text text-first"
            ref={ecolabelText}
          >
            Agissons pour une conception numerique responsable.
          </p>
          <ReactSVG className="ecolabel-quote" src={quoteSvg} />
        </div>
        <div className="flex-row-center-center container-badge">
          <span
            className="text-fifth"
            ref={ecolabelTextScore }
          >
            Score: </span>

          <EcoIndexBadge />
        </div>
        <a
          href="https://www.ecoindex.fr/comment-ca-marche/"
          className="ecolabel-text"
          ref={ecolabelLink}
        >
          Methode de notation
        </a>
      </div>
      <div className="webmaster flex-row-center-center">
        <span>{"Powered with "}</span>
        <span>{emoji.emojify(":heart:")}</span>
        <span>{" by Norbert's developments"}</span>
      </div>
    </div>
  );
}

export { Footer };

