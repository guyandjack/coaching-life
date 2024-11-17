//detecte la langue uilise sur la page


    
    function getPageLanguage() {
      const divHtml = document.documentElement;
      const lang = divHtml.getAttribute("lang");

      // Vérifie si la langue est reconnue parmi les options ("fr", "en", "de")
      return ["fr", "en", "de"].includes(lang) ? lang : null;
    }



export { getPageLanguage}