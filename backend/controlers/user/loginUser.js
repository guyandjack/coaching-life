//controler identification Login

//import des librairies
// eslint-disable-next-line no-undef
const crypt = require("bcrypt");
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");

//import des fonctions
// eslint-disable-next-line no-undef
const connectionDB = require("../../utils/functions/connectToDataBase.js");

// eslint-disable-next-line no-undef
//const checkData = require("../../middelware/checkUserData.js");

function checkUserLogin(req, res) {
  //creer le mot de pasee test ache pour la bdd
  /*crypt.hash("Adminpassword65!", 5).then((hash) => {
    console.log("hash creer: " + hash);
  });*/

  //userEmail
  const userEmail = req.body.email;

  //userPassword
  const userPassword = req.body.password;

  // connection à la base de donnee
  let connect = connectionDB(res);

  //Requette preparée pour recuperer les infos de l'utilisateur dans la bdd
  const requeteEmail = `SELECT id,email, lastname, firstname, password FROM user_admin WHERE email = ?`;
  const paramRequeteEmail = userEmail;

  //requete info user vers la bdd
  connect.query(requeteEmail, paramRequeteEmail, (err, result) => {
    //gestion erreur server
    if (err) {
      res.status(500).send({ message: "requete email non aboutie" });
      connect.end();
      return;
    }

    //si l'email de l'user ne correspond pas à un email de la bdd

    if (result.length < 1 || userEmail !== result[0]["email"]) {
      res.status(401).send({ message: "Utilisateur non trouvé" });
      connect.end();
      return;
    }

    //verification du mot de passe utilisateur
    crypt
      .compare(userPassword, result[0].password)
      .then((isValid) => {
        console.log("mdp de la bdd: " + result[0].password);
        if (!isValid) {
          res.status(300).send("mot de passe erroné");
          connect.end();
          return;
        }

        let objectResponse = {
          lastname: result[0]["lastname"],
          firstName: result[0]["firstname"],
          token: jwt.sign(
            { adminId: result[0]["id"] },
            // eslint-disable-next-line no-undef
            process.env.PRIVATE_KEY_TOKEN,
            { expiresIn: "1h" }
          ),
        };
        //reponse du serveur suite à une authentification positive du user
        res.status(200).send(objectResponse);
        connect.end();
      })
      .catch((err) => {
        res.status(500).send("pb serveur auht impossible" + err);
        connect.end();
      });
  });
}

// eslint-disable-next-line no-undef
module.exports = checkUserLogin;
