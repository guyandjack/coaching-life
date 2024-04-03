//controler qui permet de modifier un avis

/********************************************************************
 * si le body contient un fichier image
 * => on enregistre le fichier
 * **** => si enregistrement de image impossible
 * ***** ****** => mise a jours de l' avis abandonné
 * => si ancien fihier image
 *    ****** => on le supprime
 *    *******=> rien
 * => enregidtrement du nouvel avis dans la bdd
 */

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
      "images/" +
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

    //enregistrement du  nouvel avatar dans un fichier du serveur
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
  //si le nouvel avatar et enregistré on supprime l' ancien du fichier images
  if (isValid && req.files) {
    //Requete preparée pour recuperer l'url de l' ancien avatar
    const requeteHoldUrlAvatar = `SELECT  url_img  FROM avis WHERE id = ? `;

    const paramRequeteHoldUrlAvatar = [avisId];

    // connection à la base de donnee
    let connect = await connectToDataBase(connectionConfig);

    let requestResult = await sendRequest(
      res,
      connect,
      requeteHoldUrlAvatar,
      paramRequeteHoldUrlAvatar
    );

    connect.end();

    //si un url est present ds la bdd on supprime l' avatar correspondant
    if (requestResult) {
      console.log("url de la bdd brut  : " + Object.entries(requestResult));
      //suppression de l'ancien avatar
      let holdAvatarUrl = path.join("images/" + requestResult[0]["url_img"]);

      console.log("url de la bdd + /images : " + holdAvatarUrl);

      //suppression du fichier image
      //si le fichier existe on le supprime
      if (fs.existsSync(holdAvatarUrl)) {
        fs.unlink(holdAvatarUrl, (err) => {
          if (err) throw err;
          console.log(holdAvatarUrl + " deleted");
        });
      }
    }
  }

  //si on peut pas enregistrer l' avatar fourni par le user on n' enregistre pas l' avis.
  if (isValid) {
    //Requete preparée pour modifié un avis  dans la bdd avis
    const requeteChangeAvis = `
    UPDATE avis 
    SET 
    created_at = NOW(),
    content = ?,
    first_name = ?,
    last_name = ?,
    social_link = ?,
    url_img = ?
    WHERE id = ?
    `;

    const paramRequeteChangeAvis = [
      content,
      firstName,
      lastName,
      socialUrl,
      avatarPathDataBase,
      avisId,
    ];

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
      return res.status(500).json({ message: "avis non modifié" });
    }

    //si nombre de ligne affectées est differents de 1
    if (requestResult["affectedRows"] !== 1) {
      res.status(500).json({ message: "impossible modifier l'avis" });
    }

    return res.status(200).json({ message: "avis modifié avec success" });
  }
}

function changeOneAvis(req, res) {
  globalChangeOneAvis(req, res);
}

// eslint-disable-next-line no-undef
module.exports = changeOneAvis;
