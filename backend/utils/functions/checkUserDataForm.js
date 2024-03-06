//fonction unitaire qui controle la validite des données utilisateur issu des formulaires

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
//Test la validite d'une chaine de caractere alpha
function checkText(text) {
  if (regEx.masqueMail.test(text)) {
    return true;
  }
  return false;
}
//Test la validite d'une chaine de caractere alpha
function checkUrl(url) {
  if (regEx.masqueMail.test(url)) {
    return true;
  }
  return false;
}
//Test la validite d'une chaine de caractere alpha
function checkImg(img) {
  if (regEx.masqueMail.test(img)) {
    return true;
  }
  return false;
}

// eslint-disable-next-line no-undef
module.exports = {
  checkLastname,
  checkFirstname,
  checkEmail,
  checkPassword,
  checkText,
  checkUrl,
  checkImg,
};
// eslint-disable-next-line no-undef
