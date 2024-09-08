// Accès aux variables d'environnement
const baseDevUrl = import.meta.env.VITE_BASE_DEV_URL;
const baseProdUrl = import.meta.env.VITE_BASE_PROD_URL;

const apiDevUrl = import.meta.env.VITE_API_DEV_URL;
const apiProdUrl = import.meta.env.VITE_API_PROD_URL;

const mode = import.meta.env.MODE;

const result = {};

// Fonction pour vérifier que les variables d'environnement sont bien chargées
function validateEnvVariables() {
  if (!baseDevUrl || !baseProdUrl || !apiDevUrl || !apiProdUrl || !mode) {
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
      console.log("urlprod :" + result.url);
      console.log("urlprodApi :" + result.urlApi);
    } else {
      console.log("Mode développement");
      result.url = baseDevUrl;
      result.urlApi = apiDevUrl;
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

export { localOrProd };
