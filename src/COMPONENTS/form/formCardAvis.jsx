/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import "../../style/CSS/card-article.css";
import "../../style/CSS/form-dashboard.css";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;

// eslint-disable-next-line no-unused-vars
function CardAvis({ lastname, firstname, content, imgurl, id }) {
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isAvisDeleted, setIsAvisDeleted] = useState(false);
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  
  const onDeleteConfirm = async (data) => {
    const token = localStorage.getItem("token");
    

    try {
      const response = await fetch(`${url}/avis`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if(response.ok) {
        const result = await response.json(); 
        if (result.message_status == "succes") {
          
          let response = await showToaster(`toaster-valid-delete-avis-${id}`);
          
          if (response) {
            
            setShowConfirmDialog(false);
            setIsAvisDeleted(true);
          }

        }
      } else {
        showToaster(`toaster-invalid-delete-avis-${id}`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      showToaster("toaster-invalid-delete-avis");
    }
  };

  const showToaster = async (id) => {
    const toaster = document.getElementById(id);
    
    if (toaster) {
      toaster.classList.add("visible");
      return new Promise((resolve) => {
        
        setTimeout(() => {
         toaster.classList.remove("visible");
          resolve(true);
         
       }, 3000); 

      })
    }
    return false
  };

  return (
    <form
      id={`form-delete-avis-${id}`}
      className="flex-column-space_evenly-center form-dashboard card-article"
      //onSubmit={handleSubmit(() => setShowConfirmDialog(true))}
    >
      <input
        className="input"
        name="id"
        {...register("id", { required: true })}
        readOnly
        hidden
        value={parseInt(id)}
      />
      {/* <label className="label">Titre</label> */}
      <textarea
        className="input textarea"
        name="lastname"
        {...register("title", { required: true })}
        readOnly
        value={lastname + "-" + firstname}
      />
      {/* <label className="label">{"Résumé de l'article"}</label> */}
      <textarea
        className="input textarea"
        name="content"
        {...register("content", { required: true })}
        readOnly
        value={content}
        rows={5}
      />
      <img className="card-img" src={imgurl} alt="Décoration de la carte" />

      {isAvisDeleted  ?
        <button
        id={`btn-submit-card-avis-${id}`}
        className="btn-submit-card disabled"
        type="button"
        disabled
      >
        {"Avis supprimé"}
      </button>
      :<button
        id={`btn-submit-card-avis-${id}`}
        className="btn-submit btn-submit-card"
          type="button"
          onClick={() => {
            setShowConfirmDialog(true);
          }}
        
      >
        {"Suprimer avis"}
      </button>}

      

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
              <div
                id={`toaster-valid-delete-avis-${id}`}
                className="toaster valid"
              >
                {"Avis suprimer"}
              </div>
              <div
                id={`toaster-invalid-delete-avis-${id}`}
                className="toaster invalid"
              >
                {"Oups! une erreur c'est produite"}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export { CardAvis };

