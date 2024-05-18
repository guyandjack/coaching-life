//Composant "formLogin"
//import des librairies

import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

//import des fichiers RegEx
import {
  masqueMail,
  masqueMessage,
  masqueText,
} from "../../UTILS/RegEx/regEx.js";

//import des fichiers de style du composant
import "../../style/CSS/form-contact.css";

//declaration des functions
async function fetchApi(data) {
  let content = JSON.stringify(data);
  let result = await fetch("http://localhost:5500/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: content,
  });
  console.log("reponse du serveur" + JSON.stringify(result));
}

function FormContact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

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
        {/* {console.log(errors)} */}
        {errors?.lastname?.type == "pattern" ? (
          <span className="form-text-error">{"Format non valide"}</span>
        ) : null}
        {errors?.lastname?.type == "required" ? (
          <span className="form-text-error">{"Votre nom est requis"}</span>
        ) : null}
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
        {/* {console.log(errors)} */}
        {errors?.firstname?.type == "pattern" ? (
          <span className="form-text-error">{"Format non valide"}</span>
        ) : null}
        {errors?.firstname?.type == "required" ? (
          <span className="form-text-error">{"Votre prénom est requis !"}</span>
        ) : null}
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
            name="mail"
            {...register("mail", {
              required: true,

              pattern: masqueMail,
            })}
          />
        </div>
        {/* {console.log(errors)} */}
        {errors?.mail?.type == "pattern" ? (
          <span className="form-text-error">{"Format non valide"}</span>
        ) : null}
        {errors?.mail?.type == "required" ? (
          <span className="form-text-error">{"Votre email est requis"}</span>
        ) : null}
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
            name="message"
            {...register("message", {
              required: true,

              pattern: masqueMessage,
            })}
          />
        </div>
        {/* {console.log(errors)} */}
        {errors?.message?.type == "pattern" ? (
          <span className="form-text-error">{"Format non valide"}</span>
        ) : null}
        {errors?.message?.type == "required" ? (
          <span className="form-text-error">{"Un message est requis"}</span>
        ) : null}
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
    </form>
  );
}

export { FormContact };
