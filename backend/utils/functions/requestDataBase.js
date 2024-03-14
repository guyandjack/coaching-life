//requete de type select vers la bdd
function sendRequest(res, connection, requestType, requestParam) {
  //connection a la bdd

  return new Promise((resolve, reject) => {
    connection.query(requestType, requestParam, (err, result) => {
      //gestion erreur server
      if (err) {
        console.log("erreur: " + err);
        reject(
          res.status(500).send({ message: "requete  non aboutie" })
          //connection.end()
        );
      }

      resolve(result); //connection.end());
    });
  });
}

// eslint-disable-next-line no-undef
module.exports = sendRequest;
