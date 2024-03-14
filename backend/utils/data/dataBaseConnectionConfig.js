// function qui permet de se connecter a la bdd "coaching-life"
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
require("dotenv").config();

//Option de connexion à la bdd sql
let connectionConfigCoaching = {
  // eslint-disable-next-line no-undef
  host: process.env.HOST,
  // eslint-disable-next-line no-undef
  user: process.env.USER_ADMIN,
  // eslint-disable-next-line no-undef
  password: process.env.PASSWORD,
  // eslint-disable-next-line no-undef
  database: process.env.DATABASE,
};

// eslint-disable-next-line no-undef
module.exports = connectionConfigCoaching;
