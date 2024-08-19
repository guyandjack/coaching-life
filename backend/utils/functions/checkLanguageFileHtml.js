// Fonction pour détecter la langue du contenu HTML
function detectLanguage(content) {
  if (content.includes('<html lang="fr">')) {
    return "fr";
  } else if (content.includes('<html lang="de">')) {
    return "de";
  } else if (content.includes('<html lang="en">')) {
    return "en";
  } else {
    return "unknown";
  }
}

// eslint-disable-next-line no-undef
module.exports = detectLanguage;
