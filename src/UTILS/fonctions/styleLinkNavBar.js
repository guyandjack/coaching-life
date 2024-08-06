//import des data
import { navBarContentFR } from "../../DATA/navBarContent/fr/navBarContent-fr.js";
import { navBarContentDE } from "../../DATA/navBarContent/de/navBarContent-de.js";
import { navBarContentEN } from "../../DATA/navBarContent/en/navBarContent-en.js";

import { keyWordUrlFR } from "../../DATA/pageUrl/fr/keyWordUrl-fr.js";
import { keyWordUrlDE } from "../../DATA/pageUrl/de/keyWordUrl-de.js";
import { keyWordUrlEN } from "../../DATA/pageUrl/en/keyWordUrl-en.js";

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
      return navBarContentFR;

    case "de":
      return navBarContentDE;

    case "en":
      return navBarContentEN;
  }
}
/**
 *
 *
 * @param {*} countryCode
 * @return {array}  key word url
 */
function getLanguageKeyWord(countryCode) {
  switch (countryCode) {
    case "fr":
      return keyWordUrlFR;

    case "de":
      return keyWordUrlDE;

    case "en":
      return keyWordUrlEN;
  }
}

/**
 *
 *
 * @return {string} curent page url
 */
function getCurentUrl() {
  return window.location.href;
}

/**
 *
 *
 * @param {object} key word object selected for the page
 * @param {string} urlFinded curent page  url finded
 * @return {elementHTML} to style
 */
function getNavLinkToStyle(tabKeyWord, urlFinded) {
  let result = null;
  tabKeyWord.forEach((keyWord) => {
    if (urlFinded.includes(keyWord[0])) {
      console.log("id du lien selectionné: " + keyWord[1]);
      let elementLink = document.querySelector(`#${keyWord[1]} span`);

      console.log(" lien selectionné: " + elementLink);

      result = elementLink;
    }
    console.log(" resultat: " + result);
  });
  return result;
}

/**
 *
 *
 * @param {htmlElementLink} elementLinkFinded
 */
function styleNavLink(elementLinkFinded) {
  if (elementLinkFinded !== null && elementLinkFinded !== "undefined") {
    let allIndicators = document.querySelectorAll(".indicator");
    allIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
    console.log("link element a styliser: " + elementLinkFinded);
    elementLinkFinded.classList.add("active");
  }
}

/***************** fonction globales de niveau superieur a exporter *******************/

/**
 *
 *
 * @return {array} text nav bar
 */
function getNavBarContent() {
  let countryCode = getPageLanguage();
  let content = getContentLanguage(countryCode);
  return content;
}

/**
 *
 *
 * @return {} applique un style par changement de class au lien du nav bar
 */
function styleLinkNavBar() {
  let countryCode = getPageLanguage();
  let keyWordSelected = getLanguageKeyWord(countryCode);
  let curentUrl = getCurentUrl();

  let targetLink = getNavLinkToStyle(keyWordSelected, curentUrl);
  console.log("lien a styliser 2: " + targetLink);
  if (targetLink !== null && targetLink !== "undefined")
    styleNavLink(targetLink);
}

/**
 *
 *
 * @return {object} qui contient les liens des pages alternative à la page courante
 */
function setHrefLinkLanguage() {
  let divInfo = document.querySelector("#info-href");
  let href_de = divInfo.dataset.de;
  let href_en = divInfo.dataset.en;
  let href_fr = divInfo.dataset.fr;
  return {
    de: `${href_de}`,
    en: `${href_en}`,
    fr: `${href_fr}`,
  };
}

export { getNavBarContent, styleLinkNavBar, styleNavLink, setHrefLinkLanguage };
