//component refresToken

import { useState, useEffect, useRef } from "react";
//import { IoCompassOutline } from "react-icons/io5";
import "../../style/CSS/refreshtoken.css";

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import { cleanTokenInLocalStorage } from "../../UTILS/fonctions/cleanTokenInLocalStorage.js";

let env = localOrProd();
let urlApi = env.urlApi;
let urlBase = env.url;
let mode = env.mode;

//determine le temps (s) a pertir du quel le countdown s' affiche
let timeShow = 120;
if (mode == "dev") {
  timeShow = 10;
}

function RefreshToken() {
  //sate "booleen" quigere affichage de composants
  //const [isComponentVisible, setIsComponentVisible] = useState(true);
  //const [isDialogVisible, setIsDialogVisible] = useState(false);

  //state "number" qui met a jour le coundown
  const [count, setCount] = useState(null);

  // constante d' initialisation
  const refTokenLife = useRef(null);
  const refTokenBirth = useRef(null);
  const refDeltaBirth = useRef(null);
  const refTokenExpire = useRef(null);

  // constante relative aux element du dom
  const refreshElement = useRef(null);
  const refreshDialog = useRef(null);

  //instance de l' objet DATE
  let date = new Date();

  //declaration des fonctions

  /**
   *recupere les informations du local storage et initialise les varibles
   *@return void
   */
  function getInfoFromLocalStorage() {
    //recuperation des dernieres valeur du count
    let lastCountUpdated = Number(localStorage.getItem("lastCountUpdated"));
    console.log("lastcountupdate: " + lastCountUpdated);

    let lastDateUpdated = Number(localStorage.getItem("lastDateUpdated"));
    console.log("lastdateupdate: " + lastDateUpdated);

    let actualDate = parseInt(date.getTime() / 1000);
    console.log("actual date: " + actualDate);

    //date (en seconde) de creation du token  sur le serveur
    refTokenBirth.current = parseInt(
      Number(localStorage.getItem("time")) / 1000
    );
    console.log("storage tokenBirth: " + refTokenBirth.current);

    //dure de vie (en seconde) du token implementer sur le serveur
    refTokenExpire.current = parseInt(Number(localStorage.getItem("expire")));
    console.log("storage tokenExpire: " + refTokenExpire.current);

    //decalage entre la date de cretaion sur serveur et date de traitement client
    refDeltaBirth.current = parseInt(
      date.getTime() / 1000 - refTokenBirth.current
    );
    console.log("deltabirth: " + refDeltaBirth.current);

    //duree de vie du token a partir de sa date de creation sur le serveur
    if (lastCountUpdated > 0 && lastDateUpdated > 0) {
      //calcul du temps de sortie de page par le client
      let duringTimeOut = actualDate - lastDateUpdated;

      refTokenLife.current = lastCountUpdated - duringTimeOut;
      setCount(refTokenLife.current);
      console.log("init Count -1-: " + count);
    } else {
      refTokenLife.current =
        refTokenBirth.current + refTokenExpire.current - refDeltaBirth.current;
      console.log("refTokenLive: " + refTokenLife.current);

      setCount(refTokenLife.current - refTokenBirth.current);
      console.log("init Count -2-: " + count);
    }
  }

  // realise un appel api pour generer un autre token
  async function refreshToken() {
    try {
      //const response = await fetch("http://localhost:3000/api/refresh-token");
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
      window.location.reload();
    } catch (e) {
      console.log("erreur lors du fetch refresh" + e.message);
    }
  }

  useEffect(() => {
    getInfoFromLocalStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //lance le decompte d' expiration du token un fois le composant monte
  useEffect(() => {
    // evite de cerer un countdown si count n'existe pas
    if (count === null) {
      return;
    }

    let idCounter;

    //si count positif on creer/continu un countdown
    // la deconnexion peut se faire via le composant "collapse"
    //si une autre connexion est réalisé le "countdown" sera fausse par "lasdareUpdated" et "lastCountUpdated"
    //si token est present on crerer/continu le contdown
    //( evite la persistance de "lastDateUpdated" et "lastCountUpdated" generé par le countdown)
    if (count > 0 && localStorage.getItem("token")) {
      idCounter = setTimeout(
        () =>
          setCount((prev) => {
            const newCount = prev - 1;
            localStorage.setItem("lastCountUpdated", newCount.toString());
            localStorage.setItem(
              "lastDateUpdated",
              parseInt(date.getTime() / 1000).toString()
            );

            return newCount;
          }),
        1000
      );
      console.log("count-2: " + count);
    }
    //affiche le composant deux minutes avant l' expiration du token
    if (count >= 0 && count < timeShow) {
      refreshElement.current.classList.replace("hide", "show");
    }

    //affiche le message indiquant que la deconnexion est en cours
    if (count < 1) {
      refreshDialog.current.classList.add("dialog-transition");
      setTimeout(() => {
        cleanTokenInLocalStorage(
          "token",
          "expire",
          "time",
          "lastCountUpdated",
          "lastDateUpdated"
        );
        window.location = `${urlBase}/public/fr/login.html`;
      }, 1000);
      return;
    }

    if (count < 1) {
      clearTimeout(idCounter);
    }

    return () => clearTimeout(idCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div>
      {
        <div
          ref={refreshElement}
          className="flex-column-start-center hide wrapper"
        >
          <p className="text">
            {" "}
            Déconnexion dans
            <span>
              {count
                ? " # " + count.toString().padStart(3, "0") + " s"
                : " # " + "00" + " s"}
            </span>
          </p>
          <button
            className="btn-refresh"
            onClick={() => {
              refreshToken();
            }}
          >
            rester connecté
          </button>

          <div ref={refreshDialog} className="dialog">
            Déconnexion en cours
          </div>
        </div>
      }
    </div>
  );
}

export { RefreshToken };
