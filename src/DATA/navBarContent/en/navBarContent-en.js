import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let url = localOrProd();

let navBarContentEN = [
  {
    id: "accueil",
    text: "Home",
    href: `${url}/public/en/home.html`,
    href_alt_fr: `${url}/index.html`,
    href_alt_de: `${url}/public/de/startseite.html`,
    href_alt_en: `${url}/public/en/home.html`,
  },
  {
    id: "prestation",
    text: "Services",
    href: `${url}/public/en/services-of-individual-and-business-coaching.html`,
    href_alt_fr: `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html`,
    href_alt_de: `${url}/public/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html`,
    href_alt_en: `${url}/public/en/services-of-individual-and-business-coaching.html`,
  },
  {
    id: "quisuisje",
    text: "About me",
    href: `${url}/public/en/about-me.html`,
    href_alt_fr: `${url}/public/fr/qui-suis-je.html`,
    href_alt_de: `${url}/public/de/über-mich.html`,
    href_alt_en: `${url}/public/en/about-me.html`,
  },
  {
    id: "temoignage",
    text: "Testimonials",
    href: `${url}/public/en/customer-testimonials.html`,
    href_alt_fr: `${url}/public/fr/temoignages-clients.html`,
    href_alt_de: `${url}/public/de/kundenbewertungen.html`,
    href_alt_en: `${url}/public/en/customer-testimonials.html`,
  },
  {
    id: "contact",
    text: "Contact",
    href: `${url}/public/en/contact-your-individual-and-business-coach.html`,
    href_alt_fr:
      `${url}/public/fr/contactez-votre-coach-individuel-et-en-entreprise.html`,
    href_alt_de:
      `${url}/public/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`,
    href_alt_en:
      `${url}/public/en/contact-your-individual-and-business-coach.html`,
  },
];
export { navBarContentEN };
