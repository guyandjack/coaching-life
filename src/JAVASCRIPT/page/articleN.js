import {defineUrlCSSForArticle} from "../../UTILS/fonctions/testEnvironement.js"

import { isXLargeScreen } from "../../UTILS/fonctions/isScreenMobil.js";



function displayOrHideMenuSide() {
  let menuSide = document.querySelector(".container-menu-side");
  let result = isXLargeScreen();
  if (result) {
    console.log("is xlarge scereen : " + result)
    menuSide.classList.remove("hide");
  }
  if (!result) {
    console.log("is xlarge scereen : " + result)
    menuSide.classList.add("hide");
  }
}



function setMenuSide(objectArticle) {
  let titleMenuSide = document.querySelector(".title-menu-side");
  let linkBackMenuSide = document.querySelector(".menu-side-li-retour-a");
  let titleMenuSideContent = "";
  let linkBackMenuSideContent = "";
  switch (objectArticle.country) {
    case "fr-FR":
      titleMenuSideContent = "Dans cet article"
      linkBackMenuSideContent = "Retour à la liste d'article"
      break;
    case "en-EN":
      titleMenuSideContent = "In this article"
      linkBackMenuSideContent = "Back to the articles list"
      break;
    case "de-DE":
      titleMenuSideContent = "in diesem Artikel";
      linkBackMenuSideContent = "Zurück zur Artikelliste";
      break;
  
    default:
      break;
  }

  titleMenuSide.textContent = titleMenuSideContent;
  linkBackMenuSide.textContent = linkBackMenuSideContent
  
}


/**
 * creer un menu en fonction du nombre de sous titre
 *
 */
function setLinkMenuSide() {
  let menuSide = document.querySelector(".menu-side");
  let arrayUnderTitleH2 = document.querySelectorAll("h2");
  arrayUnderTitleH2.forEach((titleH2, index) => {
    titleH2.setAttribute("id", `ST-${index}`)
  })

  //crer et ajoute les liens en fonction des sous titres
  arrayUnderTitleH2.forEach((undertitle, index) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let valueH2 = undertitle.textContent;

    li.setAttribute("class", "menu-side-li");
    a.setAttribute("href", `#ST-${index}`);
    a.setAttribute("class", "menu-side-li-a");
    a.textContent = valueH2;
    li.appendChild(a);
    menuSide.appendChild(li);
        
  })

  //creer un dernier lien pour un retour a la liste des articles
   let li = document.createElement("li");
  let a = document.createElement("a");
   li.setAttribute("class", "menu-side-li-retour");
   a.setAttribute("href", `#`);
   a.setAttribute("class", "menu-side-li-retour-a");
   a.textContent = "retour a la liste";
   li.appendChild(a);
   menuSide.appendChild(li);
}


function formatDate(objectArticle) {
  let dateStr = objectArticle.created;
  let languageCode = objectArticle.country;

  // Convertir la chaîne de date en un objet Date
  const date = new Date(dateStr);

  console.log("language code: " + languageCode)

  // Formater la date en fonction de la langue 
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString(languageCode, options);

  return formattedDate;
}

function insertArticleDate(objectArticle) {
  let spanDate = document.querySelector("#article-date");
  let formatedDate = formatDate(objectArticle);
  spanDate.textContent = formatedDate;
}


function setUrlHeaderLink(urlBaseCSS) {
  let linkNormelise = document.querySelector("#link-normalise");
  let linkSharedClass = document.querySelector("#link-shared-class");
  let linkArticle = document.querySelector("#link-article");

  linkNormelise.setAttribute("href", `${urlBaseCSS}normelize.css`);
  linkSharedClass.setAttribute("href", `${urlBaseCSS}shared-class.css`);
  linkArticle.setAttribute("href", `${urlBaseCSS}articleN.css`);
}

/**
 * retourne un objet qui contient les informations sur l' article.(id, urlImage) ou null
 *
 * @return {object || null} un objet ou null
 */
function decodeParams() {
  // Création d'un objet URLSearchParams à partir de la query string de l'URL
  let params = new URLSearchParams(window.location.search);

  // Récupération du paramètre "articleinfo"
  let articleInfoString = params.get("articleinfo");

  if (articleInfoString) {
    try {
      // Décodage et conversion de la chaîne JSON en objet JavaScript
      let articleInfo = JSON.parse(decodeURIComponent(articleInfoString));
      console.log("Article Info:", articleInfo);
      return articleInfo;
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'objet JSON:", error);
      return null;
    }
  } else {
    console.log("Aucune information d'article trouvée dans l'URL.");
    return null;
  }
}

function setUrlImage(objectArticle) {
    let elementsImg = document.querySelectorAll("img");
    let images = objectArticle.image;

  if (elementsImg.length > 0) {
    elementsImg.forEach((img, index) => {
      img.setAttribute("src", images[index]);
    });
  }
}

//script principal

displayOrHideMenuSide();
window.addEventListener("resize", displayOrHideMenuSide);


let url = defineUrlCSSForArticle();

setUrlHeaderLink(url);

let objectArticle = decodeParams();

setUrlImage(objectArticle);
insertArticleDate(objectArticle);

setLinkMenuSide(objectArticle);
setMenuSide(objectArticle);


  

  



