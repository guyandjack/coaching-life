// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

/**
 * Contrôleur pour récupérer tous les articles de la base de données.
 * @param {*} req - Objet requête HTTP.
 * @param {*} res - Objet réponse HTTP.
 */
async function getAllArticle(req, res) {
  const requeteGetAllArticle = `SELECT * FROM article`;

  const paramRequeteGetAllArticle = [];

  try {
    // Connexion à la base de données
    const connect = await connectToDataBase();

    if (!connect) {
      return res
        .status(500)
        .json({ message: "Impossible de se connecter à la base de données" });
    }

    // Exécution de la requête préparée
    let requestResult = await sendRequest(
      connect,
      requeteGetAllArticle,
      paramRequeteGetAllArticle
    );

    if (!requestResult || requestResult.length < 1) {
      connect.end();
      return res.status(404).json({ message: "Aucun article trouvé" });
    }

    // Retourne les avis avec un statut HTTP 200
    connect.end();

    //modification du contenu de la requete on envoi une seule image pour le front end la premiere du tableau d'image

    // eslint-disable-next-line no-unused-vars
    /* requestResult.forEach((article, index) => {
       
      let tabUrlClean;
            // eslint-disable-next-line no-useless-escape
       if (article.url_img.startsWith("[")) {
         
         tabUrlClean = article.url_img.split('["')[1].split('"')[0];
         article.url_img = tabUrlClean;
            
            console.log("tab of url img : " + tabUrlClean)
            
            console.log("article urlimg :  " + article.url_img)
         }
    }) */
    
    return res.status(200).json(requestResult);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles: ", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  } 
}

// eslint-disable-next-line no-undef
module.exports = getAllArticle;
