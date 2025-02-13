// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");

function verifAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN);
    // eslint-disable-next-line no-unused-vars
    const adminId = decodedToken.adminId;
     console.log("Token valide, expire à :", new Date(decodedToken.exp * 1000));

    req.auth = {
      admin: adminId,
    };
    next();
  } catch (error) {
    console.log("error: " + error.message);
    res.status(401).send("utilisateur non reconnu!");
  }
}

// eslint-disable-next-line no-undef
module.exports = verifAuth;
