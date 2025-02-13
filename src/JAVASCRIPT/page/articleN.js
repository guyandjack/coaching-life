//import {defineUrlCSSForArticle} from "../../UTILS/fonctions/testEnvironement.js"

import { isXLargeScreen } from "../../UTILS/fonctions/isScreenMobil.js";

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import { smoothScroll } from "../../UTILS/fonctions/scrollInView.js";


//import { getPageLanguage } from "../../UTILS/fonctions/checkPageLanguage.js";

const divData = document.querySelector("#info-href");

/*const refLangDE = document.querySelector("link[hreflang='de']");
const refLangEN = document.querySelector("link[hreflang='en']");
const refLangFR = document.querySelector("link[hreflang='fr']");
const refLangDefault = document.querySelector("link[hreflang='x-default']");*/

let objectUrl = localOrProd();
let url = objectUrl.url;

divData.setAttribute("data-de", `${url}/public/de/artikel-coaching-personale-entwicklung-unternehmen.html`);
divData.setAttribute("data-en", `${url}/public/en/article-coaching-personal-development-company.html`);
divData.setAttribute("data-fr", `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`);

/*refLangDE.setAttribute("href", `${url}/public/de/artikel-coaching-personale-entwicklung-unternehmen.html`);
refLangEN.setAttribute("href", `${url}/public/en/article-coaching-personal-development-company.html`);
refLangFR.setAttribute("href", `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`);
refLangDefault.setAttribute("href", `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`);
*/
/**
 *recupere la langue de l'article
 *
 * @param {*} objectArticle
 * @return {*}
 */
function getLanguage(objectArticle) {
  let lang = objectArticle.country;
  switch (lang) {
    case "fr-FR":
      return "fr";

    case "en-EN":
      return "en";

    case "de-DE":
      return "de";

    default:
      break;
  }
}


async function setHeadertag(articleObject) { 
  let titleTag = document.querySelector("title");
  let descriptionTag = document.querySelector("meta[name='description']");

  titleTag.textContent = articleObject.title;
  descriptionTag.setAttribute("content", articleObject.content);
}

async function loadPageArticle() {
     
  
  let articleObject = JSON.parse(localStorage.getItem("articleInfo"));
  setHeadertag(articleObject);
  let page = articleObject.page;

     try {
       
       
       // Charger le fichier HTML
       const response = await fetch(
         `${page}`
       );
       if (!response.ok) {
         throw new Error("une erreur http est survenu");
       }
       const htmlContent = await response.text();

       // Injecter le contenu HTML dans le div 
       document.getElementById("article-content").innerHTML = htmlContent;

       
     } catch (error) {
       console.error("Error loading page:", error);
     }
}
 
/**
 * re
 *
 * @return {*} 
 */
function hideMenuSideIfFooterVisible() {
  
  // element observé
  const footer = document.getElementById("RC-footer");

  // element a modifier
  const menu = document.querySelector(".container-menu-side");

  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            menu.classList.add("transition-opacity");
          } else {
            menu.classList.remove("transition-opacity");
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
       
      }
    );

  observer.observe(footer);
  
  
}


/**
 *en fonction de la taille de l'ecran affiche ou cache le menu side
 *
 * @return {*} bolean
 */
function displayOrHideMenuSide() {
  let menuSide = document.querySelector(".container-menu-side");
  let result = isXLargeScreen();
  if (!result) {
    console.log("is xlarge scereen : " + result);
    menuSide.classList.remove("hide");
    hideMenuSideIfFooterVisible();
    return true;
  }
  if (result) {
    console.log("is xlarge scereen : " + result);
    menuSide.classList.add("hide");
    return false;
  }
}

/**
 *en fonction de la langue de l' article
 defini un titre , le contenu et la destination du lien retour du menu side
 *
 * @param {*} objectArticle
 */
