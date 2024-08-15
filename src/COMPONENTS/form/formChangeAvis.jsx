//Composant "FormAddAvis"
//import des librairies

import { useForm } from "react-hook-form";

//import des composants enfants

//import des fichiers RegEx
import { masqueText, masqueMessage } from "../../UTILS/RegEx/regEx.js";

//import des fichiers de style du composant
import "../../style/CSS/form-dashboard.css";

function FormChangeAvis() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  console.log("bonjour");

  return (
    <form
      id="form-change-avis"
      className="flex-column-start-start form-dashboard"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="cont-input-label">
        <label htmlFor="input-text-change-lastname" className="label">
          {"Nom"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-change-lastname"
            className="input"
            type="text"
            name="changeLastname"
            {...register("changeLastname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        {console.log(errors)}
        {errors?.changeLastname?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.changeLastname?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}
      </div>
      <div className="cont-input-label">
        <label htmlFor="input-text-change-firstname" className="label">
          {"Prénom"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-change-firstname"
            className="input"
            type="text"
            name="changeFirstname"
            {...register("changeFirstname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        {console.log(errors)}
        {errors?.changeFirstname?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.changeFirstname?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-change-message" className="label">
          {"Message"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <textarea
            id="input-change-message"
            className="text-area"
            name="changeMessage"
            {...register("changeMessage", {
              required: true,
              pattern: masqueMessage,
            })}
          />
        </div>
        {errors?.changeMessage?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.changeMessage?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-change-file" className="label">
          {"Choisir un fichier image"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-change-file"
            className="input"
            type="file"
            name="changeFile"
            {...register("changeFile", {
              //required: true,
              //pattern: masqueText,
            })}
          />
        </div>
        {/*{errors?.addMessage?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.addMessage?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}*/}
      </div>
      <div className="viewer">
        <div className="url-image">Une url</div>
        <div className="display-image">Une miniature</div>
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-text-change-social" className="label">
          {"Liens réseau social"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-change-social"
            className="input"
            type="text"
            name="changeSocial"
            {...register("changeSocial", {
              //required: true,
              //pattern: masqueText,
            })}
          />
        </div>
        {/*{console.log(errors)}
        {errors?.addFirstname?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.addFirstname?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}*/}
      </div>

      <button
        id="login-submit"
        className="btn-submit"
        type="submit"
        form="form-login"
        disabled={!isValid || isSubmitting}
      >
        Connexion
      </button>
    </form>
  );
}

export { FormChangeAvis };
