// realise un appel api pour generer un autre token

import { cleanTokenInLocalStorage } from "./cleanTokenInLocalStorage";
import { localOrProd } from "./testEnvironement";

let env = localOrProd();
let urlApi = env.urlApi;




async function refreshToken() {
  try {
    
    //recupere le token pour l' authentification api
    const token = localStorage.getItem("token");

    const response = await fetch(`${urlApi}/refresh-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("erreur http");
    }

    const data = await response.json();
    if (!data) {
      return console.log("pas de donnée impossible de rafraichir le token");
    }

    //suprime les sauvegardes de l' ancien token

    cleanTokenInLocalStorage(
      "lastCountUpdated",
      "lastDateUpdated",
      "token",
      "time",
      "expire"
    );
    //stock le nouveau token et sa date de creation dans le localstorage
    localStorage.setItem("token", `${data.token}`);
    localStorage.setItem("time", `${data.time}`);
    localStorage.setItem("expire", `${data.expire}`);

    //demontage et remomtage du composant en rechargent la page pour recuperer le nouveau token
    //window.location.reload();
    return true
  } catch (e) {
    console.log("erreur lors du fetch refresh" + e.message);
    return false
  }
}


export {refreshToken}