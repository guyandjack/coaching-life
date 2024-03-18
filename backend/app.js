// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const path = require("path");

// eslint-disable-next-line no-undef
//const path = require("path");

// eslint-disable-next-line no-undef
const fileUpload = require("express-fileupload");

// eslint-disable-next-line no-undef
const routeApi = require("./route.js");

// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");

const app = express();

// eslint-disable-next-line no-undef
app.use(
  "/api/avatar",
  // eslint-disable-next-line no-undef
  express.static(
    path.join(
      // eslint-disable-next-line no-undef
      __dirname,
      // eslint-disable-next-line no-undef
      "images"
    )
  )
);

// eslint-disable-next-line no-undef
/*app.get("/api/avis/avatar", (req, res) => {
  res.status(250).json({ message: "route static validée" });
});*/

//permet d' exploiter le contenu json du corps des requettes
app.use(express.json());

//permet d'acceder au contenu du corps de la requette
app.use(bodyParser.urlencoded({ extended: true }));

//permet de recuperer les fichier dans le corps de la requte
app.use(fileUpload());

app.use("/api", routeApi);

// eslint-disable-next-line no-undef
module.exports = app;
