/// composant carte clients pour la page article
// eslint-disable-next-line no-unused-vars
//import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import "../../style/CSS/card-article-client.css";
//import "../../style/CSS/form-dashboard.css";

// eslint-disable-next-line react/prop-types
function CardArticleClient({ articlePath, titre, imgUrl, resume, id, arrayImgUrl }) {

  function storeId() {
    let articleInfo = {
      id: id,
      image: arrayImgUrl
    }
    localStorage.setItem("articleInfo", JSON.stringify(articleInfo));
    //window.location.href = articlePath;
    console.log("articlepath: " + articlePath)
  }
  return (
    <div
      
      className="flex-column-start-center card-article-client"
      onClick={() => {
        storeId();
      }}    
    >
      <div className="container-image-client relative">
        <img className="card-article-client-image" src={imgUrl}></img>
         <span className="card-article-title">{titre}</span> 
      </div>
      <div className="card-article-client-content">
        <p>
          {resume}
          
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-undef
export { CardArticleClient };
