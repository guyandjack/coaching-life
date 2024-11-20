/* eslint-disable no-undef */
const path = require("path");
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");

const checkEnv = require("../../utils/functions/checkEnvironement.js");

const getLang = require("../../utils/functions/checkLanguageFileHtml.js");

let urlbase = checkEnv.defineUrl();

let imagePathDir = "upload/article/image/";
let articlePathDirFr = path.join(__dirname, "../../../public/fr/article/");
let articlePathDirDe = path.join(__dirname, '../../../public/de/artikle/');
let articlePathDirEn = path.join(__dirname, '../../../public/en/article/');
let pathArticle = "";

let isTab = false;

//declatartion des fonctions


//create un nouveau nom de fichier image
function createNewNameImage(req, index) {
  console.log("tableau d' image dectecte: " + isTab);
  const articleTitle = req.body.title;
  const imageName = isTab ? req.files.image[index].name : req.files.image.name;
  console.log(
    "nom de l' image en cours de traitement dans la fonction createNewNameImage: " +
      imageName
  );
  const imageExt = path.extname(imageName); // Récupère l'extension avec le point inclus (ex: .jpg)
  const timestamp = Date.now();
  const newImageFileName =
    index >= 0
      ? `image-${timestamp}-${articleTitle}-${index}${imageExt}`
      : `image-${timestamp}-${articleTitle}${imageExt}`;
  return newImageFileName;
}

//create un nouveau nom de fichier article
function createNewNameArticle(req) {

  const articleTitle = req.body.title;
  let articleTitleValid = articleTitle.replaceAll(" ", "-");
  const articleName = req.files.article.name;
  const articleExt = path.extname(articleName); // Récupère l'extension avec le point inclus (ex: .html)
  const timestamp = Date.now();
  const newArticleFileName = `article-${timestamp}-${articleTitleValid}${articleExt}`;
  return newArticleFileName;
}
// cree un path/repertoir pour une image
function createOneImagePathDir(newImageFileName) {
  let imagePath = path.join(imagePathDir, newImageFileName);

  return imagePath;
}
// cree un path/database pour une image
function createOneImagePathDB(newImageFileName) {
  let imagePathDataBase = urlbase.urlimg + imagePathDir + newImageFileName;

  return imagePathDataBase;
}

// cree un path/repertoir pour le fichier article
function createOneArticlePathDir(newArticleFileName, req) {
  let lang = getLang(req.files.article);
  
  switch (lang) {
    case "fr":
      pathArticle = articlePathDirFr;
      break;
    case "de":
      pathArticle = articlePathDirDe;
      break;
    case "en":
      pathArticle = articlePathDirEn;
      break;
  
    default:
      break;
  }
  console.log("langue detectée: " + lang);
    let articlePath = path.join(pathArticle, newArticleFileName);
    
    return articlePath;
}

// cree un path/database pour le fichier article
function createOneArticlePathDB(newArticleFileName) {
  let articlePathDataBase =
     pathArticle + newArticleFileName;

  return articlePathDataBase;
}

//creation des chemin pour stoker les images
function createUrlForImage(req) {
  //si req.files est untableau(plusieurs images)
  if (Array.isArray(req.files.image)) {
    isTab = true;
    let tabForDB = [];
    let tabForDir = [];
    console.log("nombre d'image detectées: " + req.files.length);
    req.files.image.forEach((img, index) => {
      let newName = createNewNameImage(req, index);
      let resultDir = createOneImagePathDir(newName);
      let resultDB = createOneImagePathDB(newName);
      tabForDB.push(resultDB);
      tabForDir.push(resultDir);
    });
    let objectUrlImage = {
      urlDir: tabForDir,
      urlDB: tabForDB,
    };
    return objectUrlImage;
  } else {
    isTab = false;
    let tabForDB = [];
    let tabForDir = [];
    console.log("Une seule image detectéeeeeee ");
    let newName = createNewNameImage(req);
    let resultDir = createOneImagePathDir(newName);
    let resultDB = createOneImagePathDB(newName);
    tabForDB.push(resultDB);
    tabForDir.push(resultDir);

    let objectUrlImage = {
      urlDir: tabForDir,
      urlDB: tabForDB,
    };
    return objectUrlImage;
  }
}

