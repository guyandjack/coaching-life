//composant carte resume

//import des composants enfants

//import { ReactSVG } from "react-svg";
import { IconContext } from "react-icons";
import { BiLogoLinkedinSquare } from "react-icons/bi";

//import des fonctions
import { getCardContentResume } from "../../UTILS/fonctions/styleLinkCardResume.js";


//import des images
import  avatarSophie  from "/src/assets/image/card-resume/100w-sophie-chevrolet.webp";


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
          alt="avatar de sophie"
          loading="lazy"
          />

        <div className="container-resume-info flex-column-start-start">
          <span className="resume-info">Sophie Chevrolet</span>
          <span className="resume-info">Sion VS</span>
          {/* <span className="resume-info">+41 78 965 15 31</span> */}
          <a className="resume-info email" href="mailto:info@socoaching.ch">
            info@socoaching.ch
          </a>

          
          <a
            className="resume-info linkedin-icon"
            href="https://ch.linkedin.com/in/sophie-chevrolet-0947b250"
            target="_blank"
            aria-label="Vers réseau social Linkedin"
          >
            <IconContext.Provider value={{ className: "logo-linkedin" }}>
              <BiLogoLinkedinSquare />
            </IconContext.Provider>
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

