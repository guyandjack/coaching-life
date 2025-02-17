/* eslint-disable no-undef */
// Import des librairies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");


//import des fonctions
const checkEnv = require("../../utils/functions/checkEnvironement.js");
let expIn = "1800s";
let exp = 1800;
if (checkEnv.devOrProd() == "dev") {
  expIn = "50s";
  exp = 50
  
  
}

async function checkUserLogin(req, res) {
  const { email: userEmail, password: userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  // Requête préparée
  const requeteEmail = `SELECT * FROM admin WHERE email = ?`;
  const paramRequeteEmail = [userEmail];

  try {
    // Connexion à la base de données
    const connect = await connectToDataBase();
    if (!connect) {
      return res
        .status(500)
        .json({ message: "Erreur de connexion à la base de données" });
    }

    // Exécution de la requête
    const requestResult = await sendRequest(
      connect,
      requeteEmail,
      paramRequeteEmail
    );
    connect.end(); // Fermeture de la connexion

    // Vérification de la présence de l'utilisateur
    if (requestResult.length === 0) {
      return res
        .status(401)
        .json({ message: "Mot de passe et/ou identifiant non reconnu" });
    }

    const user = requestResult[0];

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe et/ou identifiant incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { adminId: user.id },
      process.env.PRIVATE_KEY_TOKEN,
      { expiresIn: expIn }
    );
    
    let date = new Date();
    // Envoi de la réponse
    res.status(200).json({
      message: "succes",
      name: `${user.admin_name}`,
      token: token,
      time: date.getTime(),
      expire: exp
    });
  } catch (error) {
    console.error(`Erreur lors de la vérification du login : ${error.message}`);
    res
      .status(500)
      .json({
        message: "Erreur serveur, authentification impossible",
        error: error.message,
      });
  }
}

module.exports = checkUserLogin;