function setMenuSide(objectArticle) {
  let titleMenuSide = document.querySelector(".title-menu-side");
  let linkBackMenuSide = document.querySelector(".menu-side-li-retour-a");
  let titleMenuSideContent = "";
  let linkBackMenuSideContent = "";
  let linkBackMenuSideHref = "";
  switch (objectArticle.country) {
    case "fr-FR":
      titleMenuSideContent = "Dans cet article";
      linkBackMenuSideContent = "Retour à la liste d'article";
      linkBackMenuSideHref = `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`;
      break;
    case "en-EN":
      titleMenuSideContent = "In this article";
      linkBackMenuSideContent = "Back to the articles list";
      linkBackMenuSideHref = `${url}/public/en/article-coaching-personal-development-company.html`;
      break;
    case "de-DE":
      titleMenuSideContent = "in diesem Artikel";
      linkBackMenuSideContent = "Zurück zur Artikelliste";
      linkBackMenuSideHref = `${url}/public/de/artikel-coaching-personale-entwicklung-unternehmen.html`;
      break;

    default:
      break;
  }

  titleMenuSide.textContent = titleMenuSideContent;
  linkBackMenuSide.textContent = linkBackMenuSideContent;
  linkBackMenuSide.setAttribute("href", `${linkBackMenuSideHref}`);
}

/**
 * creer un menu en fonction du nombre de sous titre
 *
 */
function setLinkMenuSide() {
  let menuSide = document.querySelector(".menu-side");
  let articleContainer = document.querySelector("#article-content");
  let arrayUnderTitleH2 = articleContainer.querySelectorAll("h2");
  arrayUnderTitleH2.forEach((titleH2, index) => {
    titleH2.setAttribute("id", `ST-${index}`);
  });

  //creer et ajoute les liens en fonction des sous titres
  arrayUnderTitleH2.forEach((undertitle, index) => {
    let li = document.createElement("li");
    //let a = document.createElement("a");
    let valueH2 = undertitle.textContent;

    li.setAttribute("class", "menu-side-li");
    //a.setAttribute("href", `#ST-${index}`);
    li.setAttribute("data-link", `ST-${index}`);
    //a.setAttribute("class", "menu-side-li-a");
    //a.textContent = valueH2;
    li.textContent = valueH2;
    //li.appendChild(a);
    menuSide.appendChild(li);
  });

  
  //creer un dernier lien pour un retour a la liste des articles
  let li = document.createElement("li");
  let a = document.createElement("a");
  li.setAttribute("class", "menu-side-li-retour");
  a.setAttribute("class", "menu-side-li-retour-a");
  li.appendChild(a);
  menuSide.appendChild(li);


  smoothScroll("menu-side-li");
}

/**
 * formate la date issu de la bdd
 *
 * @param {*} objectArticle
 * @return {*}
 */
function formatDate(objectArticle) {
  let dateStr = objectArticle.created;
  let languageCode = objectArticle.country;

  // Convertir la chaîne de date en un objet Date
  const date = new Date(dateStr);

  console.log("language code: " + languageCode);

  // Formater la date en fonction de la langue
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString(languageCode, options);

  return formattedDate;
}

/**
 *inserre la date de l' article dans le dom
 *
 * @param {*} objectArticle
 */
function insertArticleDate(objectArticle) {
  let spanDate = document.querySelector(".articleN-date");
  let formatedDate = formatDate(objectArticle);
  spanDate.textContent = formatedDate;
}

function insertArticleReadTime(language) {
  let spanTime = document.querySelector(".articleN-time");
  let text = "";
  switch (language) {
    case "fr":
      text = "Temps de lecture: 3mn";
      break;
    case "de":
      text = "Zeitaufwand: 3 Minuten";
      break;
    case "en":
      text = "Reading time: 3mn";
      break;

    default:
      break;
  }
  spanTime.textContent = text;
}

function setUrlImage(objectArticle) {
  console.log("objet article:" + objectArticle);
  let elementsImg = document.querySelectorAll(".articleN-image");
  console.log("tableau des elements image: " + elementsImg);
  let images = objectArticle.image;

  if (elementsImg.length > 0) {
    elementsImg.forEach((img, index) => {
      img.setAttribute("src", images[index]);
    });
  }
}

 

function setArticle() {
  
  displayOrHideMenuSide();
  let objectArticle = JSON.parse(localStorage.getItem("articleInfo"));
  let lang = getLanguage(objectArticle);
  insertArticleDate(objectArticle);
  insertArticleReadTime(lang);
  setUrlImage(objectArticle);
  setLinkMenuSide(objectArticle);
  setMenuSide(objectArticle);
}

//script principal
(async () => {
  await loadPageArticle();
  setArticle();
  window.addEventListener("resize", displayOrHideMenuSide);
})();

