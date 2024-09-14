// Importations nécessaires
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { colorsRule } from "../../JAVASCRIPT/colorsrule/colorsRule.js";

//import composant enfants
import { ColorRing } from "react-loader-spinner";

//import des styles
import "../../style/CSS/spinner.css";


function Spinner() {
  
  return (
    <div>
       
        <div className="flex-column-center-center spinner">
          <ColorRing
            //visible={isVisible}
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
          {/* <div className="spinner-text">Loading...</div> */}
        </div>
      
    </div>
  );
}

export { Spinner };

