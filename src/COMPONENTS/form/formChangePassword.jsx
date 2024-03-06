//Composant formulaire "formchangepassword" pour le dashboard"

//import des librairies/hook
import { useForm } from "react-hook-form";
import { useState } from "react";

//feuille de style du composant
import "../../style/CSS/formchangepassword.css";

function FormChangePassword() {
  //use state
  const [textSpan, setTextSpan] = useState("voir");
  const [isVisible, setIsVisible] = useState(false);

  //gestion du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //fonction
  function displayPassword() {
    setIsVisible(!isVisible);

    textSpan == "voir" ? setTextSpan("cacher") : setTextSpan("voir");
  }

  return (
    <form
      id="set-password"
      className="form flex-column-start-start"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <fieldset>
        <legend className="legend">Modification du mot de passe</legend>
        <p>
          Le mot de passe doit contenir au moins:<br></br>8 caractères <br></br>
          1 chiffre <br></br>1 lettre majuscule
        </p>
        <div className="cont-input-label">
          <label htmlFor="input-hold-password" className="label">
            Mot de passe actuel
          </label>
          <div className="cont-input-span flex-row-start-center">
            <input
              id="input-hold-password"
              className="input"
              type={isVisible ? "text" : "password"}
              name="holdPassword"
              {...register("holdPassword", {
                required: true,
                pattern: /^[A-Za-z_'.-\s]{2,50}$/,
              })}
            />
            <span
              onClick={() => {
                displayPassword();
              }}
            >
              {textSpan}
            </span>
          </div>
          {errors.holdPassword == "pattern" ? (
            <span>Format non valide</span>
          ) : null}
          {errors.holdPassword == "required" ? (
            <span>Veuillez saisir le champ</span>
          ) : null}
        </div>

        <div className="cont-input-label">
          <label htmlFor="input-new-password" className="label">
            Nouveau mot de passe
          </label>
          <div className="cont-input-span flex-row-start-center">
            <input
              id="input-new-password"
              className="input"
              type={isVisible ? "text" : "password"}
              name="newPassword"
              {...register("newPassword", { require: true })}
            />
            <span
              onClick={() => {
                displayPassword();
              }}
            >
              {textSpan}
            </span>
          </div>
          {errors.newPassword === "required" ? (
            <span>Veuillez saisir le champ</span>
          ) : null}
        </div>

        <div className="cont-input-label">
          <label htmlFor="input-confirm-password" className="label">
            Confirmer mot de passe
          </label>
          <div className="cont-input-span flex-row-start-center">
            <input
              id="input-confirm-password"
              className="input"
              type={isVisible ? "text" : "password"}
              name="confirmPassword"
              {...register("confirmPassword", { require: true })}
            />
            <span
              onClick={() => {
                displayPassword();
              }}
            >
              {textSpan}
            </span>
          </div>
        </div>
      </fieldset>
      <button
        id="set-password-submit"
        className="btn-submit"
        type="submit"
        form="set-password"
      >
        Changer mot de passe
      </button>
    </form>
  );
}

export { FormChangePassword };
