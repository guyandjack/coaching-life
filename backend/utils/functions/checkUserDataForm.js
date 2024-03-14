//fonctions unitaires qui controlent la validite des données utilisateur issu des formulaires

//import des regEx
// eslint-disable-next-line no-undef
const regEx = require("../data/regEx/regEx.js");

//Test la validite d'un email
function checkEmail(email) {
  if (regEx.masqueMail.test(email)) {
    return true;
  }
  return false;
}

//Test la validite d'une chaine de caractere type password (chiffre, maj, special, mini 8)
function checkPassword(password) {
  if (regEx.masquePassword.test(password)) {
    return true;
  }
  return false;
}

//Test la validite d'une chaine de caractere alpha
function checkLastname(lastname) {
  if (regEx.masqueText.test(lastname)) {
    return true;
  }
  return false;
}

//Test la validite d'une chaine de caractere alpha
function checkFirstname(firstname) {
  if (regEx.masqueText.test(firstname)) {
    return true;
  }
  return false;
}
//Test la validite d'un message
function checkText(content) {
  if (regEx.masqueMessage.test(content)) {
    return true;
  }
  return false;
}
//Test la validite d'une url
function checkUrl(url) {
  if (regEx.masqueUrl.test(url)) {
    return true;
  }
  return false;
}
//Test la validite d'une url
function checkNumber(number) {
  if (regEx.masqueNumber.test(number)) {
    return true;
  }
  return false;
}
//Test la validite d'un fichier image
/*function checkImg(img) {
  return false;
}*/

// eslint-disable-next-line no-undef
module.exports = {
  checkLastname,
  checkFirstname,
  checkEmail,
  checkPassword,
  checkText,
  checkUrl,
  checkNumber,
  //checkImg,
};
// eslint-disable-next-line no-undef
