/**
 * Permet de réaliser une requête préparée vers une base de données.
 *
 * @param {Object} connection - Objet connection MySQL.
 * @param {string} requestType - Requête SQL préparée.
 * @param {Array} requestParam - Paramètres de la requête préparée.
 * @return {Promise<Array|null>} Le résultat de la requête, ou null en cas d'échec.
 */
async function sendRequest(connection, requestType, requestParam) {
  try {
    const [result] = await connection.execute(requestType, requestParam);
    if (result !== null) {
      
      return result;
    }
    return null
  } catch (err) {
    
    console.error(`Erreur lors de l'exécution de la requête : ${err.message}`);
    return null;
  }
}

// eslint-disable-next-line no-undef
module.exports = sendRequest;
