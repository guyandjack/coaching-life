//import { Collapse } from "react-collapse";
import { useRef, useEffect, useState } from "react";
//import { MdExpandMore } from "react-icons/md"; // Chevron-like icons
import { ReactSVG } from "react-svg";

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import { cleanTokenInLocalStorage } from "../../UTILS/fonctions/cleanTokenInLocalStorage.js";
import { refreshToken } from "../../UTILS/fonctions/refreshToken.js";

// eslint-disable-next-line no-undef
import account_icon from "../../assets/icons/account-icon.svg";

import "../../style/CSS/custom-collapse.css";

let env = localOrProd();
let urlBase = env.url;
let mode = env.mode;

//determine le temps (s) a pertir du quel le countdown s' affiche
let timeShow = 120;
if (mode == "dev") {
  timeShow = 30;
}

//permet de se deconnecter en suprimant le token d' authentification
function logOut() {
  cleanTokenInLocalStorage(
    "token",
    "admin",
    "time",
    "expire",
    "lastCountUpdated",
    "lastDateUpdated"
  );

  window.location.href = `${urlBase}/index.html`;
}

function getInfoFromLocalStorage() {
  

  //recuperation des dernieres valeur du count
  let lastCountUpdated = Number(localStorage.getItem("lastCountUpdated"));
  console.log("lastcountupdate: " + lastCountUpdated);

  let lastDateUpdated = Number(localStorage.getItem("lastDateUpdated"));

  console.log("lastdateupdate: " + lastDateUpdated);

  //date (en seconde) de creation du token  sur le serveur
  let tokenTime = parseInt(Number(localStorage.getItem("time")) / 1000);
  console.log("storage tokenBirth: " + tokenTime);

  //dure de vie (en seconde) du token implementer sur le serveur
  let tokenExpire = parseInt(Number(localStorage.getItem("expire")));
  console.log("storage tokenExpire: " + tokenExpire);

  //date actuel en seconde
  let date = new Date();
  let actualDate = parseInt(date.getTime() / 1000);

  //decalage entre la date de cretaion sur serveur et date de traitement client
  let deltaTimeToken = actualDate - tokenTime;
  console.log("deltabirth: " + deltaTimeToken);

  return {
    
    actualDate: parseInt(actualDate),
    delta: parseInt(deltaTimeToken),
    expire: parseInt(tokenExpire),
    timeBirth: parseInt(tokenTime),
    lastDate: parseInt(lastDateUpdated),
    lastCount: parseInt(lastCountUpdated),
  };
}

function initCountDown(objectInit, setterValue) {
  let tokenLife = 0;
  //duree de vie du token a partir de sa date de creation sur le serveur
  if (objectInit.lastCount > 0 && objectInit.lastDate > 0) {
    //calcul du temps de sortie de page par le client
    let duringTimeOut = objectInit.actualDate - objectInit.lastDate;

    console.log("actual date init: " + objectInit.actualDate);
    console.log("lastdate update: " + objectInit.lastDate);
    console.log("during time out: " + duringTimeOut);

    //duree de vie du token
    tokenLife = objectInit.lastCount - duringTimeOut;
    setterValue(tokenLife);
    console.log("init Count -1-: " + tokenLife);
  } else {
    tokenLife = parseInt(objectInit.expire - objectInit.delta);

    setterValue(tokenLife);
    console.log("init Count -2-: " + objectInit.expire);
    console.log("init Count -2-: " + objectInit.delta);
    console.log("init Count -2-: " + tokenLife);
  }
}

// eslint-disable-next-line no-unused-vars
function displayAdmin(element) {
  let admin = localStorage.getItem("admin");
  if (admin) {
    let firstBigletter = admin.split("")[0].toUpperCase();
    console.log("firstletterbig: " + firstBigletter);
    let restWord = admin.slice(1);

    console.log("rest word: " + restWord);
    let newName = firstBigletter + restWord;
    console.log("new name: " + newName);

    element.current.textContent = `Bonjour ${newName}`;
  }
}

