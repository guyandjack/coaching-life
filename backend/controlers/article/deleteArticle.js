//controler qui permet de suprimer un article de la bdd

//import des librairies
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const path = require("path");

//import des fonctions

// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

//declaration des fonctions



async function deleteOneArticle(req, res) {
  const articleId = req.body._id;
  let connect = await connectToDataBase();

  //requette préparé de type select
  const requeteSelect = `SELECT url_img, url_article FROM article WHERE id = ?`;
  const paramRequeteSelect = articleId;

  const requestSelectResult = await sendRequest(
    res,
    connect,
    requeteSelect,
    paramRequeteSelect
  );
  console.log("url recuperees de la bdd: " + requestSelectResult );

  //si la requete abouti à un resultat nnon null
  //console.log("resultat url: " + requestSelectResult.length);
  if (requestSelectResult.length > 0) {
    //console.log("resultat url-2: " + requestSelectResult.length);
    //modification du chemin de l'image a suprimer
    let articleUrl = path.join(requestSelectResult[1]["url_article"]);

      console.log("url de la bdd + /images : " + articleUrl);
      


    //suppression du fichier image
    fs.unlink(articleUrl, (err) => {
      if (err) throw err;
        console.log(articleUrl + " deleted");
        res.status(500).json({ message_status: "fichiers non suprimés" });
    });
  }

  /* //requette preparéé de type delete
  const requeteDeleteAvis = `DELETE FROM article WHERE id = ?`;
  const paramRequetedeleteAvis = articleId;

  const requestResult = await sendRequest(
    res,
    connect,
    requeteDeleteAvis,
    paramRequetedeleteAvis
  );

  connect.end();

  //si l'objet result de la requete delete n' existe pas
  if (!requestResult) {
    res.status(500).json({ message: "impossible de suprimer l'article" });
  }

  //si nombre de ligne affectées ets differents de 1
  if (requestResult["affectedRows"] !== 1) {
    res.status(500).json({ message: "impossible de suprimer l'article" });
  } */
  //console.log("objet retour delete: " + Object.entries(requestResult));
  res.status(200).json({ message_status: "succes" });
}



// eslint-disable-next-line no-undef
module.exports = deleteOneArticle;
