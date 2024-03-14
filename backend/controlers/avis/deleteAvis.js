//controler qui permet d' effacer un avis

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des fonctions
async function getAvisId(bodyparsed) {
  return bodyparsed.id;
}

async function globalDeleteOneAvis(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }

  let bodyParsed = JSON.parse(req.body.datadelete);

  const avisId = await getAvisId(bodyParsed);

  //requette preparéé de type delete
  const requeteDeleteAvis = `DELETE FROM avis WHERE id = ?`;
  const paramRequetedeleteAvis = avisId;

  let connect = await connectToDataBase(connectionConfig);

  const requestResult = await sendRequest(
    res,
    connect,
    requeteDeleteAvis,
    paramRequetedeleteAvis
  );

  connect.end();

  if (!requestResult) {
    res.status(500).json({ message: "impossible de suprimer l' avis" });
  }
  res.status(201).json({ message: "avis supprimé" });
}

function deleteOneAvis(req, res) {
  globalDeleteOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = deleteOneAvis;
