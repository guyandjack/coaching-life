//import des composants enfants
import { CardArticleClient } from "./cardArticleClient";
import { Spinner } from "../../COMPONENTS/spinner/spinner.jsx";


//import des hooks
import { useEffect, useState } from "react";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";


//import des feuilles de style
import "../../style/CSS/card-article-container.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;




function whatLanguage() {
  let result = {
    articleLabelValue: "",
    languageCode: ""
  }
 
  let htmlLang = document.querySelector("html[lang]");
  let lang = htmlLang.getAttribute("lang");
  switch (lang) {
    case "fr":
      result.articleLabelValue = "Voir plus...";
      result.languageCode = "fr-FR"
      break;
    case "en":
      result.articleLabelValue = "Read more...";
      result.languageCode = "en-EN"
      break;
    case "de":
      result.articleLabelValue = "mehr lesen...";
      result.languageCode = "de-DE"
      break;

    default:
      break;
  }
  return result;
}

function cleanUrl(urlarticle) {
  let match = "";
  if (url == "https://api.socoaching.ch/api") {
    // Expression régulière pour capturer "public" ou "life" et tout ce qui suit en fonction de l'environement
    match = urlarticle.match(/public(?:\/|\\|\/\/|\\\\)(.*)/);
  } else {
    match = urlarticle.match(/life(?:\/|\\|\/\/|\\\\)(.*)/);
  }
 

 // Vérifie si la correspondance a réussi et construit le chemin final
 if (match) {
   const result = match[1];
   return result
   
 } else {
   console.log("Chemin contenant 'public' non trouvé.");
   throw new Error("Chemin contenant 'public' non trouvé.");
   
  }
  

}


 

// Fonction pour récupérer les articles
const getAllArticle = async () => {
  try {
    const response = await fetch(`${url}/article`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`, // Décommentez et utilisez le token si nécessaire
      },
    });

    // Vérifie si la réponse est correcte
    if (response.ok) {
      const result = await response.json();
      
      //deserielise les tableau de la reponse
        result.forEach((article) => {
          if (article.url_img != null) {
            article.url_img = JSON.parse(article.url_img);
          }
          if (article.url_article != null) {
            article.url_article = JSON.parse(article.url_article);
            // adapte l' url de l' article pour le navigateur
            article.url_article[0] = cleanUrl(article.url_article[0]);
            console.log("url article modifie: " + article.url_article[0]);
          }
        });
      
      
      

        return result;
        
        
    } else {
       console.error("Failed to fetch article: ", response.statusText);
       return [];
    }
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
};


function CardClientContainer() {
  const [arrayArticle, setArrayArticle] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [langValue, setLangValue] = useState();
  const [languageCode, setLanguageCode] = useState();

  useEffect(() => {
    localStorage.removeItem("articleInfo");
    return () => {
      
    };
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsVisible(true); // Affiche le spinner
      try {
        const article = await getAllArticle(); // Attendre la récupération des article
        setArrayArticle(article); // Met à jour l'état avec les article récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      } finally {
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    };

    fetchArticle(); // Appel de la fonction pour récupérer les article
  }, []); // [] assure que l'effet se déclenche seulement au montage


  useEffect(() => {
    let result = whatLanguage();
    setLangValue(result.articleLabelValue);
    setLanguageCode(result.languageCode);
  }, []);
  return (
    <div className="card-article-container">
      {isVisible ? <Spinner visible={isVisible} /> : null}
      <ul className="flex-row-space_evenly-center-wrap ">
        {arrayArticle.length > 0 ? (
          arrayArticle.map((card) => (
            <li key={card.id}>
              {" "}
              {/* Utilisez card.id si disponible */}
              <CardArticleClient
                titre={card.title}
                resume={card.resume}
                imgUrl={card.url_img[0]}
                articlePath={card.url_article[0]}
                arrayImgUrl={card.url_img}
                id={card.id}
                lang={langValue}
                date={card.created_at}
                country={languageCode}
              />
            </li>
          ))
        ) : (
          <div>{"Aucun article à afficher"}</div>
        )}
      </ul>
    </div>
  );
}

export default CardClientContainer;


// eslint-disable-next-line no-undef
export { CardClientContainer };

