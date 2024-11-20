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
    };

    let infoarticle = JSON.stringify(articleInfo);

    localStorage.setItem("articleInfo", infoarticle);

   /*  // Sérialise et encode uniquement articleInfo pour l'URL
    let info = JSON.stringify(articleInfo);
    let encodedInfo = encodeURIComponent(info); */

    // Génère l'URL sans encodage de urlBase ou articlePath
    //location.href = `${urlBase}/${articlePath}/?articleinfo=${encodedInfo}`;
    location.href = `${urlBase}/${articlePath}`;
    console.log("articlepath: " + articlePath);
    
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

