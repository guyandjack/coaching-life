// import du module express
// eslint-disable-next-line no-undef
const express = require("express");
const routeur = express.Router();

//import des controlers pour les avis clients
/*const addAvis = require("./controlers/avis/addAvis.js");
const changeAvis = require("./controlers/avis/changeAvis.js");
const deleteAvis = require("./controlers/avis/deleteAvis.js");*/

//import des controlers pour l' admin
// eslint-disable-next-line no-undef
const logUser = require("./controlers/user/loginUser.js");
// eslint-disable-next-line no-undef
const auth = require("./middelware/authentification/auth.js");
// eslint-disable-next-line no-undef
const checkData = require("./middelware/checkUserData.js");
//const changePassword = require("./controlers/user/changePassword.js");

/*********** route post **************/

// routes login utilisateur
routeur.post("/login", checkData.isDataValid, logUser);

// routes Ajouter avis
routeur.post("/avis", auth, (req, res) => {
  res.status(200).send("la route ajouter un avis est validée avec un token");
});

/*********** route put   **************/

//Modif mot de passe
routeur.put("/password", auth, (req, res) => {
  res.status(200).send("la route modif avis est validée");
});

//Modif avis
routeur.put("/avis", auth, (req, res) => {
  res.status(200).send("la route modif avis est validée");
});

/*********** route delete   **************/

routeur.delete("/avis", auth, (req, res) => {
  res.status(200).send("la route suprimer avis est validée");
});

// eslint-disable-next-line no-undef
module.exports = routeur;
