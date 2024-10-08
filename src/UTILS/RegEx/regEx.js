/********************** expressions regulieres ******************/

//Motif qui autorise que trois chaine de carractere Monsiuer,Madame et Mademoiselle
const masqueCivilite =
  /^([M][o][n][s][i][e][u][r]||[M][a][d][a][m][e]||[M][a][d][e][m][o][i][s][e][l][l][e])$/;

//Motif qui autorise lettres majuscules, minuscules, undescore,
//apostrophe, point, trait d'union et tout caractére d' espacement
//Nombre de carracteres compris entre  2 et 50.
const masqueText = /^[A-Za-z_'.-\s]{2,50}$/;

/***** Permet le controle d'une input  "email" ***********/

//Motif "facultatif" qui autorise un nombre ou un chiffre entre 0 et 4 carracteres
//suivi dun motif "obligatoire" contenant soit des chiffres, lettres minuscules, underscore, apostrophe, trait d'union,  entre 2 et 30 carracteres
//suivi d'un arobase "obligatoire"
//suivi d'un motif "obligatoire" contenant soit des chiffres, lettres minuscules, underscore, apostrophe, trait d'union,  entre 2 et 20 carracteres
//suivi d'un point "obligatoire"
//suivi d'un motif" obligatoire" contenant soit des chiffres, lettres minuscules ou majuscules, underscore, apostrophe,point,trait d'union entre 2 et 15 caracteres
const masqueMail =
  /^[0-9]{0,4}[0-9a-z_'.-]{2,30}@[0-9a-z_'.-]{2,20}\.[0-9a-zA-Z_'.-]{2,15}$/;

/***** Permet le controle de l' input "content" (le corps du message)  **********/

//Motif qui autorise tous les carracteres à l' exeption des balises ouvrantes, accolades, crochets, signe multiplié et signe logique (ou)
// eslint-disable-next-line no-useless-escape
const masqueMessage = /^[^<>{}\[\]*|]{20,2000}$/;

//Motif qui permet de controler si une expression est un nombre entier positif
const masqueNumberInt = /^[^\-\D]?[0-9]{1,}$/;

//Motif qui permet de controler si une expression est un chiffre a virgule
const masqueNumberFloat = /^([0-9]{1}||[0-9]{1}[,.]{1}[0-9]{1,2})$/;

//Motif qui
const masquePassWord =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,}$/;

const masqueAlphanumeric = /^[0-9A-Za-z_'.-\s]{2,50}$/;

//masque qui permet de controler si une chaine de caractere a une extension jpg/jpeg/png
const masqueExtensionImg = /^[\w-]{2,}(\.jpg|\.jpeg|\.png)$/i;
const masqueExtensionHtml = /^[\w-]{2,}(\.html)$/i;
export {
  masqueCivilite,
  masqueText,
  masqueMail,
  masqueMessage,
  masqueNumberInt,
  masqueNumberFloat,
  masquePassWord,
  masqueAlphanumeric,
  masqueExtensionImg,
  masqueExtensionHtml,
};
