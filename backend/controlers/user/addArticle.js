// eslint-disable-next-line no-unused-vars, no-undef

// eslint-disable-next-line no-unused-vars
function addArticleOnBlog(req, res) {
  // eslint-disable-next-line no-unused-vars
  let masque = /\W/g;
  let title = req.body.title;
  let filesList = req.files.addFile;
  console.log("copi du tableau addFile: " + filesList);
  let newTitle = title.split(masque).join("").toLowerCase();

  for (let i = 0; i < title.length; i++) {
    // eslint-disable-next-line no-unused-vars
    let newNameImg = newTitle + i + 1;
    //filesList[i].name = newNameImg;
  }
  console.log("files Liste : " + filesList);

  try {
    /* console.log(title);
    //console.log(req.files.addFile[0].name);
    console.log(filesList[0].name);

    filesList[0].name = "tarte";

    console.log(filesList); */

    //console.log("tableau de fichier: " + bodyFiles);

    res.status(200).json({ message: "fichier recus" });
  } catch (error) {
    console.log("erruer: " + error.message);
    res.status(502).json({ message: "impossible de lire les fichier" });
  }
}

// eslint-disable-next-line no-undef
module.exports = addArticleOnBlog;
