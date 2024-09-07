//Composant footer

//import des hook
import { useState } from "react";

//import librairie emoji
import * as emoji from "node-emoji";
//import des fonctions
import { getFooterContent } from "../../UTILS/fonctions/styleLinkFooter.js";

//import des composants enfants
import { CardResume } from "../card/cardResume.jsx";

//import des feuilles de style
import "../../style/CSS/footer.css";

function Footer() {
  // eslint-disable-next-line no-unused-vars
  const [isLoged, setIsLoged] = useState(false);

  let contentFooter = getFooterContent();

  return (
    <div className="container-footer flex-column-start-center">
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
      <div className="webmaster flex-row-center-center">
        <span>{"Powered with "}</span>
        <span>{emoji.emojify(":heart:")}</span>
        <span>{" by Norbert's developments"}</span>
      </div>
    </div>
  );
}

export { Footer };
