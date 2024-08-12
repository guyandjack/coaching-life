// eslint-disable-next-line no-undef
require("dotenv").config();

const ENV_DEV = "dev";
const ENV_PROD = "prod";

// eslint-disable-next-line no-undef
console.log("NODE_ENV: " + process.env.NODE_ENV);

function devOrProd() {
  // eslint-disable-next-line no-undef
  switch (process.env.NODE_ENV) {
    case ENV_DEV:
      console.log("Mode développement");
      return ENV_DEV;

    case ENV_PROD:
      console.log("Mode production");
      return ENV_PROD;

    default:
      console.error("Mode inconnu ou non défini dans NODE_ENV");
      return "unknown";
  }
}

// eslint-disable-next-line no-undef
module.exports = { devOrProd };
