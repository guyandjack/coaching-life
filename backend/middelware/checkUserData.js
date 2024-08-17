//middelware qui controle les donnees utilisateur issues des formulaires

// eslint-disable-next-line no-undef
const functionControl = require("../utils/functions/checkUserDataForm.js");

function isDataValid(req, res, next) {
  let tabOfProperty = [];
  let tabError = [];

  //controle des data de type fichier
  //peu etre attendu comme typemime .jpeg, .jpg, .png, .html

  // eslint-disable-next-line no-unused-vars
  function isValidTypeManyFiles(files, validType) {
    return files.some((file) => {
      validType.includes(file.mimetype);
    });
  }

  // eslint-disable-next-line no-unused-vars
  function isValideTypeSingleFile(file, validType) {
    return validType.includes(file.mimetype);
  }

  // eslint-disable-next-line no-unused-vars
  let bodyFiles = req.files ? req.files : null;
  let bodyFile = req.file ? req.file : null;

  /* console.log(" tableau ou objet : " + typeof bodyFiles);
  console.log("  tableau ou objet : " + typeof bodyFile); */

  const typeMimeValid = ["image/jpeg", "image/jpg", "image/png", "text/html"];
  let isValid = false;

  if (typeof bodyFiles == "object" && bodyFiles !== null) {
    isValid = isValideTypeSingleFile(bodyFile, typeMimeValid);
  }

  isValid = isValidTypeManyFiles(bodyFile, typeMimeValid);

  if (!isValid) {
    res.status(401).json({ message: "format des fichiers invalides" });
  }

  //controle des data de type lastname, name etc....
  console.log("corps de la requette add avis: " + req.body);

  //extrait le type de donnéé du corps de la requete
  for (const property in req.body) {
    console.log("properiete detectee dans le req:" + property);
    tabOfProperty.push(property);
  }

  //test la presence d' un fichier image dans la requete et controle sa validite
  /*if (req.files || Object.keys(req.files).length > 0) {
    console.log("liste des clef de l'objet req.files" + Object.keys(req.files));
  }*/

  //selectionne une fonction de controle en fonction du type de données
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
      /* case "socialurl":
        if (!functionControl.checkUrl(req.body.socialurl)) {
          tabError.push("error socialurl");
        }
        break; */
      /* case "avatarurl":
        if (!functionControl.checkImg(req.body.avatarurl)) {
          tabError.push("error avatarurl");
        }
        break; */
      case "avisid":
        if (!functionControl.checkNumber(req.body.avisid)) {
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
