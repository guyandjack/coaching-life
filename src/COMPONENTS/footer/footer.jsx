//Composant footer

//import des hook
import { useState } from "react";

//import des feuilles de style
import "../../style/CSS/footer.css";

function Footer() {
  // eslint-disable-next-line no-unused-vars
  const [isLoged, setIsLoged] = useState(false);

  return (
    <div className="footer">
      <ul className="footer-contact flex-column-start-start">
        <li className="footer-contact-li">Sophie Chevrolet</li>

        <li className="footer-contact-li">
          <a className="footer-contact-li-a" href="#">
            social icon
          </a>
        </li>
        <li className="footer-contact-li">
          <a className="footer-contact-li-a" href="#">
            Dialogons ensemble
          </a>
        </li>
      </ul>
      <ul className="footer-list flex-column-start-start">
        <li className="footer-list-li">
          <a className="footer-list-li-a" href="#">
            {"Condition générales d'utilisation"}
          </a>
        </li>
        <li className="footer-list-li">
          <a className="footer-list-li-a" href="#">
            Protection des données
          </a>
        </li>
        <li className="footer-list-li">
          <a className="footer-list-li-a" href="#">
            Login
          </a>
        </li>
        {isLoged ? (
          <li className="footer-list-li">
            <a className="footer-list-li-a" href="#">
              Admin
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export { Footer };
