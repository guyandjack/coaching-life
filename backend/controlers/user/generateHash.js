// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");

async function generateHash(whiteWord) {
  try {
    // Génération du hash avec un facteur de coût de 5
      const hashedWord = await bcrypt.hash(whiteWord, 5);
      console.log("mot crypté: " + hashedWord)
    return hashedWord;
  } catch (e) {
    console.error("Error during hashing:", e.message);
    return null;
  }
}

// eslint-disable-next-line no-undef
module.exports = generateHash;
