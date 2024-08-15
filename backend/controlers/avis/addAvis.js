//controler qui permet d' ajouter un avis

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const crypt = require("bcrypt");
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

//import des fonctions
// eslint-disable-next-line no-undef
//const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des variables
let avatarPathDataBase = null;

let isValid = true;

/* //declaration des fonctions
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
} */

async function globalAddOneAvis(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }
  //let bodyParsed = JSON.parse(req.body);

  const lastName = req.body.lastname;
  const firstName = req.body.firstname;
  const content = req.body.content;
  const socialUrl = req.body.socialurl ? req.body.socialurl : null;

  if (req.files !== null) {
    //recuperation de l' extension du fichier image avatar

    console.log("contenu du fichier  files: " + req.files.avatar);

    let avatarName = req.files.avatar.name;
    let avatarExt = avatarName.split(".").pop(); // eslint-disable-next-line no-undef

    avatarPathDataBase = path.join(
      // eslint-disable-next-line no-undef

      "avatar-" +
        Date.now() +
        "-" +
        lastName +
        "-" +
        firstName +
        "." +
        avatarExt
    );
    let avatarPathDiskStorage = path.join(
      // eslint-disable-next-line no-undef
      "images/" +
        "avatar-" +
        Date.now() +
        "-" +
        lastName +
        "-" +
        firstName +
        "." +
        avatarExt
    );

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
    const requeteAddAvis = `INSERT INTO avis (created_at, content, first_name, last_name, social_link, url_img)  VALUES (NOW(),?,?,?,?,?) `;
    const paramRequeteAddAvis = [
      content,
      firstName,
      lastName,
      socialUrl,
      avatarPathDataBase,
    ];

    // connection à la base de donnee
    let connect = await connectToDataBase();

    let requestResult = await sendRequest(
      connect,
      requeteAddAvis,
      paramRequeteAddAvis
    );

    connect.end();

    if (!requestResult) {
      return res.status(500).json({ message: "avis non enregistré" });
    }

    return res.status(201).json({ message: "avis enregistré" });
  }
}

function addOneAvis(req, res) {
  globalAddOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = addOneAvis;
