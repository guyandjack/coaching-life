// middelware qui permet de changer de mot de passe

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const crypt = require("bcrypt");
// eslint-disable-next-line no-undef, no-unused-vars

//import des fonctions
// eslint-disable-next-line no-undef
const connectionConfig = require("../../utils/data/dataBaseConnectionConfig.js");
// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declarartion des fonctions
async function getActualPassword(bodyparsed) {
  return bodyparsed.actualpassword;
}

async function getNewPassword(bodyparsed) {
  return bodyparsed.newpassword;
}

async function getConfirmPassword(bodyparsed) {
  return bodyparsed.confirmpassword;
}

async function getBodyAuth(req) {
  return req.auth.admin;
}

async function globalChangePassword(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(500).json({ message: "corps de la requette vide" });
  }

  let bodyParsed = JSON.parse(req.body.dataput);

  const actualPassword = await getActualPassword(bodyParsed);
  const newPassword = await getNewPassword(bodyParsed);
  const confirmPassword = await getConfirmPassword(bodyParsed);
  const adminId = await getBodyAuth(req);

  //verifie si l' actuel password correspond a celui de la bdd

  //Requette preparée pour recuperer le password de l'admin coorespondant au token dans la bdd
  const requetePasswordAdmin = `SELECT password FROM user_admin WHERE id = ?`;
  const paramRequetePasswordAdmin = adminId;

  console.log("adminId: " + adminId);

  let connect = await connectToDataBase(connectionConfig);

  const requestResult = await sendRequest(
    res,
    connect,
    requetePasswordAdmin,
    paramRequetePasswordAdmin
  );

  if (requestResult.length < 1) {
    connect.end();
    res.status(401).json({ message: "pas d'admin correspondant" });
    return;
  }

  //gestion du resultat
  crypt
    .compare(actualPassword, requestResult[0].password)
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
    .then(async (mdpHashed) => {
      //Requette preparée pour recuperer les infos de l'utilisateur dans la bdd
      const requeteChangePassword = `UPDATE user_admin SET password = ?`;
      const paramRequeteChangePassword = mdpHashed;

      const requestResult2 = await sendRequest(
        res,
        connect,
        requeteChangePassword,
        paramRequeteChangePassword
      );

      if (!requestResult2) {
        connect.end();
        res
          .status(500)
          .json({ message: "impossible de changer le mot de passe" });
        return;
      }

      //gestion du resultat
      connect.end();
      res.status(201).json({ message: "Nouveau mot de passe enregistré!" });
    })
    // eslint-disable-next-line no-unused-vars
    .catch(() => {
      connect.end();
      res.status(500).json({ message: "impossible de asher le mot de passe" });
    });
}

function changePassword(req, res) {
  globalChangePassword(req, res);
}

// eslint-disable-next-line no-undef
module.exports = changePassword;
