/* eslint-disable no-undef */
require("dotenv").config();
const checkEnv = require("../functions/checkEnvironement");

async function doConfig() {
  const envType = await checkEnv.devOrProd();
  console.log("Environment Type: " + envType);

  if (!envType || envType === "unknown") {
    console.error("Environnement non défini ou inconnu");
    return undefined;
  }

  let objectConfig = {};

  switch (envType) {
    case "dev":
      objectConfig = {
        host: process.env.HOST_DEV,
        user: process.env.USER_DEV,
        database: process.env.DATABASE_DEV,
        password: process.env.PASSWORD_DEV,
      };
      break;

    case "prod":
      objectConfig = {
        host: process.env.HOST_PROD,
        user: process.env.USER_PROD,
        database: process.env.DATABASE_PROD,
        password: process.env.PASSWORD_PROD,
      };
      break;

    default:
      console.error("Type d'environnement non pris en charge");
      return undefined;
  }

  return objectConfig;
}

module.exports = { doConfig };
