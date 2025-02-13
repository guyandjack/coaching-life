/* eslint-disable no-undef */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");

const checkEnv = require("../../utils/functions/checkEnvironement.js");

const getLang = require("../../utils/functions/checkLanguageFileHtml.js");
//const { array } = require("prop-types");

let urlbase = checkEnv.defineUrl();

let imagePathDir = "upload/article/image/";
/*let articlePathDirFr = path.join(__dirname, "../../../public/fr/article/");
let articlePathDirDe = path.join(__dirname, '../../../public/de/artikle/');
let articlePathDirEn = path.join(__dirname, '../../../public/en/article/');*/
let articlePathDirFr = "upload/article/html/fr/";
let articlePathDirDe = "upload/article/html/de/";
let articlePathDirEn = "upload/article/html/en/";
let pathArticle = "";



//declatartion des fonctions

//create un nouveau nom de fichier image
function createNewNameImage(req, url, index) {
  const articleTitle = req.body.title;
  let articleTitleValid = articleTitle
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
  //const imageName = isTab ? req.files.image[index].name : req.files.image.name;
  const imageName = url ;
  console.log(
    "nom de l' image en cours de traitement dans la fonction createNewNameImage: " +
      imageName
  );
  const imageExt = path.extname(imageName); // Récupère l'extension avec le point inclus (ex: .jpg)
  //const imageExt = ".webp"; //modifie l' extension du fichier avant de creer les path dir et db
  const timestamp = Date.now();
  const newImageFileName =
    index > 0
      ? `image-${timestamp}-${articleTitleValid}-${index}${imageExt}`
      : `image-${timestamp}-${articleTitleValid}${imageExt}`;
  return newImageFileName;
}

//create un nouveau nom de fichier article
function createNewNameArticle(req) {
  const articleTitle = req.body.title;
  let articleTitleValid = articleTitle
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
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
  /*let articlePathDataBase =
     pathArticle + newArticleFileName;*/

  let articlePathDataBase =
    urlbase.urlarticle + pathArticle + newArticleFileName;

  return articlePathDataBase;
}

