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
        main: path.resolve(__dirname, "index.html"),
        about: path.resolve(__dirname, "public/fr/qui-suis-je.html"),
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
        error404: path.resolve(__dirname, "public/error404.html"),
        // Ajoute d'autres entrées pour chaque page HTML si nécessaire
      },
    },
  },
});
