//middelware qui controle les donnees utilisateur issues des formulaires

// eslint-disable-next-line no-undef
const functionControl = require("../utils/functions/checkUserDataForm.js");

function isDataValid(req, res, next) {
  /******************************************************************
   * ***************** controle des fichier a telechargé*************
   * ****************************************************************/

  /** ********************  controle du type mime********************/
  /******************************************************************/
  // typemime attendue: " .jpeg, .jpg, .png, .html "

  //declaration des variables

  let tabErrorFile = []; //tableau qui contient les erreurs de type file

  const mimeTypeValid = ["image/jpeg", "image/jpg", "image/png", "text/html"]; //Tableau des typemime valides

  let isValidImage = false; // booleen de controle
  let isValidArticle = false; // booleen de controle

  //declaration des fonctions

  //Fonction a utiliser si plusieurs fichiers a controler
  function isValidTypeManyFiles(req, validType) {
    //Ensemble des fichiers images de la requette
    let tabImg = req.files.image;

    tabImg.forEach((img) => {
      console.log("mimetype a teste: " + img.mimetype);
      let result = validType.includes(img.mimetype);
      if (!result) {
        tabErrorFile.push("error file");
      }
    });

    if (tabErrorFile.length > 0) {
      console.log("tableau des erreur (false) file: " + tabErrorFile);
      return false;
    } else {
      console.log("tableau des erreur (true) file: " + tabErrorFile);
      return true;
    }
  }

  //fonction a utiliser si un seul fichier image a controler
  function isValideTypeSingleFileImage(req, validType) {
    let fileMimetype = req.files.image.mimetype;
    return validType.includes(fileMimetype);
  }

  //fonction a utiliser si un seul fichier article a controler
  function isValideTypeSingleFileArticle(req, validType) {
    let fileMimetype = req.files.article.mimetype;
    console.log("type mime de l' article: " + fileMimetype);
    return validType.includes(fileMimetype);
  }

  //Logique metier du controle des mimetype

  if (req.files && Object.keys(req.files.image).length > 0) {
    //Corps de la requette qui contient les fichiers image
    let imageList = req.files.image ? req.files.image : null;

    //Determine quelle methode de test en fonction du nombre de fichier image

    if (imageList !== null && Object.keys(imageList).length == 9) {
      console.log("un fichier image detecté " + Object.keys(imageList).length);
      isValidImage = isValideTypeSingleFileImage(req, mimeTypeValid);
    }
    if (
      imageList !== null &&
      Object.keys(imageList).length > 1 &&
      Object.keys(imageList).length <= 5
    ) {
      console.log("plusieurs fichiers  images detectés:  " + imageList.length);
      // eslint-disable-next-line no-unused-vars
      isValidImage = isValidTypeManyFiles(req, mimeTypeValid);
    }

    if (!isValidImage) {
      res.status(401).json({ message: "format des fichiers images invalides" });
    }
    console.log("type mime valide Image ? : " + isValidImage);
  } else {
    console.log(
      "pas de fichier image a telecharger dans le corps de la requete"
    );
  }

  //Determine quelle methode de test en fonction du nombre de fichier article
  //(une seule methode car un seul fichier article possible)
  if (
    req.files &&
    req.files.article &&
    Object.keys(req.files.article).length > 0
  ) {
    console.log("un fichier article detecté 1 ");
    //Corps de la requette qui contient le fichier article
    let articleList = req.files.article ? req.files.article : null;
    console.log("valeur de  article detecté 1 " + articleList);

    isValidArticle = isValideTypeSingleFileArticle(req, mimeTypeValid);
    if (!isValidArticle) {
      res.status(401).json({ message: "format du fichier article invalide" });
    }
    console.log("type mime valide article ? : " + isValidArticle);
  } else {
    console.log(
      "pas de fichier article a telecharger dans le corps de la requete"
    );
  }

  /******************************************************************
   * ***************** controle data issus des champs *************
   * ****************************************************************/

  /** ******************** *****************************************/
  /******************************************************************/

  let tabOfProperty = [];
  let tabError = [];

  if (Object.keys(req.body).length < 1) {
    res.status(401).json({ message: "requete vide" });
  }

  //copie les propriete du corps de la requete (nom du champ des input du formulaire)
  for (const property in req.body) {
    console.log(
      "proprietées detectées dans le corps de la requete :" + property
    );
    tabOfProperty.push(property);
  }

  //selectionne une fonction de controle en fonction du nom du champ du formulaire
  tabOfProperty.forEach((element) => {
    switch (element) {
      case "lastname":
        if (!functionControl.checkLastname(req.body.lastname)) {
          tabError.push("error lastname");
        }
        break;
      case "firstname":
        if (!functionControl.checkFirstname(req.body.firstname)) {
          tabError.push("error firstname");
        }
        break;
      case "email":
        if (!functionControl.checkEmail(req.body.email)) {
          tabError.push("error email");
        }
        break;
      case "password":
        if (!functionControl.checkPassword(req.body.password)) {
          tabError.push("error password");
        }
        break;
      case "newpassword":
        if (!functionControl.checkPassword(req.body.newpassword)) {
          tabError.push("error newpassword");
        }
        break;
      case "actualpassword":
        if (!functionControl.checkPassword(req.body.actualpassword)) {
          tabError.push("error actualpassword");
        }
        break;
      case "confirmpassword":
        if (!functionControl.checkPassword(req.body.confirmpassword)) {
          tabError.push("error confirmpassword");
        }
        break;
      case "content":
        if (!functionControl.checkText(req.body.content)) {
          tabError.push("error content");
        }
        break;
      case "title":
        if (!functionControl.checkText(req.body.content)) {
          tabError.push("error title");
        }
        break;

      case "id":
        if (!functionControl.checkNumber(req.body.id)) {
          tabError.push("error avatarurl");
        }
        break;

      default:
        tabError.push("property undefined");
        break;
    }
  });

  if (tabError.length > 0) {
    res.status(401).json({ message: "format des données invalides" });
    console.log("tableau des erreurs: " + tabError);
  } else {
    next();
  }
}

// eslint-disable-next-line no-undef
module.exports = isDataValid;
