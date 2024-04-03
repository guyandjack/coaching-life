//Composant "FormAddAvis"
//import des librairies

import { useForm } from "react-hook-form";

//import des composants enfants

//import des fichiers RegEx
import { masqueText, masqueMessage } from "../../UTILS/RegEx/regEx.js";

//import des fichiers de style du composant
//import "../../style/CSS/form-add-avis.css";

function FormAddAvis() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  //use state

  console.log("bonjour");

  return (
    <form
      id="form-add-avis"
      className="form flex-column-start-start"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="cont-input-label">
        <label htmlFor="input-text-add-lastname" className="label">
          {"Nom"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-add-lastname"
            className="input"
            type="text"
            name="addLastname"
            {...register("addLastname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        {console.log(errors)}
        {errors?.addLastname?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.addLastname?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}
      </div>
      <div className="cont-input-label">
        <label htmlFor="input-text-add-firstname" className="label">
          {"Prénom"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-add-firstname"
            className="input"
            type="text"
            name="addFirstname"
            {...register("addFirstname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        {console.log(errors)}
        {errors?.addFirstname?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.addFirstname?.type == "required" ? (
          <span className="form-text-error">
            {"L'identifiant est requis !"}
          </span>
        ) : null}
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-add-message" className="label">
          {"Message"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <textarea
            id="input-add-message"
            className="text-area"
            name="addMessage"
            {...register("addMessage", {
              required: true,
              pattern: masqueMessage,
            })}
          />
        </div>
        {errors?.addMessage?.type == "pattern" ? (
          <span className="form-text-error">Format non valide</span>
        ) : null}
        {errors?.addMessage?.type == "required" ? (
          <span className="form-text-error">Le mot de passe est requis !</span>
        ) : null}
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-add-file" className="label">
          {"Choisir un fichier image"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-add-file"
            className="input"
            type="file"
            name="addFile"
            {...register("addFile", {
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
        <div id="add-url" className="url-image">
          Une url
        </div>
        <div id="add-image" className="display-image">
          Une miniature
        </div>
      </div>

      <div className="cont-input-label">
        <label htmlFor="input-text-add-social" className="label">
          {"Liens réseau social"}
        </label>
        <div className="cont-input-span flex-row-start-center">
          <input
            id="input-text-add-social"
            className="input"
            type="text"
            name="addSocial"
            {...register("addSocial", {
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

export { FormAddAvis };
