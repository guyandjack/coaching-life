/* eslint-disable no-undef */
const mysql = require("mysql2/promise");
const createConfig = require("../../utils/data/dataBaseConnectionConfig.js");

async function connectToDataBase() {
  try {
    const config = await createConfig.doConfig();
    console.log("Configuration utilisée: ", config);

    if (!config || Object.keys(config).length === 0) {
      throw new Error(
        "La configuration de la base de données est vide ou non définie"
      );
      
    }

    const connection = await mysql.createConnection(config);
    console.log("Connexion réussie à la base de données.");
    return connection;
  } catch (error) {
    console.error(
      "Erreur lors de la connexion à la base de données: ",
      error.message
    );
    return null;
  }
}

module.exports = connectToDataBase;
