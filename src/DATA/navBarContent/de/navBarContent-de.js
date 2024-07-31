import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let url = localOrProd();

let navBarContentDE = [
  {
    id: "accueil",
    text: "Startseite",
    href: `${url}/de/startseite.html`,
    href_alt_fr: `${url}/index.html`,
    href_alt_de: `${url}/de/startseite.html`,
    href_alt_en: `${url}/en/home.html`,
  },
  {
    id: "prestation",
    text: "Dienstleistungen",
    href: `${url}/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html`,
    href_alt_fr: `${url}/fr/prestations-de-coaching-individuel-et-en-entreprise.html`,
    href_alt_de: `${url}/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html`,
    href_alt_en: `${url}/en/services-of-individual-and-business-coaching.html`,
  },
  {
    id: "quisuisje",
    text: "Über mich",
    href: `${url}/de/uber-mich.html`,
    href_alt_fr: `${url}/fr/qui-suis-je.html`,
    href_alt_de: `${url}/de/uber-mich.html`,
    href_alt_en: `${url}/en/about-me.html`,
  },
  {
    id: "temoignage",
    text: "Kundenbewertungen",
    href: `${url}/de/kundenbewertungen.html`,
    href_alt_fr: `${url}/fr/temoignages-clients.html`,
    href_alt_de: `${url}/de/kundenbewertungen.html`,
    href_alt_en: `${url}/en/customer-testimonials.html`,
  },
  {
    id: "contact",
    text: "Kontakt",
    href: `${url}/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`,
    href_alt_fr: `${url}/fr/contactez-votre-coach-individuel-et-en-entreprise.html`,
    href_alt_de: `${url}/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`,
    href_alt_en: `${url}/en/contact-your-individual-and-business-coach.html`,
  },
];

export { navBarContentDE };
