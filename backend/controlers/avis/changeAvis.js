//controler qui permet de modifier un avis

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des variables
let avatarPathDataBase = null;

let isValid = true;

//declaration des fonctions
async function getId(bodyparsed) {
  return bodyparsed.avisId;
}
async function getLastname(bodyparsed) {
  return bodyparsed.lastname;
}

async function getFirstame(bodyparsed) {
  return bodyparsed.firstname;
}
async function getContent(bodyparsed) {
  return bodyparsed.content;
}

async function getSocialUrl(bodyparsed) {
  if (!bodyparsed.socialurl) {
    return null;
  }
  return bodyparsed.socialurl;
}

async function globalChangeOneAvis(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }
  let bodyParsed = JSON.parse(req.body.dataupdate);

  const avisId = await getId(bodyParsed);
  console.log("id de l' avis: " + avisId);
  const lastName = await getLastname(bodyParsed);
  const firstName = await getFirstame(bodyParsed);
  const content = await getContent(bodyParsed);
  const socialUrl = await getSocialUrl(bodyParsed);

  if (req.files) {
    //recuperation de l' extension du fichier image avatar

    let avatarName = req.files.avatar.name;
    let avatarExt = avatarName.split(".").pop(); // eslint-disable-next-line no-undef

    let avatarPathDiskStorage =
      // eslint-disable-next-line no-undef
      "/images/" +
      "avatar-" +
      Date.now() +
      "-" +
      lastName +
      "-" +
      firstName +
      "." +
      avatarExt;

    avatarPathDataBase =
      // eslint-disable-next-line no-undef

      "avatar-" +
      Date.now() +
      "-" +
      lastName +
      "-" +
      firstName +
      "." +
      avatarExt;

    //enregistrement dans un fichier du serveur
    req.files.avatar.mv(avatarPathDiskStorage, (err) => {
      if (err) {
        console.log("impossible d' enregistrer l' avatar: " + err);
        res
          .status(500)
          .json({ message: "impossible d' enregistrer l' avatar" });
        isValid = false;
      }
    });
  }

  if (isValid) {
    //Requete preparée pour inserer un avis  dans la bdd avis
    const requeteChangeAvis = `
    UPDATE avis 
    SET 
    created_at = NOW(),
    content = ${content},
    first_name = ${firstName},
    last_name = ${lastName},
    social_link = ${socialUrl},
    url_img = ${avatarPathDataBase}  WHERE id= ${avisId} `;

    const paramRequeteChangeAvis = [];

    // connection à la base de donnee
    let connect = await connectToDataBase(connectionConfig);

    let requestResult = await sendRequest(
      res,
      connect,
      requeteChangeAvis,
      paramRequeteChangeAvis
    );

    connect.end();

    if (!requestResult) {
      return res.status(500).json({ message: "avis non enregistré" });
    }

    return res.status(201).json({ message: "avis enregistré" });
  }
}

function changeOneAvis(req, res) {
  globalChangeOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = changeOneAvis;
