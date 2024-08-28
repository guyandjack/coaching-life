import { localOrProd } from "../../../UTILS/fonctions/testEnvironement";

let objectUrl = localOrProd();
let url = objectUrl.url;

let navBarContentFR = [
  {
    id: "accueil",
    text: "Accueil",
    href: `${url}/index.html`,
    href_alt_fr: `${url}/index.html`,
    href_alt_de: `${url}/public/de/startseite.html`,
    href_alt_en: `${url}/public/en/home.html`,
  },
  {
    id: "quisuisje",
    text: "Qui suis-je",
    href: `${url}/public/fr/qui-suis-je.html`,
    href_alt_fr: `${url}/public/fr/qui-suis-je.html`,
    href_alt_de: `${url}/public/de/über-mich.html`,
    href_alt_en: `${url}/public/en/about-me.html`,
  },
  {
    id: "prestation",
    text: "Prestations",
    href: `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html`,
    href_alt_fr: `${url}/public/fr/prestations-de-coaching-individuel-et-en-entreprise.html`,
    href_alt_de: `${url}/public/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html`,
    href_alt_en: `${url}/public/en/services-of-individual-and-business-coaching.html`,
  },
  {
    id: "temoignage",
    text: "Témoignages",
    href: `${url}/public/fr/temoignages-clients.html`,
    href_alt_fr: `${url}/public/fr/temoignages-clients.html`,
    href_alt_de: `${url}/public/de/kundenbewertungen.html`,
    href_alt_en: `${url}/public/en/customer-testimonials.html`,
  },
  {
    id: "contact",
    text: "Contact",
    href: `${url}/public/fr/contactez-votre-coach-individuel-et-en-entreprise.html`,
    href_alt_fr: `${url}/public/fr/contactez-votre-coach-individuel-et-en-entreprise.html`,
    href_alt_de: `${url}/public/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html`,
    href_alt_en: `${url}/public/en/contact-your-individual-and-business-coach.html`,
  },
  {
    id: "article",
    text: "Article",
    href: `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`,
    href_alt_fr: `${url}/public/fr/article-coaching-developpement-personel-entreprise.html`,
    href_alt_de: `${url}/public/de/artikle-coaching-persönlichkeitsentwicklung-unternehmen.html`,
    href_alt_en: `${url}/public/en/article-coaching-personal-development-business.html`,
  },
];

export { navBarContentFR };
