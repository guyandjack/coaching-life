
// script principal

import { localOrProd } from "../../../UTILS/fonctions/testEnvironement.js";

const divData = document.querySelector("#info-href");

const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-de", `${url}/public/de/startseite.html`);
divData.setAttribute("data-en", `${url}/public/en/home.html`);
divData.setAttribute("data-fr", `${url}/index.html`);

refLangDE.setAttribute("href", `${url}/public/de/startseite.html`);
refLangEN.setAttribute("href", `${url}/public/en/home.html`);
refLangFR.setAttribute("href", `${url}/index.html`);
refLangDefault.setAttribute("href", `${url}/index.html`);


/***********permet de declencher les animation lorsque l' element est visible*****
 * ******************************************************************************/
function animation() {
  

  //attends que le contenu du DOM soit charge sur la page
  document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
      root: null, // null signifie que l'élément sera observé par rapport au viewport
      rootMargin: "0px",
      threshold: 0.2, // 10% de l'élément doit être visible pour déclencher l'observation
    };

    //declaration du construxteur intersectionviewer
    const observerArticle = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("transition-article");
          observer.unobserve(entry.target); // arrêter d'observer une fois que la classe est ajoutée
        }
      });
    }, observerOptions);

    // Sélectionner les éléments pour la transition article
    const elementsArticle = document.querySelectorAll(".link-article");
    elementsArticle.forEach((element) => {
      observerArticle.observe(element);
    });

    //declaration du construxteur intersectionviewer
    const observerText = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("transition-text");
          observer.unobserve(entry.target); // arrêter d'observer une fois que la classe est ajoutée
        }
      });
    }, observerOptions);

    // Sélectionner les éléments pour la transition text
    const elementsText = document.querySelectorAll(
      ".container-text-2, .container-text-3"
    );
  
    elementsText.forEach((element) => {
      observerText.observe(element);
    });
  });

}

animation();

export {animation}
