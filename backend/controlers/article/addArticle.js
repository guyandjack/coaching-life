/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars, no-undef
const path = require("path");

//import des fonctions

// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

// eslint-disable-next-line no-undef
const checkLanguageFileHtml = require("../../utils/functions/checkLanguageFileHtml.js");


//declaration des variables env
let urlImage = null;
let urlArticle = null;
// eslint-disable-next-line no-undef
let environement = process.env.NODE_ENV;

//determine lesurl en fonction des env prod ou dev
switch (environement) {
  case "prod":
     // eslint-disable-next-line no-undef
     urlImage = process.env.URL_BASE_UPLOAD_IMAGE_DEV;
    // eslint-disable-next-line no-undef
     urlArticle = process.env.URL_BASE_UPLOAD_HTML_DEV;
    break;

  default:
    // eslint-disable-next-line no-undef
    urlImage = process.env.URL_BASE_UPLOAD_IMAGE_PROD;
    // eslint-disable-next-line no-undef
    urlArticle = process.env.URL_BASE_UPLOAD_HTML_PROD;
    break;
}


function changePathImageForDB(urlBase, imagePathStore) {
  let objectToStore = [];

  if (typeof imagePathStore === "string") {
    // Cas où imagePathStore est une chaîne unique
    objectToStore.push(`${urlBase}${imagePathStore}`) ;
  } else if (Array.isArray(imagePathStore)) {
    // Cas où imagePathStore est un tableau
    imagePathStore.forEach((path, index) => {
      
      objectToStore.push(`${urlBase}${path}`);
    });
  } else {
    throw new Error("Invalid input type: expected string or array");
  }

  // Convertit l'objet en JSON
  return JSON.stringify(objectToStore);

 
}


async function storeOneImage(req, imagePathStore) {
  if (imagePathStore == null || imagePathStore == undefined) {
    console.log("url de l' image non valid");
    return false;
  }
  //enregistrement dans un fichier du serveur si le rete des information est enregister sur la bdd
  
  console.log("url relative de l' image pour enregistrement fichier: " + imagePathStore)
  req.files.image.mv(imagePathStore, (err) => {
    if (err) {
      console.log("impossible d' enregistrer une image: " + err);
      return false;
    }
  });
  return true;
}
async function storeManyImages(imageList, arrayImagePath) {
  if (arrayImagePath.length < 1 || Object.keys(imageList).length < 1) {
    console.log("url de l' image non valid");
    return false;
  }

  Object.values(imageList).forEach((img, index) => {
    img.mv(arrayImagePath[index], (err) => {
      if (err) {
        console.log("impossible d' enregistrer les images: " + err);
        return false;
      }
    });
  });
  return true;
}
async function storeOneArticle(req, res, articlePath) {
  if (articlePath == null || articlePath == undefined) {
    console.log("url de l'article non valid");
    return false;
  }
  //enregistrement dans un fichier du serveur si le rete des information est enregister sur la bdd
  req.files.article.mv(articlePath, (err) => {
    if (err) {
      console.log("impossible d'enregistrer l'article: " + err);
      /* res
        .status(500)
        .json({ message: "impossible d'enregistrer le fichier article" }); */
      return false;
    }
  });
  return true;
}

function createImagePathForStore(newName, imgExt) {
  // eslint-disable-next-line no-undef
  
  let imagePathStore = path.join(
    // eslint-disable-next-line no-undef
    
    "upload/article/image/" +
    "img-" +
    Date.now() +
    "-" +
    newName +
    "." +
    imgExt
  );
  
  return imagePathStore;
}
function articlePathForDataBase(req, newName, imgExt) {
  //let fileHtmlStringed = req.files.article;
  let languageFile = checkLanguageFileHtml(req.files.article);
  let endPath = "";
  switch (languageFile) {
    case "fr":
      endPath = "article"
      
      break;
    case "de":
      endPath = "artikle"
      
      break;
    case "en":
      endPath = "article"
      
      break;
  
    default:
      break;
  }
  console.log("detection de la langue: " + languageFile);
  
  let articlePath = path.join(
    // eslint-disable-next-line no-undef

    `../public/${languageFile}/${endPath}/` +
      `${endPath}-` +
      Date.now() +
      "-" +
      newName +
      "." +
      imgExt
  );
  return articlePath;
}

//fonction qui creer un tableau contenant les url de stockage des image de l' article
function createArrayImagePath(imageList, titleArticle, masque) {
  let arrayPathImg = [];
  let arrayImg = Object.values(imageList);

  arrayImg.forEach((img, index) => {
    let imageName = img.name; //nom original du fichier image
    let imageExt = imageName.split(".").pop(); //recupere l'extension du fichier image
    let newImageName =
      titleArticle.split(masque).join("").toLowerCase() + `-${index}`; // renomage du fichier image avec titre de l'article
    let imagePathStore = createImagePathForStore(newImageName, imageExt);
    arrayPathImg.push(imagePathStore);
  });
  console.log("tableau des path image: " + arrayPathImg)
  return arrayPathImg; // sous forme de chaine de caractere pour la bdd
}

