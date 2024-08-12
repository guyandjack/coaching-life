//controler send mail

//import des librairies
// eslint-disable-next-line no-undef
const nodemailer = require("nodemailer");

//import des functions
// eslint-disable-next-line no-undef
const testEnv = require("../../utils/functions/checkEnvironement");

// objet de configuration pour nodeMailer et sendMail
let objectConfigTransporter = {};

let envType = testEnv.devOrProd();

switch (envType) {
  case "dev":
    objectConfigTransporter = {
      // eslint-disable-next-line no-undef
      host: process.env.MAILBOX_DEV_HOST,
      auth: {
        // eslint-disable-next-line no-undef
        user: process.env.MAILBOX_DEV_ADRESS,
        // eslint-disable-next-line no-undef
        pass: process.env.MAILBOX_DEV_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      }, // Use
    };
    console.log(
      "objet de config de transporter en dev:" + objectConfigTransporter
    );

    break;
  case "prod":
    objectConfigTransporter = {
      // eslint-disable-next-line no-undef
      host: process.env.MAILBOX_PROD_HOST,
      auth: {
        // eslint-disable-next-line no-undef
        user: process.env.MAILBOX_PROD_ADRESS,
        // eslint-disable-next-line no-undef
        pass: process.env.MAILBOX_PROD_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      }, // Use
    };
    console.log(
      "objet de config de transporter en prod:" + objectConfigTransporter
    );
    break;

  default:
    console.log("imposssible de creer l' objet de config");
    break;
}

//objet de configuration pour sendMail
const transporter = nodemailer.createTransport(
  /* {
  host: "smtp.tutanota.com",
  auth: {
    // eslint-disable-next-line no-undef
    user: process.env.MAILBOX_DEV_ADRESS,
    // eslint-disable-next-line no-undef
    pass: process.env.MAILBOX_DEV_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }, // Use `true` for port 465, `false` for all other ports
}; */
  objectConfigTransporter
);

//variable locale
let isValid = null;

//getuserEmail
async function getEmail(bodyparsed) {
  return bodyparsed.email;
}
//getuserLastname
async function getLastname(bodyparsed) {
  return bodyparsed.lastname;
}
//getuserfirstname
async function getFirstname(bodyparsed) {
  return bodyparsed.firstname;
}
//getusermessage
async function getMessage(bodyparsed) {
  return bodyparsed.content;
}

//check captcha
async function checkCaptcha(key) {
  console.log(key);
  return true;
}

async function checkFormDataContact(req, res) {
  console.log("contenu du body: " + JSON.stringify(req.body));

  //controle si le nombre minimum de propriete attendu du formulaire est correcte(nom,prenom,email,message)
  if (Object.keys(req.body).length < 4) {
    isValid = false;
    return res.status(500).json({ message: "corps de la requette incomplet" });
  }

  //controle si le user est un humain via recaptcha
  if (!checkCaptcha("key")) {
    isValid = false;
    return res
      .status(500)
      .json({ message: "service google indisponible ou reCaptcha invalid" });
  }
  isValid = true;
}

async function getFormDataContact(req) {
  let bodyParsed = JSON.parse(JSON.stringify(req.body));

  //recuperation valeur de email dans le body
  const userEmail = await getEmail(bodyParsed);
  console.log("useremail: " + userEmail);

  //recuperation valeur de email dans le body
  const userLastname = await getLastname(bodyParsed);
  console.log("userelastname: " + userLastname);

  //recuperation valeur de email dans le body
  const userFirstname = await getFirstname(bodyParsed);
  console.log("userfirstname: " + userFirstname);

  //recuperation valeur de email dans le body
  const userMessage = await getMessage(bodyParsed);
  console.log("usermessage: " + userMessage);

  return {
    mail: userEmail,
    lastname: userLastname,
    firstname: userFirstname,
    message: userMessage,
  };
}

async function postMail(req, res, userdata) {
  console.log("email du user:" + userdata.mail);
  console.log("object config: " + JSON.stringify(objectConfigTransporter));
  let mailTo = objectConfigTransporter["auth"]["user"];
  let mailOptions = {
    from: userdata.mail,
    to: mailTo,
    subject: "user message from 'SO-COACHING.ch'",
    text: userdata.message,
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.status(500).json({ message_status: "error" });
      console.log("erreur d'envois du mail: " + error.message);
    } else {
      res.status(201).json({ message_status: "sended" });
    }
  });
}

async function contact(req, res) {
  await checkFormDataContact(req, res);
  if (isValid) {
    let data = await getFormDataContact(req);
    await postMail(req, res, data);
  }
}

// eslint-disable-next-line no-undef
module.exports = contact;
