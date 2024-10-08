// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

// eslint-disable-next-line no-undef
//const hash = require("../user/generateHash.js");

/**
 * Contrôleur pour récupérer tous les avis de la base de données.
 * @param {*} req - Objet requête HTTP.
 * @param {*} res - Objet réponse HTTP.
 */
async function getAllAvis(req, res) {
   
 // hash("adminrootwebmasteR77!");

  const requeteGetAllAvis = `SELECT * FROM avis`;
  const paramRequeteGetAllAvis = [];

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
      requeteGetAllAvis,
      paramRequeteGetAllAvis
    );

    if (!requestResult || requestResult.length === 0) {
      connect.end();
      return res.status(404).json({ message: "Aucun avis trouvé" });
    }

    // Retourne les avis avec un statut HTTP 200
    connect.end();
    //console.log("type de request resulut getallavis: " + typeof requestResult[0].url_img)
    return res.status(200).json(requestResult);
  } catch (error) {
    console.error("Erreur lors de la récupération des avis: ", error.message);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  } /* finally {
    if (connect) {
      connect.end(); // Assure que la connexion est fermée même en cas d'erreur
    }
  } */
}

// eslint-disable-next-line no-undef
module.exports = getAllAvis;
