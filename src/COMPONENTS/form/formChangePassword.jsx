//Composant formulaire "formchangepassword" pour le dashboard"

//import des librairies

import { useState } from "react";
import { useForm } from "react-hook-form";

//import des composants enfants

//import des icons
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

//import des fichiers RegEx
import { masquePassWord } from "../../UTILS/RegEx/regEx.js";

//feuille de style du composant
import "../../style/CSS/form-dashboard.css";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;

function FormChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    // eslint-disable-next-line no-unused-vars
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

  const [isVisibleA, setIsVisibleA] = useState(false);
  const [isVisibleB, setIsVisibleB] = useState(false);
  const [isVisibleC, setIsVisibleC] = useState(false);

  let watchNewPassword = watch("newpassword");

  //fonction
  function displayPassword(e) {

    
    let inputPassword = document.querySelector("#input-password");
    let inputNewPassword = document.querySelector("#input-new-password");
    let inputConfirmPassword = document.querySelector("#input-confirm-password");

    let inputIdSelected = e.target.closest(".eye").dataset.idinput; //onrecupere le parent du svg
    
    

    switch (inputIdSelected) {
      case "input-password":
        setIsVisibleA(!isVisibleA);
        inputPassword.focus();
        break;
      case "input-new-password":
        setIsVisibleB(!isVisibleB);
        inputNewPassword.focus();
        break;
      case "input-confirm-password":
        setIsVisibleC(!isVisibleC);
        inputConfirmPassword.focus();
        break;

      default:
        break;
    }

     
  }

  async function fetchApi(data) {
    const token = localStorage.getItem("token");
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

    let response = await fetch(`${url}/password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      // eslint-disable-next-line no-unused-vars
      //const data = await response.json();

      const toasterValid = document.querySelector("#toaster-valid-article");
      if (toasterValid) {
        toasterValid.classList.add("visible");

        setTimeout(() => {
          toasterValid.classList.remove("visible");
          //reset();
          
        }, 3000);
      }
    } else {
      const toasterInvalid = document.querySelector("#toaster-invalid-article");
      if (toasterInvalid) {
        toasterInvalid.classList.add("visible");
        setTimeout(() => {
          toasterInvalid.classList.remove("visible");
        }, 3000);
      }
    }
  }
  

  return (
    <form
      id="form-change-password"
      className="flex-column-start-center form-dashboard"
      onSubmit={handleSubmit((data) => fetchApi(data))}
    >
      <p className="form-title">Changer le mot de passe</p>
      <ul>
        <li>Le mot de passe doit contenir au moins:</li>
        <li>- 8 caractères</li>
        <li>- 1 chiffre</li>
        <li>- 1 lettre majuscule</li>
        <li>- 1 un carractère spécial</li>
      </ul>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-password" className="label">
          {"Mot de passe actuel"}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-password"
            className="input"
            type={isVisibleA ? "text" : "password"}
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
            {isVisibleA ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
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
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-new-password" className="label">
          {"Nouveau mot de passe "}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-new-password"
            className="input"
            type={isVisibleB ? "text" : "password"}
            name="newpassword"
            {...register("newpassword", {
              required: true,
              pattern: masquePassWord,
            })}
          />
          <span
            className="eye"
            data-idinput="input-new-password"
            onClick={(e) => {
              displayPassword(e);
            }}
          >
            {isVisibleB ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors?.newpassword?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.newpassword?.type == "required" ? (
            <span className="form-text-error">
              {"Le mot de passe est requis !"}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-confirm-password" className="label">
          {"Confirmation du nouveau mot de passe"}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-confirm-password"
            className="input"
            type={isVisibleC ? "text" : "password"}
            name="confirmpassword"
            {...register("confirmpassword", {
              required: true,
              pattern: masquePassWord,
              validate: {
                validation: (value) => {
                  return value == watchNewPassword;
                },
              },
            })}
          />
          <span
            className="eye"
            data-idinput="input-confirm-password"
            onClick={(e) => {
              displayPassword(e);
            }}
          >
            {isVisibleC ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors?.confirmpassword?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.confirmpassword?.type == "required" ? (
            <span className="form-text-error">
              {"Le mot de passe est requis !"}
            </span>
          ) : null}
          {errors?.confirmpassword?.type == "validation" ? (
            <span className="form-text-error">
              {"Les mots de passe ne correspondent pas"}
            </span>
          ) : null}
        </div>
      </div>

      <button
        id="change-password-submit"
        className="btn-submit"
        type="submit"
        form="form-change-password"
        disabled={!isValid || isSubmitting}
      >
        {"Changer le mot de passe"}
      </button>
      <div id="toaster-valid-article" className="toaster valid">
        {"Un article ajouté !"}
      </div>
      <div id="toaster-invalid-article" className="toaster invalid">
        {"Oups! une erreur c'est produite"}
      </div>
    </form>
  );
}

export { FormChangePassword };

