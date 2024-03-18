//controler qui permet d' effacer un avis

//import des librairies
// eslint-disable-next-line no-undef
const fs = require("fs");

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

  //si une url est trouvé on supprime le fichier image correspondant
  console.log("resultat url: " + requestResultUrl.length);
  if (requestResultUrl.length > 0) {
    console.log("resultat url-2: " + requestResultUrl.length);
    let avatarUrl = "images/" + requestResultUrl[0]["url_img"];

    console.log("url de la bdd + /images : " + avatarUrl);
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

  

  if (requestResult) {
    res.status(500).json({ message: "impossible de suprimer l'avis" });
  }

  res.status(201).json({ message: "avis supprimé" });
}

function deleteOneAvis(req, res) {
  globalDeleteOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
