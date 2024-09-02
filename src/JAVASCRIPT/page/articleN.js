//scrip commun a toute les page contenent un article
//permet de recuperer les photo correspondant a l' article.

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;

function getArticleId() {
    let articleId = localStorage.getItem("articleId");
    if (articleId) {
        localStorage.removeItem("articleId");
        return articleId
    }
    else {
        return null
    }
}


function getArticleImage(articleId) {
    return null
}

const getAllArticle = async () => {
  try {
    const response = await fetch(`${url}/onearticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`, // Décommentez et utilisez le token si nécessaire
      },
    });

    // Vérifie si la réponse est correcte
    if (response.ok) {
      const result = await response.json();
      return result
      
    } else {
      
      console.error("Failed to fetch articles: ", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching articles: ", error);
    
  }
};



function extractUrlImage(resultFetch) {
    
}