import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let url = localOrProd();

let footerContentFR = [
  {
    text: "Mentions Légales",
    href: `${url}/fr/mentions-legales.html`,
  },

  {
    text: "politique de confidentialité",
    href: `${url}/fr/politique-de-confidencialite.html`,
  },
  {
    text: "Conditions générales d'utilisation",
    href: `${url}/fr/conditions-generales-utilisation.html`,
  },

  {
    text: "login",
    href: `${url}/fr/login.html`,
  },
];

export { footerContentFR };