// composant Collapse
function CustomCollapse() {
  // valeur du decompte
  const [countDown, setCountDown] = useState(null);

  // bolean qui lance le useffect qui gere initialisation du countdown
  const [InitCountDown, setInitCountDown] = useState(false);
  //bolean qui lance le useffect qui le countDown
  const [runCountDown, setRunCountDown] = useState(false);

  //ref aux element du DOM
  const adminName = useRef(null);
  const refreshElement = useRef(null);
  const alertElement = useRef(null);

  //permet de relancer le countdown apres un renouvellement de token
  async function restartCountDown() {
    //stop le countdown
    setCountDown(null);
    //recupere le nouveau token
    await refreshToken();
    //initialisation
    setInitCountDown(!InitCountDown);
    //restart du countdown
    setRunCountDown(!runCountDown);

    //referme le collaspse
    refreshElement.current.classList.remove("display");
  }

  /************ use effect  ***************
   * ***** start  ********/

  // afficje le nom de la personne connectée
  useEffect(() => {
    displayAdmin(adminName);
  }, []);

  //initialise le countdown
  useEffect(() => {
    function updateCountdown() {
      let result = getInfoFromLocalStorage();
      initCountDown(result, setCountDown);
    }

    console.log("use effect init countdown lancrelance");

    updateCountdown();
    //document.addEventListener("visibilitychange", handleVisibilityChange);
    //window.addEventListener("pageshow", updateCountdown);

    /*return () => {
      //document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", updateCountdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [InitCountDown]);

  //lance et gere le decompte d' expiration du token un fois le composant monte
  useEffect(() => {
    // evite de crere un countdown si count n'existe pas
    if (countDown === null) {
      console.log("la valeur de count n' existe pas....!");
      return;
    }

    let idCounter;
    let date_2 = new Date();

    //si count positif on creer/continu un countdown
    // la deconnexion peut se faire via le composant "collapse"
    //si une autre connexion est réalisé le "countdown" sera fausse par "lasdareUpdated" et "lastCountUpdated"
    //si token est present on crerer/continu le contdown
    //( evite la persistance de "lastDateUpdated" et "lastCountUpdated" generé par le countdown)
    if (countDown !== null && countDown > 0 && localStorage.getItem("token")) {
      idCounter = setTimeout(
        () =>
          setCountDown((prev) => {
            const newCountDown = prev - 1;
            localStorage.setItem(
              "lastDateUpdated",
              parseInt(date_2.getTime() / 1000).toString()
            );
            localStorage.setItem("lastCountUpdated", newCountDown.toString());

            return newCountDown;
          }),
        1000
      );

      console.log("count-2: " + countDown);
    }
    //affiche le composant deux minutes avant l' expiration du token
    if (countDown !== null && countDown >= 0 && countDown < timeShow) {
      refreshElement.current.classList.add("display");
    }

    //affiche le message indiquant que la deconnexion est en cours
    if (countDown !== null && countDown < 1) {
      alertElement.current.classList.add("alert-display");
      setTimeout(() => {
        cleanTokenInLocalStorage(
          "token",
          "expire",
          "time",
          "lastCountUpdated",
          "lastDateUpdated"
        );
        //window.location = `${urlBase}/public/fr/login.html`;
        alertElement.current.classList.remove("alert-display");
      }, 1000);
      return;
    }

    if (countDown < 1) {
      clearTimeout(idCounter);
    }

    return () => clearTimeout(idCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, runCountDown]);

  /************ use effect  ***************
   * ****** end  ********/

  return (
    <div className="relative flex-column-start-center  main-container">
      <div className="flex-row-center-center container-head">
        <ReactSVG
          src={account_icon}
          beforeInjection={(svg) => {
            svg.classList.add("icon-account");
          }}
        />
        <div className="text head" ref={adminName}></div>
      </div>
      <ul className="flex-column-start-center list">
        <li
          ref={refreshElement}
          className="flex-column-start-center container-refresh"
        >
          <div className="text countdown">
            log out in #{countDown ? countDown.toString().padStart(3, 0) : null}{" "}
            s
          </div>
          <div
            className="text refresh"
            onClick={() => {
              restartCountDown();
            }}
          >
            rester connecté
          </div>
        </li>
        <li className="dashboard-li">
          <a className="text" href={`${urlBase}/public/fr/dashboard.html`}>
            Dashboard
          </a>
        </li>
        <li
          className="text logout-li"
          onClick={() => {
            alertElement.current.classList.add("alert-display");
            setCountDown(null);
            logOut();
          }}
        >
          Logout
        </li>


        <li ref={alertElement} className="text alert">
          deconnexion en cours...
        </li>
      </ul>
    </div>
  );
}

export { CustomCollapse };
