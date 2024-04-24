//import des data
import { footerContentFR } from "../../DATA/footerContent/fr/footerContent-fr.js";
import { footerContentDE } from "../../DATA/footerContent/de/footerContent-de.js";
import { footerContentEN } from "../../DATA/footerContent/en/footerContent-en.js";

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
      return footerContentFR;

    case "de":
      return footerContentDE;

    case "en":
      return footerContentEN;
  }
}

function getFooterContent() {
  let countrycode = getPageLanguage();
  let content = getContentLanguage(countrycode);
  console.log("contenu du footer: " + content);
  return content;
}

export { getFooterContent };
