//Composant "FormAddAvis"
//import des librairies

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//import des composants enfants

//import des fichiers RegEx
// eslint-disable-next-line no-unused-vars
import {
  masqueMessage,
  masqueExtensionHtml,
  masqueExtensionImg,
} from "../../UTILS/RegEx/regEx.js";

//import des functions
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

//import des fichiers de style du composant
import "../../style/CSS/form-dashboard.css";

//declaration des functions
let objectUrl = localOrProd();
let url = objectUrl.urlApi;

function FormAddArticle() {
  // eslint-disable-next-line no-unused-vars
  //const [imageFile, setImageFile] = useState([]); // stocke les fichiers selectionnées
  const [imagePreview, setImagePreview] = useState([]); // stoke les url des images pour un affichage sur  la page

  // parametre des option pour le formulaire react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  // hook utiliser pour utiliser la fonction handleImageChange
  useEffect(() => {
    let inputImgFile = document.querySelector("#input-add-file-img");

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
    const previewUrls = arrayList.map((file) => URL.createObjectURL(file));
    setImagePreview(previewUrls);
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

    let response = await fetch(`${url}/article`, {
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
      id="form-add-article"
      className="flex-column-start-center form-dashboard"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        fetchApi(data);
      })}
    >
      <p className="form-title">Ajouter un article sur le blog</p>
      <div className="flex-column-start-start cont-input-label">
        {/* <label htmlFor="input-text-add-title" className="label">
          {"Titre de l' article"}
        </label> */}
        <div className="flex-row-center-center cont-input">
          <textarea
            id="input-text-add-title"
            className="input"
            name="addTitle"
            placeholder="Titre de l'article"
            {...register("addTitle", {
              required: true,

              pattern: masqueMessage,
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors?.addTitle?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide!"}</span>
          ) : null}
          {errors?.addTitle?.type == "required" ? (
            <span className="form-text-error">{"Le titre est requis!"}</span>
          ) : null}
        </div>
      </div>
      <div className="flex-column-start-start cont-input-label">
        {/* <label htmlFor="input-text-add-resume" className="label">
          {"Resumé de l' article"}
        </label> */}
        <div className="flex-row-center-center cont-input">
          <textarea
            id="input-text-add-resume"
            className="input"
            name="addResume"
            placeholder="Résumé de l'article"
            rows="5"
            {...register("addResume", {
              required: true,

              pattern: masqueMessage,
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors?.addResume?.type == "pattern" ? (
            <span className="form-text-error">{"Format non valide"}</span>
          ) : null}
          {errors?.addResume?.type == "required" ? (
            <span className="form-text-error">
              {"Le resumé de l' article est requis !"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex-column-start-start cont-input-label">
        <label htmlFor="input-add-file-img" className="label">
          {"Choisir une plusieurs images jpeg/jpg/png"}
        </label>
        <div className="flex-row-center-center cont-input">
          <input
            id="input-add-file-img"
            className="input"
            type="file"
            multiple
            name="addFile"
            {...register("addFile", {
              required: true,
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
          {errors.addFile?.type === "required" && (
            <span className="form-text-error">{"Le fichier est requis !"}</span>
          )}
          {errors.addFile?.type === "isjpeg" && (
            <span className="form-text-error">
              {"Mauvais type de fichier image uniquemnt jpeg / jpg / png ! "}
            </span>
          )}
        </div>
      </div>
      <p className="title-mini-img">{"Miniature des images selectionées: "}</p>
      <div className="flex-row-space_between-wrap-start  viewer">
        {imagePreview.length > 0
          ? imagePreview.map((img, index) => {
              return (
                <img
                  key={index + 1}
                  id={"add-image-" + (index + 1)}
                  className="display-image"
                  src={img}
                  alt={`Preview ${"vignete pour article"}`}
                />
              );
            })
          : null}
      </div>

      <div className="flex-column-start-start cont-input-label">
        {
          <label htmlFor="input-text-add-article" className="label">
            {"Choisir un article au format html"}
          </label>
        }
        <div className="flex-row-center-center cont-input">
          <input
            id="input-file-add-article"
            className="input"
            type="file"
            name="addArticle"
            {...register("addArticle", {
              required: true,
              validate: {
                ishtml: (fileList) => {
                  const file = fileList[0];
                  let validExtensionArticle = masqueExtensionHtml.test(
                    file.name
                  );
                  console.log(
                    "valid extensionArticle: " + validExtensionArticle
                  );
                  return validExtensionArticle;
                },
              },
            })}
          />
        </div>
        <div className="flex-column-center-center container-span-error">
          {errors.addArticle?.type === "ishtml" ? (
            <span className="form-text-error">
              {"Mauvaise extension de fichier!"}
            </span>
          ) : null}
          {errors.addArticle?.type === "required" ? (
            <span className="form-text-error">
              {"Un fichier HTML est requis!"}
            </span>
          ) : null}
        </div>
      </div>

      <button
        id="add-article-submit"
        className="btn-submit"
        type="submit"
        form="form-add-article"
        disabled={!isValid || isSubmitting}
      >
        {"Ajouter un article"}
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

export { FormAddArticle };
