//middelware qui controle les donnees utilisateur issues des formulaires

// eslint-disable-next-line no-undef
const functionControl = require("../utils/functions/checkUserDataForm.js");

function isDataValid(req, res, next) {
  let tabOfProperty = [];
  let tabError = [];

  //extrait le type de donnéé du corps de la requete
  for (const property in req.body) {
    console.log("properiete:" + property);
    tabOfProperty.push(property);
  }

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
      case "text":
        if (!functionControl.checkText(req.body.text)) {
          tabError.push("error text");
        }
        break;
      case "url":
        if (!functionControl.checkUrl(req.body.url)) {
          tabError.push("error url");
        }
        break;
      case "img":
        if (!functionControl.checkImg(req.body.img)) {
          tabError.push("error img");
        }
        break;

      default:
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
module.exports = { isDataValid };
