// middelware qui permet de changer de mot de passe

//import des librairies
// eslint-disable-next-line no-undef
const crypt = require("bcrypt");

//import des fonctions
// eslint-disable-next-line no-undef
const connectionDB = require("../../utils/data/dataBaseConnectionConfig.js");

// eslint-disable-next-line no-undef
//const checkData = require("../../middelware/checkUserData.js");

function changePassword(req, res) {
  //actual password
  const actualPassword = req.body.actualpassword;

  //new Password
  const newPassword = req.body.newpassword;

  //confirm Password
  const confirmPassword = req.body.confirmpassword;

  //user admin decoded
  const adminId = req.auth.admin;

  // connection à la base de donnee
  let connect = connectionDB(res);

  //verifie si l' actuel password correspond a celui de la bdd

  //Requette preparée pour recuperer le password de l'admin coorespondant au token dans la bdd
  const requetePasswordAdmin = `SELECT password FROM user_admin WHERE id = ?`;
  const paramRequetePasswordAdmin = adminId;

  //requete password user vers la bdd
  connect.query(
    requetePasswordAdmin,
    paramRequetePasswordAdmin,
    (err, result) => {
      //gestion erreur server
      if (err) {
        connect.end();
        res.status(500).json({ mesage: "requete password non aboutie" });
        return;
      }

      //gestion erreur resultat
      //si le resultat est vide

      if (result.length < 1) {
        connect.end();
        res.status(401).json({ message: "pas d'admin correspondant" });
        return;
      }

      //gestion du resultat
      crypt
        .compare(actualPassword, result[0].password)
        .then((isValid) => {
          if (!isValid) {
            connect.end();
            res.status(500).json({ message: "mot de passe actuel erromé" });
            return;
          }
        })
        .catch(() => {
          connect.end();
          res.status(500).json({ message: "erreur dans le cryptage" });
          return;
        });
    }
  );

  //test si la validite du nouveau mot de passe
  if (newPassword !== confirmPassword) {
    connect.end();
    res
      .status(400)
      .json({ message: "les mots de passes ne correspondent pas" });
  }

  //hachage du nouveau mot de paase
  crypt
    .hash(confirmPassword, 5)
    .then((mdpHashed) => {
      //Requette preparée pour recuperer les infos de l'utilisateur dans la bdd
      const requeteChangePassword = `UPDATE user_admin SET password = ?`;
      const paramRequeteChangePassword = mdpHashed;

      connect.query(
        requeteChangePassword,
        paramRequeteChangePassword,
        (err, result) => {
          //gestion erreur server
          if (err) {
            connect.end();
            res
              .status(500)
              .send({ message: "requete change mot de passe non aboutie" });
            return;
          }

          if (!result) {
            connect.end();
            res
              .status(500)
              .json({ message: "impossible de changer le mot de passe" });
            return;
          }
          //gestion du resultat
          connect.end();
          res.status(201).json({ message: "Nouveau mot de passe enregistré!" });
        }
      );
    })
    // eslint-disable-next-line no-unused-vars
    .catch(() => {
      connect.end();
      res.status(500).json({ message: "impossible de asher le mot de passe" });
    });
}

// eslint-disable-next-line no-undef
module.exports = changePassword;
