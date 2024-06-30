import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/coaching-life/",
  plugins: [react()],
  serveur: {
    open: "./src/HTML/fr/prestations-de-coaching-individuel-et-en-entreprise.html",
  },
});
