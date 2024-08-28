/* eslint-disable no-undef */
// Import des librairies
const bcrypt = require("bcrypt");

// Import des fonctions
const connectToDataBase = require("../../utils/functions/connectionDataBase.js");
const sendRequest = require("../../utils/functions/requestDataBase.js");

async function changePassword(req, res) {
  // Vérification de la présence des données nécessaires dans le corps de la requête
  const {
    password: actualPassword,
    newpassword: newPassword,
    
  } = req.body;
  const adminId = req.auth.admin;

  

  try {
    const connect = await connectToDataBase();
    // Récupération du mot de passe actuel de l'admin dans la base de données
    const requetePasswordAdmin = `SELECT password FROM admin WHERE id = ?`;
    const [requestResult] = await sendRequest(connect, requetePasswordAdmin, [
      adminId,
    ]);

    if (!requestResult) {
      connect.end();
      return res.status(404).json({ message: "Admin introuvable" });
    }

    // Vérification du mot de passe actuel
    const isValid = await bcrypt.compare(
      actualPassword,
      requestResult.password
    );
    if (!isValid) {
      connect.end();
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 5);

    // Mise à jour du mot de passe dans la base de données
    const requeteChangePassword = `UPDATE admin SET password = ? WHERE id = ?`;
    const updateResult = await sendRequest(connect, requeteChangePassword, [
      hashedPassword,
      adminId,
    ]);

    connect.end();

    if (!updateResult) {
      return res
        .status(500)
        .json({ message: "Impossible de changer le mot de passe" });
    }

    res
      .status(200)
      .json({ "message": "succes" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// eslint-disable-next-line no-undef
module.exports = changePassword;
