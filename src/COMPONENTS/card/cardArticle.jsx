/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import "../../style/CSS/card-article.css";
import "../../style/CSS/form-dashboard.css";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;

function CardArticle({ title, imgUrl, resume, index, id }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const onDeleteConfirm = async (data) => {
    setShowConfirmDialog(false);

    try {
      const response = await fetch(`${url}/article`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToaster("toaster-valid-delete-article");
      } else {
        showToaster("toaster-invalid-delete-article");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      showToaster("toaster-invalid-delete-article");
    }
  };

  const showToaster = (id) => {
    const toaster = document.getElementById(id);
    if (toaster) {
      toaster.classList.add("visible");
      setTimeout(() => {
        toaster.classList.remove("visible");
      }, 3000);
    }
  };

  return (
    <form
      id={`form-delete-article-${index}`}
      className="flex-column-start-center form-dashboard card-article"
      onSubmit={handleSubmit(() => setShowConfirmDialog(true))}
    >
      <label className="label">Titre</label>
      <textarea
        className="input textarea"
        name="title"
        {...register("title", { required: true })}
        readOnly
        value={title}
      />
      <label className="label">{"Résumé de l'article"}</label>
      <textarea
        className="input textarea"
        name="resume"
        {...register("resume", { required: true })}
        readOnly
        value={resume}
        rows={5}
      />
      <img className="card-img" src={imgUrl} alt="Décoration de la carte" />
      <input
        className="input"
        name="_id"
        {...register("_id", { required: true })}
        readOnly
        hidden
        value={id}
      />
      <button className="btn-submit btn-submit-card" type="submit">
        {" Supprimer l'article"}
      </button>

      <div id="toaster-valid-delete-article" className="toaster valid">
        Article supprimé !
      </div>
      <div id="toaster-invalid-delete-article" className="toaster invalid">
        {"Oups ! Une erreur s'est produite"}
      </div>

      {showConfirmDialog && (
        <div className="bg-card">
          <div className="flex-column-start-center confirm">
            <div className="confirm-text">
              {"Confirmer la suppression de l'article"}
            </div>
            <div className="flex-row-space_evenly-center container-btn-confirm">
              <button
                className="btn-confirm canceled"
                type="button"
                onClick={() => setShowConfirmDialog(false)}
              >
                Annuler
              </button>
              <button
                className="btn-confirm confirmed"
                type="button"
                onClick={handleSubmit(onDeleteConfirm)}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export { CardArticle };

