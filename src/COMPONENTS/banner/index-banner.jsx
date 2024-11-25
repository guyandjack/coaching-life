
import { useEffect, useRef } from "react"

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

// composant banner page accueil
import "../../style/CSS/index-banner.css"


//declaration des fonctions
function defineContent(lang) {
  let content = {};
  switch (lang) {
    case "fr":
      content.title = "Révéler les ressources de l'être humain";
      content.link1 = {
        titleLink : "Coaching de vie",
        textLink : "Trouvez votre équilibre"

      }
      content.link2 = {
        titleLink : "Coaching de carrière",
        textLink: "Libérez votre potentiel"
            };
      content.link3 = {
        titleLink : "Consulting en entreprise",
        textLink : "Management et RH"
      }

      
      break;
      case "de":
        content.title = "Die Ressourcen des Menschen offenbaren";
        content.link1 = {
          titleLink: "Lebenscoaching",
          textLink: "Finden Sie Ihr Gleichgewicht",
        };
        content.link2 = {
          titleLink: "Coaching für die Karriere",
          textLink: "Entfalten Sie Ihr Potenzial",
        };
      content.link3 = {
        titleLink: "Consulting in Unternehmen",
        textLink: "Management und HR",
      };

        
        break;
        case "en":
      content.title = "Revealing the human being's resources";
      content.link1 = {
        titleLink: "Life coaching",
        textLink: "Find your own balance",
      };
      content.link2 = {
        titleLink: "Career coaching",
        textLink: "Unleash your potential",
      };
      content.link3 = {
        titleLink: "Business Consulting",
        textLink: "Management and HR",
      };

      
      break;
  
    default:
      break;
  }
  console.log(content);
  return content
}





function setUrlLink(url) {
  let linkTitleVie = document.querySelector("#vie");
  let linkTitleCarriere = document.querySelector("#carriere");
  let linkTitleEntreprise = document.querySelector("#entreprise");

  linkTitleVie.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#vie`
  );
  linkTitleCarriere.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#carriere`
  );
  linkTitleEntreprise.setAttribute(
    "href",
    `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html#entreprise`
  );
}



// eslint-disable-next-line react/prop-types
function BannerIndex({ lang }) {
  
  let bannerTitle = useRef();
  let titleLink1 = useRef();
  let textLink1 = useRef();
  let titleLink2 = useRef();
  let textLink2 = useRef();
  let titleLink3 = useRef();
  let textLink3 = useRef();

  function setTitleBanner(contentBanner) {
    bannerTitle.current.textContent = contentBanner.title;
  }

    function setLinkBanner(contentBanner) {
    titleLink1.current.textContent = contentBanner.link1.titleLink;
    textLink1.current.textContent = contentBanner.link1.textLink;
    titleLink2.current.textContent = contentBanner.link2.titleLink;
    textLink2.current.textContent = contentBanner.link2.textLink;
    titleLink3.current.textContent = contentBanner.link3.titleLink;
    textLink3.current.textContent = contentBanner.link3.textLink;
  }
    useEffect(() => {
      //determine l' url entre dev et prod
      let objectUrl = localOrProd();
      let url = objectUrl.url;
      setUrlLink(url);
      return () => {};
    }, []);
  
  useEffect(() => {
    let contentBanner = defineContent(lang);
    setTitleBanner(contentBanner);
    setLinkBanner(contentBanner);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
      <div className="flex-column-start-center banner-container ">
        <h1 ref={bannerTitle } className="h1 banner-title">
          
          {"Révéler les ressources de l'être humain"}
        </h1>
        

        <ul className="flex-column-space_evenly-center link-container">
          <li>
            <a id="vie" className="flex-column-center-center link-cta" href="#">
              <p ref={titleLink1} className="h2 text-inside"></p>
              <p ref={textLink1} className="h3 text-aside"></p>
            </a>
          </li>
          <li>
            <a
              id="carriere"
              className="flex-column-center-center link-cta"
              href="#"
            >
              <p ref={titleLink2} className="h2 text-inside"></p>
              <p ref={textLink2} className="h3 text-aside"></p>
            </a>
          </li>

          <li>
            <a
              id="entreprise"
              className="flex-column-center-center link-cta"
              href="#"
            >
              <p ref={titleLink3} className="h2 text-inside"></p>
              <p ref={textLink3} className="h3 text-aside"></p>
            </a>
          </li>
        </ul>
      </div>
    );
}

export { BannerIndex }