//creation des chemin pour stoker les images
function createUrlForImage(req, taburl) {
  if (!Array.isArray(taburl)) {
    console.log("l'argument attendu dans 'createUrlForImage' n'est pas un tableau");
    return {}
  }

  if (taburl.length < 1) {
    console.log("tableau d'url vide!")
  }
   
    let tabForDB = [];
    let tabForDir = [];
    console.log("nombre d'image detectées: " + taburl.length);
   taburl.forEach((url, index) => {
      let newName = createNewNameImage(req, url, index);
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
   
}

//creation du chemin pour stoker le fichier article
function createUrlForFile(req) {
  let tabForDB = [];
  let tabForDir = [];
  let newName = createNewNameArticle(req);
  console.log("nouveau nom de l'article: " + newName);
  let resultDir = createOneArticlePathDir(newName, req);
  let resultDB = createOneArticlePathDB(newName);

  tabForDB.push(resultDB);
  tabForDir.push(resultDir);

  let objectUrlArticle = {
    urlDir: tabForDir,
    urlDB: tabForDB,
  };
  return objectUrlArticle;
}

// permet de redimensionner et de changer le format des fichiers images

async function formatImageFile(req) {
  try {
    //let files = req.files.image;
    let arrayPath = [];

    if (Array.isArray(req.files.image)) {
      for (let i = 0; i < req.files.image.length; i++) {
         await sharp(req.files.image[i]["data"])
          .resize({ width: 600, fit: "inside" })
          .toFormat("webp", { quality: 80 })
          .toBuffer()
          .then((data) => { req.files.image[i].data = data; });
        await timer(5);
         req.files.image[i].mimetype = "image/webp";
        fs.writeFileSync(`output-img-${i}.webp`, req.files.image[i].data);
        arrayPath.push(`output-img-${i}.webp`);
         
      }
      console.log("array path------------------------")
      console.log(arrayPath);
      return arrayPath
      
    } else {
      let file = req.files.image;
      if (!file.data) {
        throw new Error("Le buffer de l'image est invalide.");
      }

      file.data = await sharp(file.data)
        .resize({ width: 600, fit: "inside" })
        .toFormat("webp", { quality: 80 })
        .withMetadata()
        .removeAlpha()
        .toBuffer();
      await timer(5)
      fs.writeFileSync("output-single.webp", file.data);
      file.mimetype = "image/webp";
      arrayPath.push("output-single.webp");
      return arrayPath
    }
  } catch (error) {
    console.error("❌ Erreur de traitement des images :", error);
  }
}

 function timer(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, t*1000)
  })
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

  console.log(req.files.image);

  // Validation des données d'entrée du files
  if (!fileArticle || !imageArticle) {
    return res.status(400).json({
      message: "Données manquantes dans req.files pour l'ajout de l'article",
    });
  }

  //Formatage des images dans "req" en "webp" + recuperation des url dans un tableau
  let arrayPath = await formatImageFile(req) ?? null ;
  console.log("req.files.image apres le traitement: -----------------------");
  console.log(req.files.image);

  

  let imagePathObject = createUrlForImage(req, arrayPath);
  let filePathObject = createUrlForFile(req);

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
    //v-1
    /* if (isTab) {
      let imageList = req.files.image;
      imageList.forEach((img, index) => {
        storeOneImage(img, urlImageDir[index], res);
      });
    } else {
      let img = req.files.image;
      storeOneImage(img, urlImageDir[0], res);
    } */
    // v-2
    storeImg(arrayPath, urlImageDir);

    //enregistre l'article dans une dossier
    storeOneArticle(req.files.article, urlArticleDir[0], res);

    return res.status(201).json({ message_status: "succes" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'article :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout de l'article" });
  }
}

// Fonction pour enregistrer une image
//v-1
/* async function storeOneImage(img, imagePath, res) {
  //mofie l' extension du fichier
  return new Promise((resolve, reject) => {
    img.mv(imagePath, (err) => {
      if (err) {
        console.error("Impossible d'enregistrer l'image :", err);
        res.status(500).json({ message: "Impossible d'enregistrer l'image" });
        return reject(err);
      }

      //test la presence du dossier
      fs.promises
        .access(imagePath)
        .then(() => {
          console.log(
            "Le fichier image a été déplacé et est présent à l'emplacement souhaité."
          );

          return resolve();
        })
        .catch(() => {
          console.error("Le fichier n'existe pas à l'emplacement prévu.");
          return reject(err);
        });
    });
  });
} */
//v-2
async function storeImg(arrayUrl, newPath) {
  try {
    for (let i = 0; i < arrayUrl.length; i++)  {

      await fs.promises.rename(arrayUrl[i], newPath[i]);
    }
  }
  catch (e) {
    console.log("erreur: " + e.message)
  }
}
// Fonction pour enregistrer un article
async function storeOneArticle(article, articlePath, res) {
  console.log("fichier article dans la fonction storeOneArticle: " + article);
  console.log(
    "pathDir article dans la fonction storeOneArticle: " + articlePath
  );
  return new Promise((resolve, reject) => {
    article.mv(articlePath, (err) => {
      if (err) {
        console.error("Impossible d'enregistrer l'article :", err);
        res.status(500).json({ message: "Impossible d'enregistrer l'article" });
        return reject(err);
      }

      //test la presence du dossier
      fs.promises
        .access(articlePath)
        .then(() => {
          console.log(
            "Le fichier article a été déplacé et est présent à l'emplacement souhaité."
          );
          return resolve();
        })
        .catch(() => {
          console.error("Le fichier n'existe pas à l'emplacement prévu.");
          return reject(err);
        });

      //resolve();
    });
  });
}

module.exports = addOneArticle;
