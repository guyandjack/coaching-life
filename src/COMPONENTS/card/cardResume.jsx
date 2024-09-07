//composant carte resume

//import des composants enfants

import { ReactSVG } from "react-svg";

//import des fonctions
import { getCardContentResume } from "../../UTILS/fonctions/styleLinkCardResume.js";

//import des images
import  avatarSophie  from "../../assets/sophie/sophie-chevrolet.jpg";

//import des feuilles de style
import "../../style/CSS/card-resume.css";


function CardResume() {
 

  let content = getCardContentResume();

  return (
    <div className="flex-column-start-center card-resume">
      <h2 className="h2 resume-title">{content.title}</h2>
      <div className="container-avatar flex-row-space_evenly-center">
        <img
          className="resume-img"
          src={avatarSophie}
          alt="avatar de sophie chevrolet"
        />

        <div className="container-resume-info flex-column-start-start">
          <span className="resume-info">Sophie Chevrolet</span>
          <span className="resume-info"> Sion VS</span>
          <span className="resume-info"> +41 78 965 15 31</span>
          <a className="resume-info" href="mailto:info@socoaching.ch">
            info@socoaching.ch
          </a>

          <a className="resume-info" href="#">
            <ReactSVG
              src="/src/assets/logo/linkedin-icon-2.svg"
              beforeInjection={(svg) => {
                svg.classList.add("logo-linkedin");
              }}
            />
          </a>
        </div>
      </div>
      <div className="resume-footer">
        <a className="resume-footer-link" href={content.footer_link_href}>
          {content.footer_link}
        </a>
      </div>
    </div>
  );
}

export { CardResume };
