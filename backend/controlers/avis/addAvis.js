// controler qui permet de rajouter un avis sur la page temoignage

//import des fonctions
// eslint-disable-next-line no-undef
const connectionDB = require("../../utils/functions/connectToDataBase.js");

function addAvis(req, res) {
  async function getLastname() {
    return req.body.lastname;
  }

  async function getFirstame() {
    return req.body.firstname;
  }
  async function getContent() {
    return req.body.content;
  }

  async function getAvatarUrl() {
    if (!req.body.avatarurl) {
      return null;
    }
    return req.body.avatarurl;
  }

  async function getSocialUrl() {
    if (!req.body.socialurl) {
      return null;
    }
    return req.body.socialurl;
  }

  /*async function getAvatarImg() {
    if (!req.files) {
      return null;
    }
    return req.files;
  }*/

  let avatarPath = null;
  let isFiles = false;

  Promise.all([
    getLastname(),
    getFirstame(),
    getContent(),
    getAvatarUrl(),
    getSocialUrl(),
    //getAvatarImg(),
  ])
    .then(([lastName, firstName, content, imgUrl, socialUrl]) => {
      // connection à la base de donnee
      let connect = connectionDB(res);

      //Requete preparée pour inserer un avis  dans la bdd avis
      const requeteAddAvis = `INSERT INTO avis (created_at, content, first_name, last_name, social_link, url_img)  VALUES (NOW(),?,?,?,?,?) `;
      const paramRequeteAddAvis = [
        content,
        firstName,
        lastName,
        socialUrl,
        imgUrl,
      ];

      connect.query(requeteAddAvis, paramRequeteAddAvis, (err, result) => {
        if (err) {
          res.status(500).json({
            message: "impossible d'enregistrer le nouvel avis",
          });
          connect.end();
          console.error("error: " + err);
        }

        if (result) {
          res.status(201).json({ message: "avis enregistré dans la bdd" });
          connect.end();
        }
      });

      /**** -2/2- traitement des  fichiers à uploader de la requete ***** */
      /*if (isFiles) {
        const cleef = Object.keys(req);
        console.log("clef de req.files: " + cleef);
        //creation d'un path pour enregistrer l'image (avatar)
        //recuperation de l' extension du fichier image avatar

        let avatarName = req.files.picture.name;
        console.log("nom de l'avatar: " + avatarName);
        let avatarExt = avatarName.split(".").pop(); // eslint-disable-next-line no-undef
        avatarPath =
          // eslint-disable-next-line no-undef
          __dirname +
          "images" +
          Date.now() +
          lastName +
          "-" +
          firstName +
          "-avatar." +
          avatarExt;

        //enregistrement dans un fichier serveur
        req.files.picture.mv(avatarPath, (err) => {
          if (err) {
            console.log("impossible d' enregistrer l' avatar: " + err);
          }
        });
      }*/
    })

    .catch((err) => {
      console.log("impossible de recuperer toute les données du body: " + err);
    });
}

// eslint-disable-next-line no-undef
module.exports = addAvis;
