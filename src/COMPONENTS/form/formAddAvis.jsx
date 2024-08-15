//Composant "FormAddAvis"
//import des librairies

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//import des composants enfants

//import des fichiers RegEx
// eslint-disable-next-line no-unused-vars
import {
  masqueExtensionImg,
  masqueMessage,
  masqueText,
} from "../../UTILS/RegEx/regEx.js";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des fichiers de style du composant
import "../../style/CSS/form-dashboard.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;

function FormAddAvis() {
  // eslint-disable-next-line no-unused-vars
  const [imagePreviewAvatar, setImagePreviewAvatar] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  // hook utiliser pour utiliser la fonction handleImageChange
  useEffect(() => {
    let inputImgFile = document.querySelector("#input-add-file-avatar");

    inputImgFile.addEventListener("change", (e) => {
      handleImageChange(e);
    });

    // Nettoyage de l'événement pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener("change", (e) => handleImageChange(e));
    };
  }, []);

  // declaration des fonctions

  //** stocke dans un state les donnes de l'input file Img  */
  const handleImageChange = (event) => {
    const fileList = event.target.files;
    let arrayList = Array.from(fileList);

    // Crée des URLs pour l'aperçu des images dans les miniatures
    const previewUrlsAvatar = arrayList.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviewAvatar(previewUrlsAvatar);
  };

  //** Realise un fetch vers le serveur  */
  // eslint-disable-next-line no-unused-vars
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

    let response = await fetch(`${url}/avis`, {
      method: "POST",
      /* headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }, */
      body: formData,
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

  return (
    <form
      id="form-add-avis"
      className="flex-column-start-center form-dashboard"
      onSubmit={handleSubmit((data) => fetchApi(data))}
    >
      <p className="form-title">Ajouter un avis</p>
      <div className="flex-column-start-start cont-input-label">
        {/* <label htmlFor="input-text-add-lastname" className="label">
          {"Nom"}
        </label> */}
        <div className="flex-row-center-center cont-input">
          <input
            id="input-text-add-lastname"
            className="input"
            type="text"
            name="lastname"
            placeholder="Nom du client"
            {...register("lastname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {console.log(errors)}
          {errors?.lastname?.type == "pattern" ? (
            <span className="form-text-error">Format non valide</span>
          ) : null}
          {errors?.lastname?.type == "required" ? (
            <span className="form-text-error">{"Le nom est requis !"}</span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        {/* <label htmlFor="input-text-add-firstname" className="label">
          {"Prénom"}
        </label> */}
        <div className="flex-row-center-center cont-input">
          <input
            id="input-text-add-firstname"
            className="input"
            type="text"
            name="firstname"
            placeholder="Prénom du client"
            {...register("firstname", {
              required: true,

              pattern: masqueText,
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {console.log(errors)}
          {errors?.firstname?.type == "pattern" ? (
            <span className="form-text-error">Format non valide</span>
          ) : null}
          {errors?.firstname?.type == "required" ? (
            <span className="form-text-error">
              {"Le prénom du client est requis !"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-add-message" className="label">
          {"Message"}
        </label>
        <div className="flex-row-center-center cont-input">
          <textarea
            id="input-add-message"
            className="input"
            name="content"
            placeholder="Contenu de l'avis"
            rows="10"
            {...register("content", {
              required: true,
              pattern: masqueMessage,
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors?.content?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide !"}</span>
          ) : null}
          {errors?.content?.type == "required" ? (
            <span className="form-text-error">
              {"Le témoignage est requis"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-add-file-avatar" className="label">
          {"Choisir une image jpeg/jpg/png"}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-add-file-avatar"
            className="input"
            type="file"
            name="avatar"
            {...register("avatar", {
              //required: true,
              validate: {
                isjpeg: (fileList) => {
                  for (let i = 0; i < fileList.length; i++) {
                    //const file = fileList[0];
                    const validExtensionImg = masqueExtensionImg.test(
                      fileList[i].name
                    );
                    if (!validExtensionImg) {
                      return `Mauvaise extension sur le fichier: ${i + 1}`;
                    }
                    return validExtensionImg;
                  }
                },
              },
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors.avatar?.type === "isjpeg" && (
            <span className="form-text-error">
              {"Mauvais type de fichier image uniquemnt jpeg / jpg / png ! "}
            </span>
          )}
        </div>
      </div>
      <p className="title-mini-img">{"Miniature des images selectionées: "}</p>
      <div className="flex-row-space_between-wrap-start  viewer">
        {imagePreviewAvatar.length > 0
          ? imagePreviewAvatar.map((img, index) => {
              return (
                <img
                  key={index + 1}
                  id={"add-image-avatar" + (index + 1)}
                  className="display-image"
                  src={img}
                  alt={`Preview ${"vignete pour avatar"}`}
                />
              );
            })
          : null}
      </div>

      <button
        id="add-avis-submit"
        className="btn-submit"
        type="submit"
        form="form-add-avis"
        disabled={!isValid || isSubmitting}
      >
        {"Ajouter un avis"}
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

export { FormAddAvis };
