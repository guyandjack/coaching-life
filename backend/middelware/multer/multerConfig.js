//const express = require("express");
// eslint-disable-next-line no-undef
const multer = require("multer");
// eslint-disable-next-line no-undef
const path = require("path");

// eslint-disable-next-line no-undef
const fs = require("fs");

//import des function
// eslint-disable-next-line no-undef
const detectLang = require("../../utils/functions/checkLanguageFileHtml.js");

//declaration des function

//definit le path pour enregister le fichier article html
function getFolderPath(file) {
  const content = fs.readFileSync(file.path, "utf8");
  const language = detectLang(content);

  let folderPath = "../public/";
  if (language === "fr") {
    folderPath = "../public/fr/article";
  } else if (language === "de") {
    folderPath = "../public/de/artikel";
  } else if (language === "en") {
    folderPath = "../public/en/article";
  }
  return folderPath;
}

//Differentes configurations de multer

// Configuration du stockage avec Multer pour les avatar issus du formulaire AddAvis
const storageAvisAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avis/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.image + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Configuration du stockage avec Multer pour les images issus du formulaire AddArticle
const storageArticleImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/article/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.image + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Configuration du stockage avec Multer pour le fichier html (fr/de/en) issus du formulaire AddArticle
const storageArticleHTML = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = getFolderPath(file);
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.article + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Differente Instance de Multer pour traiter les differents types de fichiers
const uploadAvisAvatar = multer({
  storage: storageAvisAvatar,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const uploadArticleImages = multer({ storage: storageArticleImages });
const uploadArticleHTML = multer({ storage: storageArticleHTML });

/// Exporter les instances de Multer
// eslint-disable-next-line no-undef
module.exports = {
  uploadAvisAvatar,
  uploadArticleImages,
  uploadArticleHTML,
};
