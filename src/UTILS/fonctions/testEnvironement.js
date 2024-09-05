// Accessing environment variables
const baseDevUrl = import.meta.env.VITE_BASE_DEV_URL;
const baseProdUrl = import.meta.env.VITE_BASE_PROD_URL;

const apiDevUrl = import.meta.env.VITE_API_DEV_URL;
const apiProdUrl = import.meta.env.VITE_API_PROD_URL;


const mode = import.meta.env.MODE;

let result = {};
// Vérifier le mode actuel

function localOrProd() {
  if (mode === "development") {
    console.log("Mode développement");
    result.url = baseDevUrl;
    result.urlApi = apiDevUrl;
    return result;
  } else if (mode === "production") {
    console.log("Mode production");
    result.url = baseProdUrl;
    result.urlApi = apiProdUrl;
    return result;
  } else {
    console.log("Mode inconnu :", mode);
    return "undefined";
  }
}

export { localOrProd };
