//import des data
import { cardContentResumeFR } from "/src/DATA/cardContent/fr/cardContentResume-fr.js";
import { cardContentResumeDE } from "/src/DATA/cardContent/de/cardContentResume-de.js";
import { cardContentResumeEN } from "/src/DATA/cardContent/en/cardContentResume-en.js";

/**
 *
 *
 * @return {string} code country from elenemnt <html>
 */
function getPageLanguage() {
  let element = document.querySelector("html");
  return element.getAttribute("lang");
}

/**
 *
 *
 * @param {*} countryCode
 * @return {array} nav bar content
 */
function getContentLanguage(countryCode) {
  switch (countryCode) {
    case "fr":
      return cardContentResumeFR;

    case "de":
      return cardContentResumeDE;

    case "en":
      return cardContentResumeEN;
  }
}

function getCardContentResume() {
  let countrycode = getPageLanguage();
  let content = getContentLanguage(countrycode);
  console.log("contenu du footer: " + content);
  return content;
}

export { getCardContentResume };
