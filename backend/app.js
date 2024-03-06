// eslint-disable-next-line no-undef
const express = require("express");

// eslint-disable-next-line no-undef
const routeApi = require("./route.js");

// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");

const app = express();

//permet d' exploiter le contenu json du corps des requettes
app.use(express.json());

//permet d'acceder au contenu du corps de la requette
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routeApi);

// eslint-disable-next-line no-undef
module.exports = app;
