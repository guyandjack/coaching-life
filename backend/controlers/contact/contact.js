//controler send mail

//import des librairies
// eslint-disable-next-line no-undef
const nodemailer = require("nodemailer");

//objet de configuration pour sendMail
const transporter = nodemailer.createTransport({
  host: "smtp.orange.fr",
  auth: {
    // eslint-disable-next-line no-undef
    user: process.env.MAILBOX_DEV_ADRESS,
    // eslint-disable-next-line no-undef
    pass: process.env.MAILBOX_DEV_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }, // Use `true` for port 465, `false` for all other ports
});

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
  let mailOptions = {
    from: userdata.mail,
    to: "g-dupanloup@wanadoo.fr",
    subject: "user message from 'SO-COACHING.ch'",
    text: userdata.message,
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.status(300).json({ message_status: error });
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
