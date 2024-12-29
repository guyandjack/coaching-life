//composant "CardTestimonialContainer"
import { useEffect, useRef, useState } from "react";

//import ds composants enfants
import { ReactSVG } from "react-svg";
import { CardTestimonial } from "../../COMPONENTS/card/cardTestimonial.jsx";
import { Spinner } from "../../COMPONENTS/spinner/spinner.jsx";

//import des functions
import { getPageLanguage } from "../../UTILS/fonctions/checkPageLanguage.js";
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des images
import chevronLeft from "../../assets/icons/chevron_left.svg";
import chevronRight from "../../assets/icons/chevron_right.svg";

//import des feuilles de style
import "../../style/CSS/card-testimonial-container.css";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;
let language = getPageLanguage();

//declaration des fonctions

// Fonction pour récupérer les avis
const getAllAvis = async () => {
  try {
    const response = await fetch(`${url}/avis`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Vérifie si la réponse est correcte
    if (response.ok) {
      const result = await response.json();
      //deserialise le tableau contenent l' url de lavatar

      result.forEach((avis) => {
        if (avis.url_img != null) {
          avis.url_img = JSON.parse(avis.url_img);
        }
      });
      return result;
    } else {
      console.error("Failed to fetch avis: ", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching avis: ", error);
    return [];
  }
};

function modulo(index) {
  return (index + 1) % 2 === 0;
}

function getTestimonialText(language, card) {
  switch (language) {
    case "fr":
      return card.content;
    case "en":
      return card.content_en;
    case "de":
      return card.content_de;
    default:
      return null;
  }
}

function nextAvis(container, distance) {
  container.scrollBy({
    left: distance,
    behavior: "smooth", // Animation fluide
  });
}

function prevAvis(container, distance) {
  container.scrollBy({
    left: -distance,
    behavior: "smooth", // Animation fluide
  });
}

function CardTestimonialContainer() {
  const [arrayAvis, setArrayAvis] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const nextArrow = useRef(null);
  const prevArrow = useRef(null);
  const avisList = useRef(null);
  const testimonialSliderLi = useRef(null);

  useEffect(() => {
    const fetchAvis = async () => {
      setIsVisible(true); // Affiche le spinner
      try {
        const avis = await getAllAvis();
        // Attendre la récupération des avis
        //trie les avis en fonction de la langue de la page

        setArrayAvis(avis); // Met à jour l'état avec les avis récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      } finally {
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    };

    fetchAvis(); // Appel de la fonction pour récupérer les avis
  }, []); // [] assure que l'effet se déclenche seulement au montage

  useEffect(() => {
    let chevronNext = nextArrow.current;
    let chevronPrev = prevArrow.current;
    
    function updateDistance() {
      if (testimonialSliderLi.current) {
        return testimonialSliderLi.current.offsetWidth;
      }
      return 0;
    }

    function handlePrevClick() {
      const distance = updateDistance();
      prevAvis(avisList.current, distance);
      checkScrollPosition(500);
    }

    function handleNextClick() {
      const distance = updateDistance();
      nextAvis(avisList.current, distance);
      checkScrollPosition(500);
    }

    function checkScrollPosition(delay) {

      setTimeout(() => {
        
        let actualPosition = parseInt(avisList.current.scrollLeft);
        let totalWidth = parseInt(avisList.current.scrollWidth);
        let widthView = parseInt(avisList.current.clientWidth);

        console.log("position actuelle: " + actualPosition);
        console.log("largeur totale:  " + totalWidth);
        console.log("largeur visible:" + widthView);
  
  
        if (actualPosition == 0) {
          //scroll au debut
          chevronPrev.disabled = true;
          chevronNext.disabled = false;
        }
        else if (actualPosition + widthView >= totalWidth) {
          chevronNext.disabled = true;
          chevronPrev.disabled = false;
        }
        else {
          chevronPrev.disabled = false;
          chevronNext.disabled = false;
          
        }
      }, delay);
    }

    // Initial setup
    if (chevronPrev && chevronNext) {
      chevronPrev.addEventListener("click", ()=>{
        chevronPrev.blur();
        handlePrevClick()});
      chevronNext.addEventListener("click", ()=>{
        chevronNext.blur();
        handleNextClick()});
    }

    // Handle resize events
    const handleResize = () => {
      const distance = updateDistance(); // This ensures the correct distance is used
      console.log("Distance recalculated on resize:", distance);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      if (chevronNext && chevronPrev) {
        chevronPrev.removeEventListener("click", handlePrevClick);
        chevronNext.removeEventListener("click", handleNextClick);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex-column-start-center card-testimonial-container">
      {isVisible ? <Spinner visible={isVisible} /> : null}
      <div className="flex-row-space_between-center container-chevron relative">
        <button
          ref={prevArrow}
          type="button"
          className="btn-arrow"
          aria-label="Scroll to previous items"
          disabled
          
        >
          <ReactSVG
            src={chevronLeft}
            beforeInjection={(svg) => {
              svg.classList.add("testimonial-chevron");
            }}
          />
        </button>
        <button
          ref={nextArrow}
          type="button"
          className="btn-arrow"
          aria-label="Scroll to next items"
          
        >
          <ReactSVG
            src={chevronRight}
            beforeInjection={(svg) => {
              svg.classList.add("testimonial-chevron");
            }}
          />
        </button>
      </div>
      {arrayAvis.length > 0 ? (
        <ul ref={avisList} className="flex-row-start-center testimonial-slider">
          {arrayAvis.map((card, index) => (
            <li key={card.id} ref={testimonialSliderLi}>
              <CardTestimonial
                avatarUrl={card.url_img}
                testimonialText={getTestimonialText(language, card)}
                testimonialLastName={card.last_name}
                testimonialFirstName={card.first_name}
                themeColor={modulo(index)}
              />
            </li>
          ))}
        </ul>
      ) : (
        !isVisible && <div>Aucun avis à afficher</div> // Affiche ce message uniquement si le spinner est caché
      )}
    </div>
  );
}

export { CardTestimonialContainer };

