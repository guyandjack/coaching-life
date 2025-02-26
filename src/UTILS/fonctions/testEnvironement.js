// Accès aux variables d'environnement
const baseDevUrl = import.meta.env.VITE_BASE_DEV_URL;
const baseProdUrl = import.meta.env.VITE_BASE_PROD_URL;

const apiDevUrl = import.meta.env.VITE_API_DEV_URL;
const apiProdUrl = import.meta.env.VITE_API_PROD_URL;

const urlCSSDEV = import.meta.env.VITE_URL_CSS_DEV;
const urlCSSPROD = import.meta.env.VITE_URL_CSS_PROD;

const mode = import.meta.env.MODE;

const result = {};

// Fonction pour vérifier que les variables d'environnement sont bien chargées
function validateEnvVariables() {
  if (!baseDevUrl || !baseProdUrl || !apiDevUrl || !apiProdUrl || !mode ||!urlCSSDEV || !urlCSSPROD) {
    console.log("variable en defaut 'baseDevurl': " + baseDevUrl);
    console.log("variable en defaut 'baseProdvurl': " + baseProdUrl);
    console.log("variable en defaut 'apiDevurl': " + apiDevUrl);
    console.log("variable en defaut 'apiProdevurl': " + apiProdUrl);
    console.log("variable en defaut 'mode': " + mode);
    throw new Error(
      "Une ou plusieurs variables d'environnement sont manquantes."
    );
  }
}

// Vérifier le mode actuel et configurer les URLs en conséquence
function localOrProd() {
  try {
    // Valider les variables d'environnement avant de continuer
    validateEnvVariables();

    if (mode !== "development") {
      console.log("Mode production");
      result.url = baseProdUrl;
      result.urlApi = apiProdUrl;
      result.mode = "prod"
      console.log("urlprod :" + result.url);
      console.log("urlprodApi :" + result.urlApi);
    } else {
      console.log("Mode développement");
      result.url = baseDevUrl;
      result.urlApi = apiDevUrl;
      result.mode = "dev"
      console.log("urldev :" + result.url);
      console.log("urldevApi :" + result.urlApi);
    } 
    

    return result;
  } catch (error) {
    console.error(
      "Erreur lors du chargement des variables d'environnement :",
      error
    );
    return "undefined";
  }
}


function defineUrlCSSForArticle() {
  let urlCSS = null;
  try {
    // Valider les variables d'environnement avant de continuer
    validateEnvVariables();

    if (mode !== "development") {
     urlCSS = urlCSSPROD
    } else {
      urlCSS = urlCSSDEV
    } 
    

    return urlCSS;
  } catch (error) {
    console.error(
      "Erreur lors du chargement des variables d'environnement :",
      error
    );
    return "undefined";
  }
}

export { localOrProd, defineUrlCSSForArticle };
