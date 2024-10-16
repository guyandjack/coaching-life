import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let objectUrl = localOrProd();
let url = objectUrl.url;


let footerContentEN = [
  {
    text: "Legal Notice",
    href: `${url}/public/en/legals-notices.html`,
  },

  {
    text: "Privacy Policy",
    href: `${url}/public/en/privacy-policy.html`,
  },
  {
    text: "Terms of Use",
    href: `${url}/public/en/general-terms-of-use.html`,
  },
];

export { footerContentEN };
