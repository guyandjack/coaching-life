//controler qui permet de suprimer un article de la bdd

//import des librairies
// eslint-disable-next-line no-undef, no-unused-vars
const fs = require("fs").promises;
// eslint-disable-next-line no-undef, no-unused-vars
const path = require("path");

//import des fonctions

// eslint-disable-next-line no-undef
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");

// eslint-disable-next-line no-undef
const sendRequest = require("../../utils/functions/requestDataBase.js");

// eslint-disable-next-line no-undef, no-unused-vars
let urlImageDEV = process.env.URL_BASE_IMAGE_ARTICLE_DEV;
//declaration des fonctions



// eslint-disable-next-line no-unused-vars
 // Utilisation des promesses pour simplifier la gestion des fichiers

async function deleteOneArticle(req, res) {
  const articleId = req.body.id;

  let tabErrorDeleteFile = [];
  try {
    const connect = await connectToDataBase();

    // Récupération des URLs des fichiers à supprimer
    const requeteSelect = `SELECT url_img, url_article FROM article WHERE id = ?`;
    const [result] = await sendRequest(connect, requeteSelect, [articleId]);

    if (!result) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    //deserialise le tableau contenent l' url de l' image
    result.url_img = JSON.parse(result.url_img);

    // Suppression des fichiers image
    if (Array.isArray(result.url_img) && result.url_img.length > 0) {
      await Promise.all(
        result.url_img.map(async (url) => {
          try {
            const cleanUrl = url.split(/3000[/\\]/)[1].trim();
            await fs.rm(cleanUrl);
            console.log(`Fichier image ${cleanUrl} supprimé avec succès.`);
          } catch (err) {
            tabErrorDeleteFile.push(`Impossible de supprimer l'image ${url}`);
            console.error(
              `Erreur lors de la suppression de l'image ${url}:`,
              err
            );
          }
        })
      );
    }

    if (tabErrorDeleteFile.length > 0) {
      return res.status(500).json({
        message:
          "Erreur lors de la suppression de/des images dans son repertoir",
      });
    }

    //deserialise le tableau contenent l' url du fichier article
    result.url_article = JSON.parse(result.url_article);
    // Suppression des fichiers articles
    if (Array.isArray(result.url_article) && result.url_article.length > 0) {
      await Promise.all(
        result.url_article.map(async (url) => {
          try {
            const cleanUrl = url.split(/3000[/\\]/)[1].trim();
            await fs.rm(cleanUrl);
            console.log(`Fichier article ${cleanUrl} supprimé avec succès.`);
          } catch (err) {
            tabErrorDeleteFile.push(`Impossible de supprimer l'article ${url}`);
            console.error(
              `Erreur lors de la suppression de l'article ${url}:`,
              err
            );
          }
        })
      );
    }

    if (tabErrorDeleteFile.length > 0) {
      return res.status(500).json({
        message:
          "Erreur lors de la suppression de l' article dans son repertoir",
      });
    }
    // Suppression de l'article dans la base de données
    const requeteDelete = `DELETE FROM article WHERE id = ?`;
    const deleteResponse = await sendRequest(connect, requeteDelete, [
      articleId,
    ]);

    if (!deleteResponse) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la suppression en BDD" });
    }

    res.status(200).json({
      message_status: "succes",
      errors: tabErrorDeleteFile.length > 0 ? tabErrorDeleteFile : null,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression",
      error: error,
      errorTab: tabErrorDeleteFile
    });
  }
}




// eslint-disable-next-line no-undef
module.exports = deleteOneArticle
