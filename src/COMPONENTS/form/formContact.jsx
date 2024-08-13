//Composant "formLogin"
//import des librairies
//import { useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
//import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
//const mode = import.meta.env.MODE;

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
import { useState } from "react";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;

//variables et constante
// eslint-disable-next-line no-undef
const siteKey = import.meta.env.VITE_SITE_KEY_RECAPTCHA;

// eslint-disable-next-line no-unused-vars

//script principal

// composant formulaire de contact
function FormContact() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });

  //declaration des functions
  async function handleSubmitCaptcha(recaptchaToken) {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    // Envoie le token au backend pour la vérification
    const response = await fetch(`${url}/verify-recaptcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: recaptchaToken }),
    });

    const result = await response.json();

    if (result.success) {
      // alert("reCAPTCHA validé avec succès!");
      // Procéder à l'envoi du formulaire ou autre action
      setIsCaptchaValid(true);
    } else {
      //alert("Échec de la validation du reCAPTCHA");
      setIsCaptchaValid(false);
    }
  }

  async function fetchApi(data) {
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
          reset();
          setIsCaptchaValid(false);
        }, 3000);
      }
    } else {
      // eslint-disable-next-line no-unused-vars
      const toasterInvalid = document.querySelector("#toaster-invalid");
      toasterInvalid.classList.add("visible");
      setTimeout(() => {
        toasterInvalid.classList.remove("visible");
      }, 3000);
      setIsCaptchaValid(false);
    }
  }

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
          {errors?.email?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.email?.type == "required" ? (
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
          {errors?.content?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.content?.type == "required" ? (
            <span className="form-text-error">{"Un message est requis"}</span>
          ) : null}
        </div>
      </div>
      <ReCAPTCHA
        // eslint-disable-next-line no-undef
        sitekey={siteKey}
        onChange={handleSubmitCaptcha}
        onExpired={() => {
          setIsCaptchaValid(false);
        }}
      />
      ;
      <button
        id="login-submit"
        className="btn-submit"
        type="submit"
        form="form-contact"
        disabled={!isValid || isSubmitting || !isCaptchaValid}
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
