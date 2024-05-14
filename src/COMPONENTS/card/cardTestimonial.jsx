/* eslint-disable react/prop-types */
import { ReactSVG } from "react-svg";

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
  return (
    <div className="flex-column-start-center card-testimonial">
      <div className="flex-row-center-center testimonial-container-avatar">
        <img
          className={
            themeColor
              ? "testimonial-avatar border-second-color"
              : "testimonial-avatar border-fourth-color"
          }
          src={avatarUrl}
          alt="avatar du clients content"
        />
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
          {testimonialLastName}
        </span>
        <span className="testimonial-firstname">
          {testimonialFirstName}
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
  );
}

export { CardTestimonial };
