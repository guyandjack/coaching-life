import { useEffect } from "react";


const EcoIndexBadge = () => {
    //const [isExist, setIsExist] = usestate(false);
    useEffect(() => {
        const badgeContainer = document.querySelector(".container-badge");
        
        // Vérifie si le script existe déjà pour éviter les doublons
        if (
            !document.querySelector(
                'script[src="https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@3/assets/js/ecoindex-badge.js"]'
            )
        ) {
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/gh/cnumr/ecoindex_badge@3/assets/js/ecoindex-badge.js";
            script.defer = true;
            document.head.appendChild(script);
        }

        // Vérifie si le badge existe déjà avant d'ajouter
        if (!document.getElementById("ecoindex-badge")) {
            const badgeDiv = document.createElement("div");
            badgeDiv.id = "ecoindex-badge";
            badgeDiv.setAttribute("data-theme", "dark");
            badgeContainer.appendChild(badgeDiv);
        }
    }, []); // [] pour s'exécuter uniquement lors du montage du composant

   
};

function GetNote() {
    async function fetchApi() {
      const urlApi = "https://bff.ecoindex.fr/api/results/?url=";
      const urlCurrent = "https://socoaching.ch/index.html"; // URL actuelle
      const urlToFetch = encodeURI(`${urlApi}${urlCurrent}`); // Encode l'URL

      try {
        const response = await fetch(urlToFetch, { method: "GET" });

        // Vérifie si la réponse est OK (statut HTTP 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Récupère le contenu de la réponse JSON
        const result = await response.json();
        console.log("Résultat de l'API :", result);
        return result; // Retourne le résultat
    } catch (error) {
        console.error("Erreur lors du fetch :", error);
        throw error; // Relance l'erreur pour permettre une gestion en amont
    }
}
let resultPage = fetchApi();
console.log("Résultat de l'API :", resultPage);
}




export { EcoIndexBadge, GetNote};
