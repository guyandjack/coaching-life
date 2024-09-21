
import { useEffect } from "react"

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

// composant banner page accueil
import "../../style/CSS/index-banner.css"


//declaration des fonctions
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



function BannerIndex() {
    
    useEffect(() => {
      //determine l' url entre dev et prod
      let objectUrl = localOrProd();
      let url = objectUrl.url;
      setUrlLink(url);
      return () => {};
    }, []);

    return (
      <div className="flex-column-start-center banner-container ">
        <h1 className="h1 banner-title">
          
          {"Révéler les ressources de l'être humain"}
        </h1>
        

        <ul className="flex-column-space_evenly-center link-container">
          <li>
            <a id="vie" className="flex-column-center-center link-cta" href="#">
              <p className="h2 text-inside">Coaching de vie</p>
              <p className="h3 text-aside">Trouvez votre équilibre</p>
            </a>
          </li>
          <li>
            <a
              id="carriere"
              className="flex-column-center-center link-cta"
              href="#"
            >
              <p className="h2 text-inside">Coaching de carriére</p>
              <p className="h3 text-aside">Libérez votre potentiel</p>
            </a>
          </li>

          <li>
            <a
              id="entreprise"
              className="flex-column-center-center link-cta"
              href="#"
            >
              <p className="h2 text-inside">Consulting en entreprise</p>
              <p className="h3 text-aside">Management et RH</p>
            </a>
          </li>
        </ul>
      </div>
    );
}

export { BannerIndex }
