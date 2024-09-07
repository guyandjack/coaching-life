/* eslint-disable no-undef */
// Import des librairies
const nodemailer = require("nodemailer");
const testEnv = require("../../utils/functions/checkEnvironement");

let envType = testEnv.defineUrl();

// Fonction de configuration du transporteur en fonction de l'environnement
function getTransporterConfig(envType) {
  const isProduction = envType !== "dev";
  return {
    host: process.env[isProduction ? "MAILBOX_PROD_HOST" : "MAILBOX_DEV_HOST"],
    auth: {
      user: process.env[
        isProduction ? "MAILBOX_PROD_ADRESS" : "MAILBOX_DEV_ADRESS"
      ],
      pass: process.env[
        isProduction ? "MAILBOX_PROD_PASSWORD" : "MAILBOX_DEV_PASSWORD"
      ],
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
}


const transporter = nodemailer.createTransport(
  getTransporterConfig(envType.env)
);

// Fonction de validation des données du formulaire
function validateFormData(body) {
  if (Object.keys(body).length < 4) {
    throw new Error("Corps de la requête incomplet");
  }
}

// Extraction des données du formulaire
function extractFormData(body) {
  return {
    mail: body.email,
    lastname: body.lastname,
    firstname: body.firstname,
    message: body.content,
  };
}

// Envoi de l'email
async function sendMail(userdata) {
  const mailOptions = {
    from: userdata.mail,
    to: transporter.options.auth.user,
    subject: "User message from 'SO-COACHING.ch'",
    text: userdata.message,
  };

  return transporter.sendMail(mailOptions);
}

// Contrôleur principal pour traiter la requête de contact
async function contact(req, res) {
  try {
    validateFormData(req.body);
    const userdata = extractFormData(req.body);

    await sendMail(userdata);
    res.status(201).json({ message_status: "sended" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error.message);
    res.status(500).json({ message_status: "error", error: error.message });
  }
}

module.exports = contact;
