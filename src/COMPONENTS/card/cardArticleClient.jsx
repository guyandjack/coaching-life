/* eslint-disable react/prop-types */
/// composant carte clients pour la page article

// eslint-disable-next-line no-unused-vars
//import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import "../../style/CSS/card-article-client.css";
//import "../../style/CSS/form-dashboard.css";

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
    let articleInfo = {
      id: id,
      image: arrayImgUrl,
      created: date,
      country: country,
    };

    // Sérialisation des données en JSON
    let info = JSON.stringify(articleInfo);

    // Encodage des informations pour l'URL
    let encodedInfo = encodeURIComponent(info);

    // Redirection avec les informations encodées
    window.location.href = `${articlePath}?articleinfo=${encodedInfo}`;

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
