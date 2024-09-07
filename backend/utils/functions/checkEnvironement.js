/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
require("dotenv").config();


function devOrProd() {
  const ENV_DEV = "dev";
  const ENV_PROD = "prod";
  
  // eslint-disable-next-line no-undef
  console.log("NODE_ENV: " + process.env.NODE_ENV);
  // eslint-disable-next-line no-undef
  switch (process.env.NODE_ENV) {
    case ENV_DEV:
      console.log("Mode développement");
      return ENV_DEV;

    case ENV_PROD:
      console.log("Mode production");
      return ENV_PROD;

    default:
      console.error("Mode par defaut 'prod'");
      return ENV_PROD;
  }
}

function setUrl(env) {
  //detection de l'environement
  
  let urlImage = null;
  let urlArticle = null;

  if (env !== "dev") {
    urlImage = process.env.URL_BASE_UPLOAD_IMAGE_PROD;
    urlArticle = process.env.URL_BASE_UPLOAD_HTML_PROD;
  } else {
    urlImage = process.env.URL_BASE_UPLOAD_IMAGE_DEV;
    urlArticle = process.env.URL_BASE_UPLOAD_IMAGE_DEV;
  }

  return ({
    urlimg: urlImage,
    urlarticle: urlArticle,
    env: env
  })
}

function defineUrl() {
  let env = devOrProd();
  let object = setUrl(env);
  return object
}

// eslint-disable-next-line no-undef
module.exports = { defineUrl };
