//controler identification Login

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const crypt = require("bcrypt");
// eslint-disable-next-line no-undef, no-unused-vars
const jwt = require("jsonwebtoken");

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

// eslint-disable-next-line no-undef
//const { connect } = require("../../route.js");

//definition des fonctions

//getuserEmail
async function getEmail(bodyparsed) {
  return bodyparsed.email;
}
//getuserPassword
async function getPassword(bodyparsed) {
  return bodyparsed.password;
}

async function globalcheckUserLogin(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }

  let bodyParsed = JSON.parse(req.body.datalogin);
  console.log("bodyparsed: " + bodyParsed);
  //variable locale
  let isValid = false;

  //recuperation valeur de email dans le body
  const userEmail = await getEmail(bodyParsed);
  console.log("useremail: " + userEmail);

  //requete preparée
  const requeteEmail = `SELECT id, email, lastname, firstname, password FROM user_admin WHERE email = ? `;
  const paramRequeteEmail = userEmail;

  //connexion a la bdd
  const connect = await connectToDataBase(connectionConfig);
  console.log("connect: " + connect);

  if (connect !== null) {
    //requette de type select vers la bdd

    const requestResult = await sendRequest(
      res,
      connect,
      requeteEmail,
      paramRequeteEmail
    );

    //fermeture connection vers bdd
    connect.end();

    //verification du mot de passe utilisateur
    //si le resutat est vide => aucune correspondance avec un user de la bdd
    if (Object.values(requestResult).length < 1) {
      res.status(401).json({ message: "user non reconnu" });
      isValid = false;
      return;
    } else {
      isValid = true;
    }

    if (isValid) {
      const userPassword = await getPassword(bodyParsed);

      let userPasswordCrypted = requestResult[0].password;

      crypt
        .compare(userPassword, userPasswordCrypted)
        .then((isMatch) => {
          if (!isMatch) {
            res.status(300).json({ message: "mot de passe erroné" });
            return;
          }

          let objectResponse = {
            lastname: requestResult[0]["lastname"],
            firstName: requestResult[0]["firstname"],
            token: jwt.sign(
              { adminId: requestResult[0]["id"] },
              // eslint-disable-next-line no-undef
              process.env.PRIVATE_KEY_TOKEN,
              { expiresIn: "1h" }
            ),
          };
          //Renvoi de l'objet reponse
          res.status(200).json(objectResponse);
        })
        .catch((err) => {
          res.status(500).json({
            message: "erreur serveur auth impossible",
            error: err,
          });
        });
    }
  }
}

function checkUserLogin(req, res) {
  globalcheckUserLogin(req, res);
}

// eslint-disable-next-line no-undef
module.exports = checkUserLogin;
