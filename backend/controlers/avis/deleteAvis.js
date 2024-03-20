//controler qui permet d' effacer un avis

//import des librairies
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const path = require("path");

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des fonctions

//recupere l' id de l' avis à effacer
async function getAvisId(req) {
  return req.params._id;
}

async function globalDeleteOneAvis(req, res) {
  const avisId = await getAvisId(req);
  let connect = await connectToDataBase(connectionConfig);

  //requette préparé de type select
  const requeteSelectUrl = `SELECT url_img FROM avis WHERE id = ?`;
  const paramRequeteSelectUrl = avisId;

  const requestResultUrl = await sendRequest(
    res,
    connect,
    requeteSelectUrl,
    paramRequeteSelectUrl
  );
  console.log("url recuperer de la bdd: " + requestResultUrl + "fin de chaine");

  //si la requete abouti à un resultat nnon null
  console.log("resultat url: " + requestResultUrl.length);
  if (requestResultUrl.length > 0) {
    console.log("resultat url-2: " + requestResultUrl.length);
    //modification du chemin de l'image a suprimer
    let avatarUrl = path.join("images/" + requestResultUrl[0]["url_img"]);

    console.log("url de la bdd + /images : " + avatarUrl);

    //suppression du fichier image
    fs.unlink(avatarUrl, (err) => {
      if (err) throw err;
      console.log(avatarUrl + " deleted");
    });
  }

  //requette preparéé de type delete
  const requeteDeleteAvis = `DELETE FROM avis WHERE id = ?`;
  const paramRequetedeleteAvis = avisId;

  const requestResult = await sendRequest(
    res,
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

function deleteOneAvis(req, res) {
  globalDeleteOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
