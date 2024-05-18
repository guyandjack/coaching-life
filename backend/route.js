// import des modules
// eslint-disable-next-line no-undef
const express = require("express");
const routeur = express.Router();
// eslint-disable-next-line no-undef
const path = require("path");

/********* import des controlers pour les avis clients ************/

// eslint-disable-next-line no-undef
const getAllAvis = require("./controlers/avis/getAllAvis.js");

// eslint-disable-next-line no-undef
const addOneAvis = require("./controlers/avis/addAvis.js");

// eslint-disable-next-line no-undef
const changeOneAvis = require("./controlers/avis/changeAvis.js");

// eslint-disable-next-line no-undef
const deleteAvis = require("./controlers/avis/deleteAvis.js");

/*// eslint-disable-next-line no-undef
const testPostman = require("./controlers/avis/test.js");*/

/************ import des controlers pour l' admin *************/

//connection de l' admin
// eslint-disable-next-line no-undef
const logUser = require("./controlers/user/loginUser.js");

//changement du mot de passe
// eslint-disable-next-line no-unused-vars, no-undef
const changePassword = require("./controlers/user/changePassword.js");

/************ import des controlers pour le formulaire de contact *************/
// eslint-disable-next-line no-undef
const contact = require("./controlers/contact/contact.js");

/************ import des middelware ***************** */

// authentification du user par token
// eslint-disable-next-line no-undef
const auth = require("./middelware/authentification/auth.js");

//controle des donnees envoyées par le user
// eslint-disable-next-line no-undef
const checkData = require("./middelware/checkUserData.js");

// eslint-disable-next-line no-undef
//const setHeaderSecurityCORS = require("./middelware/CORS.js");

/***********************************************
 * ************* creation des enpoints************
 * ********************************************/

/*********** route get **************
 * **********************************/

routeur.get("/avis", getAllAvis);

routeur.get(
  "/avis/avatar",
  // eslint-disable-next-line no-undef
  express.static(path.join(__dirname, "images"))
);

/*********** route post **************
 * **************************************/

// routes login utilisateur
routeur.post("/login", checkData, logUser);

// routes Ajouter avis
routeur.post("/avis", auth, checkData, addOneAvis);

//route Contact SoCoaching - send mail
routeur.post("/contact", checkData, contact);
/* routeur.post("/contact", (req, res) => {
  res.status(200).json({ message: "test ok de la route contact" });
}); */

/*********** route put   **************
 * ************************************/

//Modif mot de passe
routeur.put("/password", auth, checkData, changePassword);

//Modif avis
routeur.put("/avis", auth, checkData, changeOneAvis);

/*********** route delete   **************
 * *****************************************/

routeur.delete("/avis/:_id", auth, checkData, deleteAvis);

/*//route de test
routeur.post("/test", testPostman);*/

// eslint-disable-next-line no-undef
module.exports = routeur;
