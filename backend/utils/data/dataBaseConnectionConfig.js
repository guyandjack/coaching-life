/* eslint-disable no-undef */
require("dotenv").config();
const checkEnv = require("../functions/checkEnvironement");

async function doConfig() {
  let result = checkEnv.defineUrl();
  
  let objectConfig = {};

  if (result.env !== "dev") {
    objectConfig = {
      host: process.env.HOST_PROD,
      user: process.env.USER_PROD,
      database: process.env.DATABASE_PROD,
      password: process.env.PASSWORD_PROD,
    };
  } else {
    objectConfig = {
      host: process.env.HOST_DEV,
      user: process.env.USER_DEV,
      database: process.env.DATABASE_DEV,
      password: process.env.PASSWORD_DEV,
    };
  }

  return objectConfig;
}

module.exports = { doConfig };
