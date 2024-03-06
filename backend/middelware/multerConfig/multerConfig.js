//Middelware de configuration pour la gestion des fichier uimages uploader par le user

// eslint-disable-next-line no-undef
const multer = require("multer");

const mimeType = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");

    callback(null, origin);
  },
});
