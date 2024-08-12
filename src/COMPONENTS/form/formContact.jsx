//Composant "formLogin"
//import des librairies

import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
//import { useEffect } from "react";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des fichiers RegEx
import {
  masqueMail,
  masqueMessage,
  masqueText,
} from "../../UTILS/RegEx/regEx.js";

//import des fichiers de style du composant
import "../../style/CSS/form-contact.css";

//declaration des functions

function onChange(value) {
  console.log("Captcha value:", value);
}

async function fetchApi(data) {
  let objectUrl = localOrProd();
  let url = objectUrl.urlApi;

  let content = JSON.stringify(data);
  let response = await fetch(`${url}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: content,
  });
  if (response.ok) {
    let data = await response.json();
    // eslint-disable-next-line no-unused-vars
    const toasterValid = document.querySelector("#toaster-valid");

    if (data.message_status == "sended") {
      toasterValid.classList.add("visible");
      setTimeout(() => {
        toasterValid.classList.remove("visible");
      }, 3000);
    }
  } else {
    // eslint-disable-next-line no-unused-vars
    const toasterInvalid = document.querySelector("#toaster-invalid");
    toasterInvalid.classList.add("visible");
    setTimeout(() => {
      toasterInvalid.classList.remove("visible");
    }, 3000);
  }
}

//script principal

// composant formulaire de contact
function FormContact() {
  console.log("hello render");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });
  //use state

  console.log("isValid: " + isValid);
  console.log("issubmiting: " + isSubmitting);

  return (
    <form
      id="form-contact"
      className="flex-column-start-center form "
      onSubmit={handleSubmit((data) => fetchApi(data))}
    >
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-text-lastname" className="label">
          {"Nom"}
        </label>
        <div className="flex-column-start-center cont-input-span ">
          <input
            id="input-text-lastname"
            className="input"
            type="text"
            name="lastname"
            {...register("lastname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        <div className="container-span-error">
          {errors?.lastname?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.lastname?.type == "required" ? (
            <span className="form-text-error">{"Votre nom est requis"}</span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-text-firstname" className="label">
          {"Prénom"}
        </label>
        <div className="flex-column-start-center cont-input-span ">
          <input
            id="input-text-firstname"
            className="input"
            type="text"
            name="firstname"
            {...register("firstname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        <div className="container-span-error">
          {errors?.firstname?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.firstname?.type == "required" ? (
            <span className="form-text-error">
              {"Votre prénom est requis !"}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-mail" className="label">
          {"Email"}
        </label>
        <div className="flex-column-start-start cont-input-span ">
          <input
            id="input-mail"
            className="input"
            type="mail"
            name="email"
            {...register("email", {
              required: true,

              pattern: masqueMail,
            })}
          />
        </div>
        <div className="container-span-error">
          {errors?.mail?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.mail?.type == "required" ? (
            <span className="form-text-error">{"Votre email est requis"}</span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-text-area" className="label">
          {"Votre message"}
        </label>
        <div className="cont-input-span flex-column-start-start">
          <textarea
            id="input-text-area"
            className="input text-area"
            type=""
            name="content"
            {...register("content", {
              required: true,

              pattern: masqueMessage,
            })}
          />
        </div>
        <div className="container-span-error">
          {errors?.message?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.message?.type == "required" ? (
            <span className="form-text-error">{"Un message est requis"}</span>
          ) : null}
        </div>
      </div>
      <ReCAPTCHA
        sitekey="6Lc1298pAAAAAC-zSvl1zap4B66RY2_x3dQK2r1J"
        onChange={onChange}
      />
      ;
      <button
        id="login-submit"
        className="btn-submit"
        type="submit"
        form="form-contact"
        disabled={!isValid || isSubmitting}
      >
        Envoyer votre message
      </button>
      <div id="toaster-valid" className="toaster valid">
        {"Message reçu"}
      </div>
      <div id="toaster-invalid" className="toaster invalid">
        {"Oups! une erreur c'est produite"}
      </div>
    </form>
  );
}

export { FormContact };
