/* eslint-disable no-undef */
const path = require("path");
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");

const checkEnv = require("../../utils/functions/checkEnvironement.js");

//import * as deepl from "deepl-node";
const deepl = require("deepl-node");


let urlbase = checkEnv.defineUrl();
let avatarPathDir = "upload/avis/avatar/";

//declaration des fonctions

// cree un path/repertoir pour une image
function createOneAvatarPathDir(newAvatarFileName) {
  let imagePath = path.join(avatarPathDir, newAvatarFileName);
  
  return imagePath;
}

// cree un path/database pour une image
function createOneAvatarPathDB(newAvatarFileName) {
  let imagePathDataBase = urlbase.urlimg + avatarPathDir + newAvatarFileName;

  return imagePathDataBase;
}

function createNewNameAvatar(req) {
  let lastname = req.body.lastname;
  let firstname = req.body.firstname;
   const avatarName = req.files.image.name;
   const avatarExt = path.extname(avatarName); // Récupère l'extension avec le point inclus (ex: .jpg)
   const timestamp = Date.now();
   const newAvatarFileName = `avatar-${timestamp}-${lastname}-${firstname}${avatarExt}`;
  return newAvatarFileName;
}

//creation des chemin pour stoker les images
function createUrlForAvatar(req) {
  
    let tabForDB = [];
    let tabForDir = [];
   
    let newName = createNewNameAvatar(req);
    let resultDir = createOneAvatarPathDir(newName);
    let resultDB = createOneAvatarPathDB(newName);
    tabForDB.push(resultDB);
    tabForDir.push(resultDir);

    let objectUrlavatar = {
      urlDir: tabForDir,
      urlDB: tabForDB,
    };
    return objectUrlavatar;
  
}

/**
 * fait un appel ver l' api deepl via l' objet "deepl" pour traduire du text
 *
 * @param {*} content le contenu a traduire
 * @param {*} lang la langue de traduction
 * @return {*} un string qui contient le text traduit
 */
async function fetchDeeplApi(content, lang) {
  
  try {
    
    const authKey = process.env.CLEF_API_DEEPL;
    const translator = new deepl.Translator(authKey);

    let result = (async () => {
      const result = await translator.translateText(
        `${content}`,
        null,
        `${lang}`
      );
       
      return result.text;
    })();

    return result

   
  } catch (error) {
    console.error("Error fetching translate: ", error);
    
  }
}


/**
 * recupere le contenu d' un avis dans les trois langues
 *
 * @param {*} content
 * @return {*} object qui contient le contenu des avis dans les trois langues
 */
async function getTranslate(content) {
  
  let translatedTexts = {};

  try {
    translatedTexts.textFr = await fetchDeeplApi(content, "FR");
    translatedTexts.textEn = await fetchDeeplApi(content, "EN-GB");
    translatedTexts.textDe = await fetchDeeplApi(content, "DE");
  }
  catch(error) {
    console.error("Error fetching translate: ", error);
  }
  
  return translatedTexts
  

}



async function addOneAvis(req, res) {
  const {
    lastname: lastName,
    firstname: firstName,
    content,
    socialurl: socialUrl = null,
  } = req.body;

  let translatedText = await getTranslate(content);

  

  // Validation des données d'entrée
  if (!lastName || !firstName || !content) {
    return res
      .status(400)
      .json({ message: "Données manquantes pour l'ajout de l'avis" });
  }

  
  let avatarUrlDB = null;
  let avatarUrlDir = null;
  if (req.files && req.files.image) {
    let avatarUrl = createUrlForAvatar(req);
    avatarUrlDB = JSON.stringify(avatarUrl.urlDB);
     avatarUrlDir = avatarUrl.urlDir;
  }
  // Requête préparée pour insérer un avis dans la BDD
  const requeteAddAvis = `INSERT INTO avis (
  created_at,
  content,
  content_en,
  content_de,
  first_name,
  last_name,
  social_link,
   url_img) VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?)`;
  const paramRequeteAddAvis = [
    translatedText.textFr,
    translatedText.textEn,
    translatedText.textDe,
    firstName,
    lastName,
    socialUrl,
    avatarUrlDB,
    
  ];

  try {
    const connect = await connectToDataBase();
    const requestResult = await sendRequest(
      connect,
      requeteAddAvis,
      paramRequeteAddAvis
    );
    connect.end();

    if (!requestResult) {
      
      return res
        .status(500)
        .json({ message: "Échec de l'enregistrement de l'avis" });
    }

    // Enregistre l'avatar si un fichier a été téléchargé
    if (avatarUrlDir != null) {
      console.log("chemin du repertoir de avatar:  " + avatarUrlDir);
      await storeAvatar(req, avatarUrlDir[0], res);
    }

    return res.status(201).json({ message_status: "succes" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de l'avis: " + error });
  }
}

// Fonction pour enregistrer l'avatar
async function storeAvatar(req, avatarPath, res) {
  return new Promise((resolve, reject) => {
    req.files.image.mv(avatarPath, (err) => {
      if (err) {
        console.error("Impossible d'enregistrer l'avatar :", err);
        res.status(500).json({ message: "Impossible d'enregistrer l'avatar" });
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = addOneAvis;
