//controler qui permet d' ajouter un avis

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const crypt = require("bcrypt");
// eslint-disable-next-line no-undef, no-unused-vars

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des variables
let avatarPath = null;

let isValid = true;

//declaration des fonctions
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



async function globalAddOneAvis(req, res) {

  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }
  let bodyParsed = JSON.parse(req.body.data);

  const lastName = await getLastname(bodyParsed);
  const firstName = await getFirstame(bodyParsed);
  const content = await getContent(bodyParsed);
  const socialUrl = await getSocialUrl(bodyParsed);

  if (req.files) {
    //recuperation de l' extension du fichier image avatar

    let avatarName = req.files.avatar.name;
    let avatarExt = avatarName.split(".").pop(); // eslint-disable-next-line no-undef

    avatarPath =
      // eslint-disable-next-line no-undef
      __dirname +
      "../../../images/" +
      "avatar-" +
      Date.now() +
      "-" +
      lastName +
      "-" +
      firstName +
      "." +
      avatarExt;

    //enregistrement dans un fichier du serveur
    req.files.avatar.mv(avatarPath, (err) => {
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
      avatarPath,
    ];

    // connection à la base de donnee
    let connect = await connectToDataBase(connectionConfig);

    let requestResult = await sendRequest(
      res,
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