//creation du chemin pour stoker le fichier article
function createUrlForFile(req) {
  let tabForDB = [];
  let tabForDir = [];
  let newName = createNewNameArticle(req);
  console.log("nouveau nom de l'article: " + newName);
  let resultDir = createOneArticlePathDir(newName,req);
  let resultDB = createOneArticlePathDB(newName);

  tabForDB.push(resultDB);
  tabForDir.push(resultDir);

  let objectUrlArticle = {
    urlDir: tabForDir,
    urlDB: tabForDB,
  };
  return objectUrlArticle;
}

//fonction principale

async function addOneArticle(req, res) {
  const { title: titleArticle, content: resumeArticle } = req.body;

  // Validation des données d'entrée du body
  if (!titleArticle || !resumeArticle) {
    return res.status(400).json({
      message: "Données manquantes dans req.body pour l'ajout de l'article",
    });
  }

  const { article: fileArticle, image: imageArticle } = req.files;

  // Validation des données d'entrée du files
  if (!fileArticle || !imageArticle) {
    return res.status(400).json({
      message: "Données manquantes dans req.files pour l'ajout de l'article",
    });
  }

  let imagePathObject = createUrlForImage(req);
  let filePathObject = createUrlForFile(req);

  //

  //url de l' article
  let urlArticleDB = JSON.stringify(filePathObject.urlDB);
  let urlArticleDir = filePathObject.urlDir;
  console.log("le fichier html sera enregistre dans: " + urlArticleDir);

  //url des images
  let urlImageDB = JSON.stringify(imagePathObject.urlDB);
  let urlImageDir = imagePathObject.urlDir;
  console.log("le fichier image sera enregistre dans: " + urlImageDir);

  let title = req.body.title;
  let resume = req.body.content;

  // Requête préparée pour insérer un article dans la BDD
  const requeteAddArticle = `INSERT INTO article (created_at, title, resume, url_img, url_article) VALUES (NOW(), ?, ?, ?, ?)`;
  const paramRequeteAddArticle = [title, resume, urlImageDB, urlArticleDB];

  try {
    const connect = await connectToDataBase();
    const requestResult = await sendRequest(
      connect,
      requeteAddArticle,
      paramRequeteAddArticle
    );
    connect.end();

    if (!requestResult) {
      return res.status(500).json({
        message: "Échec de l'enregistrement dans la bdd de l'article",
      });
    }

    // Enregistre la/les images dans un dossier
    if (isTab) {
      let imageList = req.files.image;
      imageList.forEach((img, index) => {
        storeOneImage(img, urlImageDir[index], res);
      });
    } else {
      let img = req.files.image;
      storeOneImage(img, urlImageDir[0], res);
    }

    //enregistre l'article dans une dossier
    storeOneArticle(req.files.article, urlArticleDir[0], res);

    return res.status(201).json({ message_status: "succes" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de l'avis" });
  }
}

// Fonction pour enregistrer une image
async function storeOneImage(img, imagePath, res) {
  return new Promise((resolve, reject) => {
    img.mv(imagePath, (err) => {
      if (err) {
        console.error("Impossible d'enregistrer l'image :", err);
        res.status(500).json({ message: "Impossible d'enregistrer l'image" });
        return reject(err);
      }
      resolve();
    });
  });
}
// Fonction pour enregistrer une image
async function storeOneArticle(article, articlePath, res) {
  console.log("fichier article dans la fonction storeOneArticle: " + article);
  console.log(
    "pathDir article dans la fonction storeOneArticle: " + articlePath
  );
  return new Promise((resolve, reject) => {
    article.mv(articlePath, (err) => {
      if (err) {
        console.error("Impossible d'enregistrer l'image :", err);
        res.status(500).json({ message: "Impossible d'enregistrer l'article" });
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = addOneArticle;
