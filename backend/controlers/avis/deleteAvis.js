//controler qui permet d' effacer un avis

//import des librairies
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");


// eslint-disable-next-line no-undef
let urlImageDEV = process.env.URL_BASE_IMAGE_ARTICLE_DEV;
//declaration des fonctions



async function deleteOneAvis(req, res) {
  const avisId = parseInt(req.body.id);
  let connect = await connectToDataBase(connectionConfig);

  let tabErrorDeleteFile = [];

  //requette préparé de type select
  
  try {
    const requeteSelectUrl = `SELECT url_img FROM avis WHERE id = ?`;
    const paramRequeteSelectUrl = [avisId];

    const response = await sendRequest(
      connect,
      requeteSelectUrl,
      paramRequeteSelectUrl
    );

    if (!response) {
      return res
        .status(500)
        .json({ message_status: "Une erreur est survenue lors de la requête" });
    }

    const result = JSON.parse(JSON.stringify(response));

    const stringUrl = result[0]?.url_img || null;

    if (stringUrl) {
      // Modification du chemin de l'image à supprimer
      const urlRelative = stringUrl.replace(urlImageDEV, "");
      console.log("URL relative de l'image : " + urlRelative);

      fs.rm(urlRelative, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          tabErrorDeleteFile.push(
            "Erreur de fichier : impossible de supprimer l'avatar"
          );
        } else {
          console.log("Fichier image supprimé avec succès.");
        }
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête :", error);
    res
      .status(500)
      .json({ message_status: "Erreur interne lors de la requête" });
  }

  
  if (tabErrorDeleteFile.length === 0) {
    try {
      // Requête préparée de type DELETE
      const requeteDeleteAvis = `DELETE FROM avis WHERE id = ?`;
      const paramRequetedeleteAvis = [avisId];

      const requestResult = await sendRequest(
        connect,
        requeteDeleteAvis,
        paramRequetedeleteAvis
      );

      connect.end();

      if (!requestResult || requestResult.affectedRows !== 1) {
        return res
          .status(500)
          .json({ message: "Impossible de supprimer l'avis" });
      }

      res.status(200).json({ message_status: "succes" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      res
        .status(500)
        .json({ message: "Erreur interne lors de la suppression de l'avis" });
    }
  }

}



// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
