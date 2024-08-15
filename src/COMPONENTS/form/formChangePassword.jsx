//Composant formulaire "formchangepassword" pour le dashboard"

//import des librairies

import { useForm } from "react-hook-form";
import { useState } from "react";

//import des composants enfants

//import des icons
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

//import des fichiers RegEx
import { masquePassWord } from "../../UTILS/RegEx/regEx.js";

//feuille de style du composant
import "../../style/CSS/form-dashboard.css";

function FormChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

  const [isVisible, setIsVisible] = useState(false);

  //fonction
  function displayPassword(e) {
    setIsVisible(!isVisible);

    let parentElementSpan = e.target.closest("span");
    let inputId = parentElementSpan.dataset.idinput;
    const input = document.querySelector(`#${inputId}`);
    let inputValue = input.value;
    console.log("input value lenght: " + inputValue.length);
    input.focus();
    input.setSelectionRange(inputValue.length, inputValue.length);
  }
  console.log("bonjour");

  return (
    <form
      id="form-change-password"
      className="flex-column-start-start form-dashboard"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <p className="form-title">Changer le mot de passe</p>
      <p>
        Le mot de passe doit contenir au moins:<br></br>8 caractères <br></br>1
        chiffre <br></br>1 lettre majuscule<br></br>un carractere spécial
      </p>
      <div className="cont-input-label">
        <label htmlFor="input-password" className="label">
          {"Mot de passe actuel"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-password"
            className="input"
            type={isVisible ? "text" : "password"}
            name="password"
            {...register("password", {
              required: true,
              pattern: masquePassWord,
            })}
          />
          <span
            data-idinput="input-password"
            onClick={(e) => {
              displayPassword(e);
            }}
          >
            {isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        </div>
        {errors?.password?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.password?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}
      </div>
      <div className="cont-input-label">
        <label htmlFor="input-new-password" className="label">
          {"Nouveau mot de passe"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-new-password"
            className="input"
            type={isVisible ? "text" : "password"}
            name="new-password"
            {...register("new-password", {
              required: true,
              pattern: masquePassWord,
            })}
          />
          <span
            data-idinput="input-password"
            onClick={(e) => {
              displayPassword(e);
            }}
          >
            {isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        </div>
        {errors?.password?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.password?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}
      </div>
      <div className="cont-input-label">
        <label htmlFor="input-confirm-password" className="label">
          {"Confirmation du nouveau mot de passe"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-confirm-password"
            className="input"
            type={isVisible ? "text" : "password"}
            name="confirm-password"
            {...register("confirm-password", {
              required: true,
              pattern: masquePassWord,
            })}
          />
          <span
            data-idinput="input-password"
            onClick={(e) => {
              displayPassword(e);
            }}
          >
            {isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </span>
        </div>
        {errors?.password?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.password?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}
      </div>

      <button
        id="change-password-submit"
        className="btn-submit"
        type="submit"
        form="form-change-password"
        disabled={!isValid || isSubmitting}
      >
        Changer le mot de passe
      </button>
    </form>
  );
}

export { FormChangePassword };
