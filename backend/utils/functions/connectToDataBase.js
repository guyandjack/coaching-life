// function qui permet de se connecter a la bdd "coaching-life"
// eslint-disable-next-line no-undef
const mysql = require("mysql");

// eslint-disable-next-line no-undef
require("dotenv").config();

//Option de connexion à la bdd sql
let connection = mysql.createConnection({
  // eslint-disable-next-line no-undef
  host: process.env.HOST,
  // eslint-disable-next-line no-undef
  user: process.env.USER_ADMIN,
  // eslint-disable-next-line no-undef
  password: process.env.PASSWORD,
  // eslint-disable-next-line no-undef
  database: process.env.DATABASE,
});

//Connection a la bdd sql
function connectToDB(res) {
  connection.connect(function (err) {
    //gestion erreur de connection
    if (err) {
      res.status(400).send({ " message": "impossible de se connecté" });
      connection.end();
      return console.error("error de connection: " + err.message);
    }
  });
  return connection;
}

// eslint-disable-next-line no-undef
module.exports = connectToDB;
