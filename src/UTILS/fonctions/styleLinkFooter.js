//import des data
import { footerContentFR } from "../../DATA/footerContent/fr/footerContent-fr.js";
import { footerContentDE } from "../../DATA/footerContent/de/footerContent-de.js";
import { footerContentEN } from "../../DATA/footerContent/en/footerContent-en.js";

import { navBarContentFR } from "../../DATA/navBarContent/fr/navBarContent-fr.js";
import { navBarContentDE } from "../../DATA/navBarContent/de/navBarContent-de.js";
import { navBarContentEN } from "../../DATA/navBarContent/en/navBarContent-en.js";

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
      return { footer: footerContentFR, header: navBarContentFR };

    case "de":
      return { footer: footerContentDE, header: navBarContentDE };

    case "en":
      return { footer: footerContentEN, header: navBarContentEN };
  }
}

function getFooterContent() {
  let countrycode = getPageLanguage();
  let content = getContentLanguage(countrycode);
  console.log("contenu du footer: " + content);
  return content;
}

export { getFooterContent };
