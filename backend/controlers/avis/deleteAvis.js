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
  const avisId = req.body._id;
  let connect = await connectToDataBase(connectionConfig);

  let tabErrorDeleteFile = [];

  //requette préparé de type select
  const requeteSelectUrl = `SELECT url_img FROM avis WHERE id = ?`;
  const paramRequeteSelectUrl = [avisId];

  const response = await sendRequest(
    connect,
    requeteSelectUrl,
    paramRequeteSelectUrl
  );
  
  if (response == null) {
    res
      .status(500)
      .json({ message_status: "une erreur est survenue lors de la requete" });
  }

  let result = await response.json();

  //si la requete abouti à un resultat nnon null
  let objectResult = JSON.parse(JSON.stringify(result));
  let stringUrl = objectResult[0].url_img?  objectResult[0].url_img : null;
  
  if (stringUrl !== null) {
      
    //modification du chemin de l'image a suprimer
    let urlRelative = stringUrl.replace(urlImageDEV, "");
    console.log(" url relative  de image: " + urlRelative);
    fs.rm(urlRelative, (err) => {
      if (err) {
        console.error("Erreur lors de la suppression du fichier :", err);
        tabErrorDeleteFile.push("error file: impossible de suprimer avatar");
      } else {

        console.log("Fichier image supprimé avec succès.");
        //res.status(500).json({ message: "impossible le fichier image l'avis" });
      }
    }); 
    }
  
  if (tabErrorDeleteFile.length < 1) {
    //requette preparéé de type delete
    const requeteDeleteAvis = `DELETE FROM avis WHERE id = ?`;
    const paramRequetedeleteAvis = [avisId];

    const requestResult = await sendRequest(
      connect,
      requeteDeleteAvis,
      paramRequetedeleteAvis
    );

    connect.end();

    //si l'objet result de la requete delete n' existe pas
    if (!requestResult) {
      res.status(500).json({ message: "impossible de suprimer l'avis" });
    }

    //si nombre de ligne affectées ets differents de 1
    if (requestResult["affectedRows"] !== 1) {
      res.status(500).json({ message: "impossible de suprimer l'avis" });
    }
    //console.log("objet retour delete: " + Object.entries(requestResult));
    res.status(200).json({ message: "avis supprimé" });
  } 
}



// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
