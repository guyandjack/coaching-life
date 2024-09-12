// Importations nécessaires
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { colorsRule } from "../../JAVASCRIPT/colorsrule/colorsRule.js";

//import composant enfants
import { ColorRing } from "react-loader-spinner";

//import des styles
import "../../style/CSS/spinner.css";


/**
 * -le loader doit s' afficher:
 * 1- jusqu au chargement final de toute les ressources.
 * 2- lorsque q'une requete fetch est effectuee vers le backend (login, get avis, getarticle)
 * 
 *
 * @return {*} 
 */
function Spinner() {
  const [isVisible, setIsVisible] = useState(true);

  const hideLoader = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    // Fonction pour cacher le spinner

    // Fonction pour exécuter le hideLoader après un délai de 500ms une fois que la page est complètement chargée
    const handleLoad = () => {
      setTimeout(hideLoader, 500);
    };

    // Ajoute l'écouteur de l'événement "load"
    window.addEventListener("load", handleLoad);

    //si le loader reste visible suite a un bug
    setTimeout(hideLoader, 1500);


    // Nettoyage de l'événement pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

 

  return (
    <div>
      {isVisible && (
        <div className="flex-column-center-center spinner">
          <ColorRing
            visible={isVisible}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={[
              `${colorsRule.firstColor}`,
              `${colorsRule.secondColor}`,
              `${colorsRule.thirdColor}`,
              `${colorsRule.fourthColor}`,
              `${colorsRule.fifthColor}`,
            ]}
          />
          <div className="spinner-text">Loading...</div>
        </div>
      )}
    </div>
  );
}

export { Spinner };

