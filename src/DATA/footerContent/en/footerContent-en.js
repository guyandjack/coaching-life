import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let url = localOrProd();

let footerContentEN = [
  {
    text: "Legal Notice",
    href: `${url}/public/en/legal-notice.html`,
  },

  {
    text: "Privacy Policy",
    href: `${url}/public/en/privacy-policy.html`,
  },
  {
    text: "Terms of Use",
    href: `${url}/public/en/terms-of-use.html`,
  },
];

export { footerContentEN };
