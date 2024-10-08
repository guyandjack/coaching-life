//controler qui permet d' effacer un avis

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const fs = require("fs").promises;
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
const checkEnv = require("../../utils/functions/checkEnvironement.js");


// eslint-disable-next-line no-unused-vars
let urlbase = checkEnv.defineUrl();




async function deleteOneAvis(req, res) {
  const avisId = req.body.id;
  let connect = await connectToDataBase(connectionConfig);

  let tabErrorDeleteFile = [];

  //requette préparé de type select
  
  try {
    const requeteSelectUrl = `SELECT url_img FROM avis WHERE id = ?`;
    const paramRequeteSelectUrl = [avisId];

    const result = await sendRequest(
      connect,
      requeteSelectUrl,
      paramRequeteSelectUrl
    );

    if (!result) {
      return res
        .status(500)
        .json({ message_status: "Une erreur est survenue lors de la requête" });
    }
   
    
    console.log("avis result[0] : " + result[0]);
    //console.log("avis result : " + result);
    console.log("avis result url_img: " + result[0].url_img);

    if (result[0].url_img != null) {
      //deserialise le tableau contenent l' url de l' image
      result[0].url_img = JSON.parse(result[0].url_img);

      //supression du fichier image
      let url = result[0].url_img[0];
      console.log("url de la reponse :" + url);
      console.log("type de la reponse :" + typeof url);
      try {
        const cleanUrl = url.split(/3000[/\\]/)[1].trim();
        console.log("cleanUrl: " + cleanUrl);
        await fs.rm(cleanUrl);
        console.log(`Fichier image ${cleanUrl} supprimé avec succès.`);
      } catch (err) {
        tabErrorDeleteFile.push(`Impossible de supprimer l'image ${url}`);
        console.error(`Erreur lors de la suppression de l'image ${url}:`, err);
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête :", error);
    res
      .status(500)
      .json({ message_status: "Erreur interne lors de la requête" });
  }

  if (tabErrorDeleteFile.length > 0) {
    return res
      .status(500)
      .json({
        message:
          "Erreur lors de la suppression de l'avatar dans son repertoir",
        error: tabErrorDeleteFile
      });
  }
  
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
          .json({ message: "Impossible de supprimer l'avisssss" });
      }

      res.status(200).json({ message_status: "succes" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      res
        .status(500)
        .json({ message: "Erreur interne lors de la suppression de l'avis" });
    }
  

}



// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