// eslint-disable-next-line no-unused-vars
async function addOneArticle(req, res) {

  
  // eslint-disable-next-line no-unused-vars
  let masque = /[^a-zA-Z0-9]/g; // exclu tout sauf les lettre minuscules majuscules et les chiffres
  let titleArticle = req.body.title;
  let resumeArticle = req.body.content;
  let imageList = req.files.image;

  let imagePathStore = null;
  let arrayImagePath = [];
  let imagePathDB = null;//variable ou sera enregistrer le chemin du fichier image
  //let arrayImagePath = []; //tableau ou sera enregistrer l' ensemble des chemins des fichiers images
  let articlePath = null; //variable  ou sera enregisterer le chemin de l' article .html
  let articlePathDB = null;
  let isOneImage = undefined;
  let isImageStored = false;

  //creation d' un chemin pour enregistrer la ou les images
  if (Object.keys(imageList).length == 9) {
    isOneImage = true;
    console.log("une seule image a enregistrer.");
    let imageName = req.files.image.name; //nom original du fichier image
    let imageExt = imageName.split(".").pop(); //recupere l' extension du fichier image
    let newImageName = titleArticle.split(masque).join("").toLowerCase(); // renomage du fichier image avec titre de l'article
    imagePathStore = createImagePathForStore(newImageName, imageExt);
    //imagePathStore = createArrayImagePath(imageList, titleArticle, masque);
  } else {
    console.log("plusieurs images a enregistrer.");
    isOneImage = false;
    arrayImagePath = createArrayImagePath(imageList, titleArticle, masque);
    imagePathStore = arrayImagePath;
  }

  //creation d'un chemin pour enregistrer le fichier article
  let articleName = req.files.article.name;
  let articleExt = articleName.split(".").pop();
  let newArticleName = titleArticle.split(masque).join("").toLowerCase();
  articlePath = articlePathForDataBase(req, newArticleName, articleExt);

  //daptation de l' url image pour la DB
  imagePathDB = changePathImageForDB(urlImage, imagePathStore);
  console.log("url image pour data base: " + imagePathDB);

  // adaptation de l' url article pour la db
  console.log("articlepath: " + articlePath);
  let cleanUrl = articlePath.split("public")[1];
  console.log("cleanUrl: " + cleanUrl);
  articlePathDB = changePathImageForDB(urlArticle, cleanUrl);
  console.log("article path db : " + articlePathDB);

  

  //Requete preparée pour inserer un article  dans la bdd avis
  const requeteAddArticle = `INSERT INTO article (created_at, title, resume, url_img, url_article)  VALUES (NOW(),?,?,?,?) `;
  const paramRequeteAddArticle = [
    titleArticle,
    resumeArticle,
    imagePathDB,
    articlePathDB,
  ];

  // connection à la base de donnee
  let connect = await connectToDataBase();

  //requete pour ajouter un article
  let requestResult = await sendRequest(
    connect,
    requeteAddArticle,
    paramRequeteAddArticle
  );

  connect.end();

  if (!requestResult) {
    // "if-1"si pas d'enregistrement possible sur la bdd on retourne un message d'erreur
    return res
      .status(500)
      .json({ message: "article non enregistre sur la bdd" });
  } else {
    //"else-1" enregistrement su db ok on poursuit le reste du code

    // "if-2"utilise une fonction d'enregistremenet pour une seuleimage
    if (isOneImage) {
      isImageStored = await storeOneImage(req, imagePathStore);
      console.log("une seule image enregistré? :" + isImageStored);
    } else {
      //"else-2" utilise une fonction pour enregistrer plusieurs images
      isImageStored = await storeManyImages(imageList, arrayImagePath);
      console.log("plusieurs images enregistrées? :" + isImageStored);
    }

    if (!isImageStored) {
      //"if-3" si l' enregistrement des images echou on revoi un message d' erreur
      return res
        .status(500)
        .json({ message: "image de l' article non enregigstree" });
    } else {
      //"else-3" si l' enregistrement des images ok on continu
      let isArticleStored = await storeOneArticle(req, res, articlePath);
      console.log("article enregistré? :" + isArticleStored);

      if (isArticleStored && isImageStored) {
        //if-4 si l' enregistrement des images et de l' article ok
        console.log("Succes: article enregistrè !");
        return res.status(201).json({ "message_status": "succes" });
      } else {
        //if-4 si l' enregistrement des images ou  de l' article echou message d' erreu
        console.log("Error: article non enregistrè !");
        return res.status(508).json({ "message_status": "failed" });
      }
    }
  }
}

// eslint-disable-next-line no-undef
module.exports = addOneArticle;
