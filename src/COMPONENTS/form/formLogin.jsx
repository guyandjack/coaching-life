//Composant "formLogin"
//import des librairies

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";

//import des composants enfants
import { Spinner } from "../../COMPONENTS/spinner/spinner.jsx";

//import des icons
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

//import des fichiers RegEx
import { masquePassWord, masqueMail } from "../../UTILS/RegEx/regEx.js";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des fichiers de style du composant
import "../../style/CSS/form-dashboard.css";

//declaration des fonctions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;



function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

  const [isVisibleA, setIsVisibleA] = useState(false);
  const [isVisibleB, setIsVisibleB] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  const toasterValid = useRef(null);
  const toasterInValid = useRef(null);


  //declaration des functions
  async function fetchApi(data) {
    setIsSpinnerVisible(true);
    //let content = JSON.stringify(data);
    const formData = new FormData();
    // Ajoute les fichiers et les autres champs du formulaire
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    }

    try {
      let response = await fetch(`${url}/login`, {
        method: "POST",
        body: formData,
      });

      // Vérifie si le serveur a renvoyé un statut HTTP valide
      if (!response.ok) {
        throw new Error(
          `Erreur HTTP : ${response.status} ${response.statusText}`
        );
      }

      if (response.ok) {
        let data = await response.json();
        // eslint-disable-next-line no-unused-vars
        

        if (data.message == "succes") {
          //netoyage du localstorage
          localStorage.clear()

          //recuperation des data api
          localStorage.setItem("admin", data.name);
          localStorage.setItem("token", data.token);
          localStorage.setItem("time", data.time);
          localStorage.setItem("expire", data.expire);
          toasterValid.current.classList.add("visible");
          setTimeout(() => {
            toasterValid.current.classList.remove("visible");
            window.location.href = "./dashboard.html";
            setIsSpinnerVisible(false);
          }, 1000);
        }
      }
    }
    catch (error) {
      // Gère les erreurs réseau et autres exceptions
      toasterInValid.current.classList.add("visible");
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        toasterInValid.current.textContent = "le serveur est inaccessible. Veuillez réessayer plus tard.";

      } else {
        
        toasterInValid.current.textContent = "le serveur est inaccessible. Veuillez réessayer plus tard.";
        
      }
      setIsSpinnerVisible(false);
      setTimeout(() => {
        toasterInValid.current.classList.remove("visible");
      }, 3000);

    }
  } 
   

    

    function displayPassword(e) {
      let inputPassword = document.querySelector("#input-password");
      let inputEmail = document.querySelector("#input-email");
    

      let inputIdSelected = e.target.closest(".eye").dataset.idinput; //onrecupere le parent du svg

      switch (inputIdSelected) {
        case "input-email":
          setIsVisibleA(!isVisibleA);
          inputEmail.focus();
          break;
        case "input-password":
          setIsVisibleB(!isVisibleB);
          inputPassword.focus();
          break;
      

        default:
          break;
      }
    }
    

  return (
    <div>
      {isSpinnerVisible ? <Spinner /> : null}

      <form
        id="form-login"
        className="flex-column-start-center form-dashboard"
        onSubmit={handleSubmit((data) => fetchApi(data, setIsSpinnerVisible))}
      >
        <p className="form-title text-first">Login User</p>
        <div className="flex-column-start-start cont-input-label">
          <label htmlFor="input-email" className="label">
            {"Nom d'utilisateur"}
          </label>
          <div className="flex-row-center-center cont-input">
            <input
              id="input-email"
              className="input"
              type={isVisibleA ? "text" : "password"}
              name="email"
              {...register("email", {
                required: true,
                pattern: masqueMail,
              })}
            />
            <span
              className="eye"
              data-idinput="input-email"
              onClick={(e) => {
                displayPassword(e);
              }}
            >
              {isVisibleA ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </span>
          </div>
          <div className="flex-column-center-center container-span-error">
            {errors?.email?.type == "pattern" ? (
              <span className="form-text-error">{"Format non valide"}</span>
            ) : null}
            {errors?.email?.type == "required" ? (
              <span className="form-text-error">
                {"Le mot de passe est requis !"}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex-column-start-start cont-input-label">
          <label htmlFor="input-password" className="label">
            {"Mot de passe"}
          </label>
          <div className="flex-row-center-center cont-input">
            <input
              id="input-password"
              className="input"
              type={isVisibleB ? "text" : "password"}
              name="password"
              {...register("password", {
                required: true,
                pattern: masquePassWord,
              })}
            />
            <span
              className="eye"
              data-idinput="input-password"
              onClick={(e) => {
                displayPassword(e);
              }}
            >
              {isVisibleB ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </span>
          </div>
          <div className="flex-column-center-center container-span-error">
            {errors?.password?.type == "pattern" ? (
              <span className="form-text-error">{"Format non valide"}</span>
            ) : null}
            {errors?.password?.type == "required" ? (
              <span className="form-text-error">
                {"Le mot de passe est requis !"}
              </span>
            ) : null}
          </div>
        </div>
  <div className="relative flex-column-start-center container-btn-submit">
        <button
          id="login-submit"
          className="btn-submit"
          type="submit"
          form="form-login"
          disabled={!isValid || isSubmitting}
        >
          {"Login"}
        </button>
        <div ref={toasterValid} className="flex-column-center-center toaster valid">
          {"Utilisteur connecté"}
        </div>
        <div ref={toasterInValid} className="flex-column-center-center toaster invalid">
         
        </div></div>
      </form>
    </div>
  );
}

export { FormLogin };
