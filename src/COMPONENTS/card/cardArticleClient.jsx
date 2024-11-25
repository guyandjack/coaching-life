/* eslint-disable react/prop-types */
/// composant carte clients pour la page article

// eslint-disable-next-line no-unused-vars
import "../../style/CSS/card-article-client.css";
//import "../../style/CSS/form-dashboard.css";

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
//declaration des functions
let objectUrl = localOrProd();
let urlBase = objectUrl.url;
// eslint-disable-next-line react/prop-types
import { getPageLanguage } from "../../UTILS/fonctions/checkPageLanguage.js";

function getPageArticleLanguage() {
  let lang = getPageLanguage();
  let urlPageArticle = "";
  switch (lang) {
    case "fr":
      urlPageArticle = `${urlBase}/public/fr/article-propose-par-so-coaching.html`;
      break;
    case "en":
      urlPageArticle = "article-propose-par-so-coaching.html"
      break;
    case "de":
      urlPageArticle = "article-propose-par-so-coaching.html"
      break;
  
    default:
      break;
  }
  return urlPageArticle
}

function CardArticleClient({
  articlePath,
  titre,
  imgUrl,
  resume,
  id,
  arrayImgUrl,
  lang,
  date,
  country,
}) {
  function goToArticle() {
    // Corrige les barres obliques inverses dans articlePath
    //articlePath = articlePath.replace(/\\/g, "/");

    
    let articleInfo = {
      id: id,
      image: arrayImgUrl,
      created: date,
      country: country,
      page: articlePath,
      title: titre,
      content: resume
    };
    
    let titreValid = articleInfo.title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
    let infoarticle = JSON.stringify(articleInfo);

    localStorage.setItem("articleInfo", infoarticle);

   /*  // Sérialise et encode uniquement articleInfo pour l'URL
    let info = JSON.stringify(articleInfo);
    let encodedInfo = encodeURIComponent(info); */

    // Génère l'URL sans encodage de urlBase ou articlePath
    //location.href = `${urlBase}/${articlePath}/?articleinfo=${encodedInfo}`;
    /*** pour une page existante**** */
    //location.href = `${urlBase}/${articlePath}`;
    
    /*** pour une page a uploader du derveur **** */
    
    let urlPage = getPageArticleLanguage();
    location.href = `${urlPage}#${titreValid}`;
    
    
    
  }
  
  

  return (
    <div
      className="flex-column-start-center card-article-client"
      onClick={() => {
        goToArticle();
      }}
    >
      <div className="container-image-client relative">
        <img className="card-article-client-image" src={imgUrl}></img>
        <span className="card-article-title">{titre}</span>
        <div className="card-article-label">{lang}</div>
      </div>
      <div className="card-article-client-content">
        <p>{resume}</p>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-undef
export { CardArticleClient };

