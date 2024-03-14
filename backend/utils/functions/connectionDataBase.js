// eslint-disable-next-line no-undef
const mysql = require("mysql");

//connexion à une bdd
function connectToDataBase(connectionConfig) {
  return new Promise((resolve, reject) => {
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        reject(null);
      }

      console.log("connected as id " + connection.threadId);
      resolve(connection);
    });
  });
}

// eslint-disable-next-line no-undef
module.exports = connectToDataBase;
