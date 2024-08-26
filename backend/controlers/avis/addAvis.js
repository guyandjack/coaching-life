//controler qui permet d' ajouter un avis

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

//import des fonctions

// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");


//declaration des variables
// eslint-disable-next-line no-undef
let urlImageDEV = process.env.URL_BASE_IMAGE_ARTICLE_DEV;
let avatarPathDataBase = null;
let avatarPath = null;

async function addOneAvis(req, res) {
  const lastName = req.body.lastname;
  const firstName = req.body.firstname;
  const content = req.body.content;
  const socialUrl = req.body.socialurl ? req.body.socialurl : null;

  //declaration des fonctions
  function storeAvatar(req, avatarPath) {
    //enregistrement dans un fichier du serveur si le rete des information est enregister sur la bdd
    req.files.image.mv(avatarPath, (err) => {
      if (err) {
        console.log("impossible d' enregistrer l' avatar: " + err);
        res
          .status(500)
          .json({ message: "impossible d' enregistrer l' avatar" });
      }
    });
  }

  if (req.files !== null) {
    //recuperation de l' extension du fichier image avatar

    let avatarName = req.files.image.name;
    let avatarExt = avatarName.split(".").pop(); // eslint-disable-next-line no-undef

    avatarPathDataBase = path.join(
      // eslint-disable-next-line no-undef
      `${urlImageDEV}`+
      "upload/avis/avatar/" +
        "avatar-" +
        Date.now() +
        "-" +
        lastName +
        "-" +
        firstName +
        "." +
        avatarExt
    );
    avatarPath = path.join(
      // eslint-disable-next-line no-undef
      "upload/avis/avatar/" +
        "avatar-" +
        Date.now() +
        "-" +
        lastName +
        "-" +
        firstName +
        "." +
        avatarExt
    );
  }

  //Requete preparée pour inserer un avis  dans la bdd avis
  const requeteAddAvis = `INSERT INTO avis (created_at, content, first_name, last_name, social_link, url_img)  VALUES (NOW(),?,?,?,?,?) `;
  const paramRequeteAddAvis = [
    content,
    firstName,
    lastName,
    socialUrl,
    avatarPathDataBase,
  ];

  // connection à la base de donnee
  let connect = await connectToDataBase();

  let requestResult = await sendRequest(
    connect,
    requeteAddAvis,
    paramRequeteAddAvis
  );

  connect.end();

  if (!requestResult) {
    return res.status(500).json({ message: "avis non enregistré" });
  }

  storeAvatar(req, avatarPath);

  return res.status(201).json({ message: "avis enregistré" });
}



// eslint-disable-next-line no-undef
module.exports = addOneAvis;
