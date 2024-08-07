//Composant "formLogin"
//import des librairies

import { useForm } from "react-hook-form";
import { useState } from "react";

//import des composants enfants

//import des icons
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

//import des fichiers RegEx
import { masquePassWord } from "../../UTILS/RegEx/regEx.js";

//import des fichiers de style du composant
import "../../style/CSS/form-login.css";

function FormLogin() {
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

  return (
    <form
      id="form-login"
      className="form flex-column-start-start"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="cont-input-label">
        <label htmlFor="input-text" className="label">
          {"Nom d'utilisteur"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text"
            className="input"
            type="text"
            name="admin"
            {...register("admin", {
              required: true,

              pattern: masquePassWord,
            })}
          />
        </div>
        {console.log(errors)}
        {errors?.admin?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.admin?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-password" className="label">
          {"Mot de passe"}
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

      <button
        id="login-submit"
        className={
          !isValid || isSubmitting
            ? "btn-submit-login-novalid"
            : "btn-submit-login-valid"
        }
        type="submit"
        form="form-login"
        disabled={!isValid || isSubmitting}
      >
        Login
      </button>
    </form>
  );
}

export { FormLogin };
