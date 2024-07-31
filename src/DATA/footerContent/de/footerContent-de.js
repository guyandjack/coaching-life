import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let url = localOrProd();

let footerContentDE = [
  {
    text: "Impressum",
    href: `${url}/de/impressum.html`,
  },

  {
    text: "Datenschutzrichtlinie",
    href: `${url}/de/datenschutzrichtlinie.html`,
  },
  {
    text: "Nutzungsbedingungen",
    href: `${url}/de/nutzungsbedingungen.html`,
  },
];

export { footerContentDE };
