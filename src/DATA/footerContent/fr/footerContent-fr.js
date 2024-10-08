import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let objectUrl = localOrProd();
let url = objectUrl.url;

let footerContentFR = [
  {
    text: "Mentions Légales",
    href: `${url}/public/fr/mentions-legales.html`,
  },

  {
    text: "Politique de confidentialité",
    href: `${url}/public/fr/politique-de-confidencialite.html`,
  },
  {
    text: "Conditions générales d'utilisation",
    href: `${url}/public/fr/conditions-generales-utilisation.html`,
  },

  {
    text: "Login",
    href: `${url}/public/fr/login.html`,
  },
];

export { footerContentFR };
