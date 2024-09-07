
import { localOrProd } from "../../../UTILS/fonctions/testEnvironement.js";

let result = localOrProd();
let url = result.url;


let cardContentResumeFR = {
  title: "Partageons nos idées",
  imgUrl: `${url}/src/assets/sophie/sophie-chevrolet.jpg`,
  footer_link:
    "Prêts à explorer de nouvelles perspectives ? Contactez-moi pour en savoir plus.",
  footer_link_href: `${url}/public/fr/contactez-votre-coach-individuel-et-en-entreprise.html#RC-form-contact`,
};
export { cardContentResumeFR };
