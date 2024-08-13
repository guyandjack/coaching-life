// Importations nécessaires
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { colorsRule } from "../../JAVASCRIPT/colorsrule/colorsRule.js";

//import composant enfants
import { ColorRing } from "react-loader-spinner";

//import des styles
import "../../style/CSS/spinner.css";

// Composant de Spinner
function Spinner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cacher le spinner lorsque la page est complètement chargée

    function hideLoader() {
      setIsVisible(true);
    }

    window.addEventListener("load", () => {
      setTimeout(hideLoader, 1000);
    });

    // Nettoyage de l'événement pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener("load", () => setTimeout(hideLoader, 1000));
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
            //colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
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
