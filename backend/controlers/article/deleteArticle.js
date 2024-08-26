//controler qui permet de suprimer un article de la bdd

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const fs = require("fs");
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

//import des fonctions

// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

// eslint-disable-next-line no-undef
let urlImageDEV = process.env.URL_BASE_IMAGE_ARTICLE_DEV;
//declaration des fonctions



// eslint-disable-next-line no-unused-vars
async function deleteOneArticle(req, res) {
  const articleId = req.body.id;
  let connect = await connectToDataBase();

  let tabErrorDeleteFile = [];
  

  //requette préparé de type select
  const requeteSelect = `SELECT url_img, url_article FROM article WHERE id = ?`;
  const paramRequeteSelect = [articleId];

  const response =  sendRequest(
    connect,
    requeteSelect,
    paramRequeteSelect
  );

  if (response == null) {
    res.status(500).json({"message_status": "une erreur est survenue lors de la requete"})
    
  }
    
  response
    .then((result) => {
      /*******************************************************
       * ************** supression des fichiers image*********
       * ***************************************************/

      let objectResult = JSON.parse(JSON.stringify(result));
      //console.log("string de url de image: " + objectResult[0].url_img);
      
        let stringUrl = objectResult[0].url_img;
        // eslint-disable-next-line no-useless-escape
        if (stringUrl.startsWith("[")) {
          // eslint-disable-next-line no-useless-escape
          let stringClean = stringUrl.replace(/[\[\],"]/g, "");
          console.log("string clean de url de image: " + stringClean);
          let tabUrlRelative = stringClean.split(urlImageDEV);
          console.log("tableau url relative de url image: " + tabUrlRelative);

          tabUrlRelative.forEach((url) => {
            fs.rm(url, (err) => {
              if (err) {
                tabErrorDeleteFile.push(`fichier- ${url} -imposssible à effacer`);
                console.error("Erreur lors de la suppression du fichier :", err);
              } else {
                console.log("Fichier image supprimé avec succès.");
              }
            });
          });
        } else {
          let urlRelative = stringUrl.replace(urlImageDEV, "");
          console.log(" url relative 2 de image: " + urlRelative);
           fs.rm(urlRelative, (err) => {
            if (err) {
              console.error("Erreur lors de la suppression du fichier :", err);
            } else {
              console.log("Fichier image supprimé avec succès.");
            }
          }); 
        }
      
      /*******************************************************
       * ************** supression du fichiers article*********
       * ***************************************************/
      let stringUrlArticle = objectResult[0].url_article;
      console.log("url de article: " + stringUrlArticle)
      fs.rm(stringUrlArticle, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
          tabErrorDeleteFile.push(
            `fichier- ${stringUrlArticle} -imposssible à effacer`
          );
        } else {
          console.log("Fichier article supprimé avec succès.");
        }
      }); 

      if (tabErrorDeleteFile.leng > 0) {
        res.status(500).json({
          message_status: "erreur lors de la supression des fichiers",
        });
      }

      /********************************************************************
       * ************** requete pour suprimer l' article de la bdd*********
       * *****************************************************************/

      //requette préparé de type select
      const requeteDelete = `DELETE from article WHERE id = ?`;
      const paramRequeteDelete = [articleId];

      const response = sendRequest(connect, requeteDelete, paramRequeteDelete);

      if (response == null) {
        res
          .status(500)
          .json({
            message_status: "une erreur est survenue lors la supression en bdd",
          });
      }

      res.status(200).json({ message_status: "succes" });
    })
  .catch((e) => {
    console.log("errorsss: " + e);
    res.status(500).json({"message_status": "une erreur est survenue lors de la requete"})

    })


  

  
}



// eslint-disable-next-line no-undef
module.exports = deleteOneArticle;
