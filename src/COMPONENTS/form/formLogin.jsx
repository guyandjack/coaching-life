//Composant "formLogin"
//import des librairies

import { useForm } from "react-hook-form";
import { useState } from "react";

//import des composants enfants

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

async function fetchApi(data) {
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

  let response = await fetch(`${url}/login`, {
    method: "POST",
    /*headers: {
        "Content-Type": "multipart/form-data",
        //Accept: "application/json",
      },*/
    body: formData,
  });
  if (response.ok) {
    let data = await response.json();
    // eslint-disable-next-line no-unused-vars
    const toasterValid = document.querySelector("#toaster-valid-login");

    if (data.message == "succes") {
      localStorage.setItem("admin", data.name);
      localStorage.setItem("token", data.token);
      toasterValid.classList.add("visible");
      setTimeout(() => {
        toasterValid.classList.remove("visible");
        //reset();
        window.location.href = "./dashboard.html"
      }, 3000);
    }
  } else {
    // eslint-disable-next-line no-unused-vars
    const toasterInvalid = document.querySelector("#toaster-invalid-login");
    toasterInvalid.classList.add("visible");
    setTimeout(() => {
      toasterInvalid.classList.remove("visible");
    }, 3000);
  }
}

function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

  const [isVisibleA, setIsVisibleA] = useState(false);
  const [isVisibleB, setIsVisibleB] = useState(false);

  

  return (
    <form
      id="form-login"
      className="flex-column-start-center form-dashboard"
      onSubmit={handleSubmit((data) => fetchApi(data))}
    >
      <p className="form-title">Login</p>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-password" className="label">
          {"Nom d'utilisateur"}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-password"
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
            data-idinput="input-password"
            onClick={() => {
              setIsVisibleA(!isVisibleA);
              
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
            onClick={() => {
              setIsVisibleB(!isVisibleB);
              
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
      

      <button
        id="login-submit"
        className="btn-submit"
        type="submit"
        form="form-login"
        disabled={!isValid || isSubmitting}
      >
        {"Login"}
      </button>
      <div id="toaster-valid-login" className="toaster valid">
        {"Utilisteur connecté"}
      </div>
      <div id="toaster-invalid-login" className="toaster invalid">
        {"Oups! une erreur c'est produite"}
      </div>
    </form>
  );
}

export { FormLogin };
