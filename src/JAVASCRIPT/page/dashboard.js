import { smoothScroll } from "../../UTILS/fonctions/scrollInView.js";
//import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import {cleanTokenInLocalStorage } from "../../UTILS/fonctions/cleanTokenInLocalStorage.js";

//let urls = localOrProd();
//let urlBase = urls.url;
/**
 * -1- redirige l' utilisateur si il n' est pas authentifier en verifiant la presence du token
 * 
 * -2- vide le local storage si auncu token detecté
 * ( evite la persistance de "lastDateUpdated" et "lastCountUpdated" generé par le countdown)
 */
/* window.onload = () => {
    
    if (!localStorage.getItem("token") || !localStorage.getItem("expire")) {
        let page = document.querySelector(".page-dashboard");
        page.style.filter = "blur(5px)";
        cleanTokenInLocalStorage(
            "lastDateUpdated",
            "lastCountUpdated",
            "token",
            "expire",
            "time"
        );
       
        setTimeout(() => {
            alert("Utilisateur non autorisé....vous allez être redirigé.")
            window.location.href = `${urlBase}/public/fr/login.html`;
        }, 500)
    
    
  }
}; */
smoothScroll("menu-link");
smoothScroll("menu-fixed");
