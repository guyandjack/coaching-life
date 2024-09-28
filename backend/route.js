// import des modules
// eslint-disable-next-line no-undef
const express = require("express");
const routeur = express.Router();
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");
// eslint-disable-next-line no-undef
//test hash
// eslint-disable-next-line no-undef


/********* import du controler pour la verification de recatpcha ***********
 * **************************************************************************/
// eslint-disable-next-line no-undef
const checkRecaptcha = require("./controlers/recaptcha/verifyRecaptcha.js");



/************ import des controlers pour le formulaire de contact *************/
// eslint-disable-next-line no-undef
const contact = require("./controlers/contact/contact.js");


/************ import des controlers pour les routes "admin" ************
 * *********************************************************************/

/*********  admin ************/

//connection de l' admin
// eslint-disable-next-line no-undef
const logUser = require("./controlers/user/loginUser.js");

//changement du mot de passe
// eslint-disable-next-line no-unused-vars, no-undef
const changePassword = require("./controlers/user/changePassword.js");


/*********  avis clients ************/

// eslint-disable-next-line no-undef
const getAllAvis = require("./controlers/avis/getAllAvis.js");

// eslint-disable-next-line no-undef
const addOneAvis = require("./controlers/avis/addAvis.js");

// eslint-disable-next-line no-undef
const deleteAvis = require("./controlers/avis/deleteAvis.js");


/*********  article admin ************/

//recupere tous les articles
// eslint-disable-next-line no-undef
const getAllArticle = require("./controlers/article/getAllArticle.js");


//ajouter un article
// eslint-disable-next-line no-unused-vars, no-undef
const addOneArticle = require("./controlers/article/addArticle2.js");

//suprime un article
// eslint-disable-next-line no-undef
const deleteOneArticle = require("./controlers/article/deleteArticle.js");

/************ import des middelware ***************** */

// authentification du user par token
// eslint-disable-next-line no-undef
const auth = require("./middelware/authentification/auth.js");

//controle des donnees envoyées par les formulaires clients
// eslint-disable-next-line no-undef
const checkData = require("./middelware/checkUserData.js");

// eslint-disable-next-line no-undef
//const setHeaderSecurityCORS = require("./middelware/CORS.js");

/***********************************************
 * ************* creation des end points************
 * ********************************************/

/*********** route get **************
 * **********************************/

//route temoignage socoaching - recupere les avis clients
routeur.get("/avis",  getAllAvis);

//route admin  socoaching - recupere tous les article de la base de donnée
routeur.get("/article", getAllArticle);







/*********** route post *****************
 ****************************************/

//verification reCaptcha
routeur.post("/verify-recaptcha", checkRecaptcha);

// routes Admin  - login admin
routeur.post("/login", checkData, logUser);

// routes Admin  - Ajouter un avis
routeur.post("/avis", checkData, auth, addOneAvis);

//route Contact SoCoaching - send mail
routeur.post("/contact", checkData, contact);

//route Admin - Ajouter un article
routeur.post("/article", checkData, auth, addOneArticle);



/*********** route put   **************
 * ************************************/

//Route Admin - Modifier mot de passe
routeur.put("/password", checkData, auth, changePassword);



/*********** route delete   **************
 * *****************************************/

//route Admin - Suprimer un avis
routeur.delete("/avis", checkData, auth, deleteAvis);

//route Admin - Ajouter un article
routeur.delete("/article", checkData, auth, deleteOneArticle);


/*********** route de test   **************
 * *****************************************/
routeur.get("/test", (req, res) => {
    res.status(200).json({"message": "route validée"})
});

// eslint-disable-next-line no-undef
module.exports = routeur;
