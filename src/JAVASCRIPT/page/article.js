import {defineUrlCSSForArticle} from "../../UTILS/fonctions/testEnvironement.js"



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

function setUrlImage(imagearray) {
    let elementsImg = document.querySelectorAll("img");
    let images = imagearray.image;

  if (elementsImg.length > 1) {
    elementsImg.forEach((img, index) => {
      img.setAttribute("src", images[index]);
    });
  }
}

//script principal

let url = defineUrlCSSForArticle();

setUrlHeaderLink(url);

let objectUrlImage = decodeParams();

setUrlImage(objectUrlImage);
