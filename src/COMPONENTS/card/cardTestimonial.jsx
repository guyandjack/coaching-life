/* eslint-disable react/prop-types */
import { ReactSVG } from "react-svg";

import Avatar, { ConfigProvider } from "react-avatar";

import {colorsRule} from "../../JAVASCRIPT/colorsrule/colorsRule.js"

//import des fonctions
//import { getCardContentResume } from "../../UTILS/fonctions/styleLinkCardResume.js";

//import des feuilles de style
import "../../style/CSS/card-testimonial.css";

// eslint-disable-next-line react/prop-types
function CardTestimonial({
  avatarUrl,
  testimonialText,
  testimonialLastName,
  testimonialFirstName,
  themeColor,
}) {
  let lastname = testimonialLastName.split("")[0].toUpperCase();
  let bigFirstLetter = testimonialFirstName.slice(0, 1).toUpperCase(); // Prend le premier caractère et le met en majuscule
  let restOfString = testimonialFirstName.slice(1); // Prend le reste de la chaîne à partir du deuxième caractère
  let firstname = bigFirstLetter + restOfString; // Combine la première lettre en majuscule avec le reste de la chaîne

  return (
    <ConfigProvider>
      <div className="flex-column-start-center card-testimonial">
        <div className="flex-row-center-center testimonial-container-avatar">
          {avatarUrl !== null ? (
            <img
              className={
                themeColor
                  ? "testimonial-avatar border-second-color"
                  : "testimonial-avatar border-fourth-color"
              }
              src={avatarUrl}
              alt="avatar du clients content"
            />
          ) : (
            <Avatar
              name={`${testimonialLastName}` + " " + `${testimonialFirstName}`}
              round={true}
              size="100px"
              color={
                themeColor
                  ? `${colorsRule.secondColor}`
                  : `${colorsRule.fourthColor}`
              }
            />
          )}
        </div>
        <div className="flex-row-center-center testimonial-container-text">
          <p className="testimonial-text">{testimonialText}</p>
        </div>
        <div className="flex-row-start-center testimonial-container-info">
          <span className="testimonial-lastname">
            <span
              className={
                themeColor ? "hook hook-color-second" : "hook hook-color-fourth"
              }
            >
              {"["}
            </span>
            {firstname}
          </span>
          <span className="testimonial-firstname">
            {"." + lastname}
            <span
              className={
                themeColor ? "hook hook-color-second" : "hook hook-color-fourth"
              }
            >
              {"]"}
            </span>
          </span>
        </div>
        <ReactSVG
          className={
            themeColor
              ? "testimonial-quote quote-color-second"
              : "testimonial-quote quote-color-fourth"
          }
          src="/src/assets/design/quote.svg"
        />
      </div>
    </ConfigProvider>
  );
}

export { CardTestimonial };
