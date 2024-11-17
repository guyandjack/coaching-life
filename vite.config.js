/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Assure-toi que path est importé correctement
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html", // Le chemin où le rapport sera généré
      open: true, // Ouvre automatiquement le rapport après le build
      gzipSize: true, // Affiche les tailles gzip des modules
      brotliSize: true, // Affiche les tailles brotli des modules
    }),
  ],
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.ttf", "**/*.webp"],

  base: "", // Modifie cette valeur si nécessaire
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correctement configuré pour les chemins relatifs
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        //page fr
        index: path.resolve(__dirname, "index.html"),
        quisuisje: path.resolve(__dirname, "public/fr/qui-suis-je.html"),
        prestation: path.resolve(
          __dirname,
          "public/fr/prestations-de-coaching-individuel-et-en-entreprise.html"
        ),
        avis: path.resolve(__dirname, "public/fr/temoignages-clients.html"),
        article: path.resolve(
          __dirname,
          "public/fr/article-coaching-developpement-personel-entreprise.html"
        ),
        cgu: path.resolve(
          __dirname,
          "public/fr/conditions-generales-utilisation.html"
        ),
        contact: path.resolve(
          __dirname,
          "public/fr/contactez-votre-coach-individuel-et-en-entreprise.html"
        ),
        dashboard: path.resolve(__dirname, "public/fr/dashboard.html"),
        login: path.resolve(__dirname, "public/fr/login.html"),
        mention: path.resolve(__dirname, "public/fr/mentions-legales.html"),
        politique: path.resolve(
          __dirname,
          "public/fr/politique-de-confidencialite.html"
        ),
        error404: path.resolve(__dirname, "error404.html"),

        //page en
        home: path.resolve(__dirname, "public/en/home.html"),
        aboutme: path.resolve(__dirname, "public/en/about-me.html"),
        services: path.resolve(
          __dirname,
          "public/en/services-of-individual-and-business-coaching.html"
        ),
        testimonial: path.resolve(
          __dirname,
          "public/en/customer-testimonials.html"
        ),
        contacten: path.resolve(
          __dirname,
          "public/en/contact-your-individual-and-business-coach.html"
        ),
        privacy: path.resolve(__dirname, "public/en/privacy-policy.html"),
        notices: path.resolve(__dirname, "public/en/legals-notices.html"),
        general: path.resolve(__dirname, "public/en/general-terms-of-use.html"),

        //page de
        startseite: path.resolve(__dirname, "public/de/startseite.html"),
        ubermich: path.resolve(__dirname, "public/de/uber-mich.html"),
        dienstleistungen: path.resolve(
          __dirname,
          "public/de/dienstleistungen-des-individuellen-und-unternehmens-coachings.html"
        ),
        kundenbeweertungen: path.resolve(
          __dirname,
          "public/de/kundenbewertungen.html"
        ),
        kontak: path.resolve(
          __dirname,
          "public/de/kontaktieren-sie-ihren-individuellen-und-unternehmenscoach.html"
        ),
        impressum: path.resolve(__dirname, "public/de/impressum.html"),
        politik: path.resolve(
          __dirname,
          "public/de/Geheimhaltungspolitik.html"
        ),
        allge: path.resolve(
          __dirname,
          "public/de/allgemeine-nutzungsbedingungen.html"
        ),
        // Ajoute d'autres entrées pour chaque page HTML si nécessaire
      },
    },
  },
});
