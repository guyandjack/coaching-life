// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef, no-unused-vars
const setHeaderSecurityCORS = require("./middelware/CORS.js");
//const path = require("path");

// eslint-disable-next-line no-undef
const fileUpload = require("express-fileupload");

// eslint-disable-next-line no-undef
const routeApi = require("./route.js");

// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");

const app = express();


//permet d' exploiter le contenu json du corps des requettes
app.use(express.json());

//permet d'acceder au contenu du corps de la requette
app.use(bodyParser.urlencoded({ extended: true }));

//permet de recuperer les fichier dans le corps de la requte
app.use(fileUpload());

app.use("/api", setHeaderSecurityCORS);

// Serve les images depuis le dossier 'uploads'
// eslint-disable-next-line no-undef
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Serve les images depuis le dossier 'public'
// eslint-disable-next-line no-undef
app.use('/image', express.static(path.join(__dirname, 'image')));




app.use("/api", routeApi);

// eslint-disable-next-line no-undef
module.exports = app;
