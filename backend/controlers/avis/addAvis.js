/* eslint-disable no-undef */
const path = require("path");
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");

const urlImageDEV = process.env.URL_BASE_IMAGE_ARTICLE_DEV || "";

async function addOneAvis(req, res) {
  const {
    lastname: lastName,
    firstname: firstName,
    content,
    socialurl: socialUrl = null,
  } = req.body;

  // Validation des données d'entrée
  if (!lastName || !firstName || !content) {
    return res
      .status(400)
      .json({ message: "Données manquantes pour l'ajout de l'avis" });
  }

  let avatarPathDataBase = null;
  let avatarPath = null;

  // Si un fichier est présent, on prépare les chemins pour l'enregistrement
  if (req.files && req.files.image) {
    const avatarName = req.files.image.name;
    const avatarExt = path.extname(avatarName); // Récupère l'extension avec le point inclus (ex: .jpg)
    const timestamp = Date.now();
    const avatarFileName = `avatar-${timestamp}-${lastName}-${firstName}${avatarExt}`;

    avatarPathDataBase =  urlImageDEV + "upload/avis/avatar/" + avatarFileName;
    avatarPath = path.join("upload/avis/avatar", avatarFileName);
  }

  // Requête préparée pour insérer un avis dans la BDD
  const requeteAddAvis = `INSERT INTO avis (created_at, content, first_name, last_name, social_link, url_img) VALUES (NOW(), ?, ?, ?, ?, ?)`;
  const paramRequeteAddAvis = [
    content,
    firstName,
    lastName,
    socialUrl,
    avatarPathDataBase,
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
    if (avatarPath) {
      await storeAvatar(req, avatarPath, res);
    }

    return res.status(201).json({ message_status: "succes" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de l'avis" });
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
