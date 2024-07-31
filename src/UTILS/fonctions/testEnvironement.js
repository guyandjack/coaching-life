// Accessing environment variables
const baseDevUrl = import.meta.env.VITE_BASE_DEV_URL;
const baseProdUrl = import.meta.env.VITE_BASE_PROD_URL;
const mode = import.meta.env.MODE;
let url = "";
// Vérifier le mode actuel

function localOrProd() {
  if (mode === "development") {
    console.log("Mode développement");
    url = baseDevUrl;
    return url;
  } else if (mode === "production") {
    console.log("Mode production");
    url = baseProdUrl;
    return url;
  } else {
    console.log("Mode inconnu :", mode);
    return "undefined";
  }
}

export { localOrProd };
