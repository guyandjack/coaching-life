//controler qui permet de recuperer tous les avis

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des variables
//let dataAvis = [];

//let avatarImg = [];

async function globalGetAllAvis(req, res) {
  //requete préparer pour recuperrer tous les avis
  const requeteGetAllAvis = `SELECT
    id,
    content,
    first_name,
    last_name,
    social_link,
    url_img   FROM avis `;

  const paramRequeteGetAllAvis = [];

  // connection à la base de donnee
  let connect = await connectToDataBase(connectionConfig);

  let requestResult = await sendRequest(
    res,
    connect,
    requeteGetAllAvis,
    paramRequeteGetAllAvis
  );

  connect.end();

  if (!requestResult) {
    return res
      .status(500)
      .json({ message: "impossible de recuperer les avis" });
  }

  return res.status(200).json(requestResult);
}

function getAllAvis(req, res) {
  globalGetAllAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = getAllAvis;
