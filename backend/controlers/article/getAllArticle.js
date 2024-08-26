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
    const requestResult = await sendRequest(
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

    //modification du contenu de la requete on envoi une seule image
    
    let resultParsed = JSON.parse(requestResult[0].url_img);
    console.log("contenu de la requette get image 1: " + resultParsed[0])
    resultParsed = [resultParsed[0]];
    //let resultParsedString = JSON.stringify[resultParsed[0]];
    console.log("tableau finally :" + resultParsed);

    return res.status(200).json(requestResult);
  } catch (error) {
    console.error("Erreur lors de la récupération des avis: ", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  } 
}

// eslint-disable-next-line no-undef
module.exports = getAllArticle;
