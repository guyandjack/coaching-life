
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");

//import des fonctions
// eslint-disable-next-line no-undef
const checkEnv = require("../../utils/functions/checkEnvironement.js");
let expIn = "20m";
let exp = 20;
if (checkEnv.devOrProd() == "dev") {
  expIn = "20s";
  
  
}

function keepConnection(req, res) {
   
    try {
         
        let date = new Date;
        // Génération du moveau token JWT
        const newToken = jwt.sign(
            { adminId: req.auth.admin },
            // eslint-disable-next-line no-undef
            process.env.PRIVATE_KEY_TOKEN,
            { expiresIn: expIn }
        );

        // Envoi de la réponse
        return res.status(200).json({
            message: "succes",
            token: newToken,
            time: date.getTime(),
            expire: exp,
    
        })
       
    }
    catch (err) {
        res.status(500).send(err.message)
        console.log("erreur creation nouveau token: " + err.message)
    }
    
    
    
}

// eslint-disable-next-line no-undef
module.exports = keepConnection