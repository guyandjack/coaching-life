import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let objectUrl = localOrProd();
let url = objectUrl.url;


let footerContentDE = [
  {
    text: "Impressum",
    href: `${url}/public/de/impressum.html`,
  },

  {
    text: "Geheimhaltungspolitik",
    href: `${url}/public/de/geheimhaltungspolitik.html`,
  },
  {
    text: "Allgemeine Nutzungsbedingungen",
    href: `${url}/public/de/allgemeine-nutzungsbedingungen.html`,
  },
];

export { footerContentDE };
