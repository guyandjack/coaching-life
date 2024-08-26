// eslint-disable-next-line no-undef
const { masqueLang } = require("../data/regEx/regEx.js");

// Fonction pour détecter la langue du contenu HTML


 function detectLanguage(article) {
 
  
  let contents = article.data.toString("utf8");
  let value = contents.match(masqueLang);
  console.log("retour du tableau match regex " + value); 

  
  if (value && value[1]) {
    return value[1].toLowerCase();
  } else {
    return "unknown";
  }


}

// eslint-disable-next-line no-undef
module.exports = detectLanguage;
