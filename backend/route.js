// import du module express
// eslint-disable-next-line no-undef
const express = require("express");
const routeur = express.Router();

//import des controlers pour les avis clients

// eslint-disable-next-line no-undef
const addOneAvis = require("./controlers/avis/addAvis.js");
/*
const changeAvis = require("./controlers/avis/changeAvis.js");
const deleteAvis = require("./controlers/avis/deleteAvis.js");*/

//import des controlers pour l' admin

//authentification de l' admin
// eslint-disable-next-line no-undef
const logUser = require("./controlers/user/loginUser.js");

//changement du mot de passe
// eslint-disable-next-line no-unused-vars, no-undef
const changePassword = require("./controlers/user/changePassword.js");

// eslint-disable-next-line no-undef
const auth = require("./middelware/authentification/auth.js");
// eslint-disable-next-line no-undef
const checkData = require("./middelware/checkUserData.js");

/*********** route post **************/

//route de test pour recuperre une image
routeur.post("/image", (req, res) => {
  // Get the file that was set to our field named "image"
  console.log("req-files: " + req.files);
  const { image } = req.files.avatar;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  let imagePath = image.name;
  let imageValid = imagePath.split(" ").join("");
  console.log("nom de l'image: " + imagePath);

  // Move the uploaded image to our upload folder
  // eslint-disable-next-line no-undef
  image.mv(__dirname + "/images/" + Date.now() + "_" + imageValid);

  res.status(201).send("image enregistrée");
});

// routes login utilisateur
routeur.post("/login", checkData, logUser);

// routes Ajouter avis
routeur.post("/avis", auth, addOneAvis);

/*********** route put   **************/

//Modif mot de passe
routeur.put("/password", auth, checkData, changePassword);

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
