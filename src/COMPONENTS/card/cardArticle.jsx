/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import "../../style/CSS/card-article.css";
import "../../style/CSS/form-dashboard.css";

let objectUrl = localOrProd();
let url = objectUrl.urlApi;

// eslint-disable-next-line no-unused-vars
function CardArticle({ title, imgUrl, resume, id }) {

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isValidDelete, setisValidDelete] = useState(false);

  const { register, handleSubmit} = useForm({ mode: "onChange" });
  


  const onDeleteConfirm = async (data) => {
    const token = localStorage.getItem("token");
    

    try {
      const response = await fetch(`${url}/article`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToaster("toaster-valid-delete-article");
        setisValidDelete(true)
      } else {
        showToaster("toaster-invalid-delete-article");
        setisValidDelete(false)
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      showToaster("toaster-invalid-delete-article");
      setisValidDelete(false)
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

  
  
   async function deleteOneArticle(e) {
    //procedure de supression sur serveur
     handleSubmit(onDeleteConfirm)();
    
    console.log("isvalidelete:   " + isValidDelete);
     if (isValidDelete) {
      
       
       //recupere l' element carte du DOM
       let formParent = e.target.closest(".card-article");
       console.log("cqrte pqrent:  " + e.target.closest(".card-article"));
   
       //recupere l' id de la carte
       let cardId = formParent.getAttribute("id");
       console.log("card id:  " + cardId);
   
       //recupere le btn submit de la carte
       let btnSubmit = formParent.querySelector(".btn-submit-card");
       console.log("btn submit:  " + btnSubmit);
   
       //recuperel'id du bouton suprimer de la carte
       let btnDeleteId = btnSubmit.getAttribute("id");
       console.log("btn delete Id:  " + btnDeleteId);
   
       let elementBtn = document.querySelector(`#${btnDeleteId}`);
       //desactive le btn suprimer
       elementBtn.setAttribute("disabled", "true");
       
       //modifie le style de la carte
       let elementCard = document.querySelector(`#${cardId}`);
       elementCard.classList.add("disabled");
   
       //supression de la boite de dialog confirm
       setShowConfirmDialog(false);
     
    }   

   
  }

  

  return (
    <form
      id={`form-delete-article-${id}`}
      className="flex-column-space_evenly-center form-dashboard card-article"
      //onSubmit={handleSubmit(() => setShowConfirmDialog(true))}
      
    >
      <input
        className="input"
        name="id"
        {...register("id", { required: true })}
        readOnly
        hidden
        value={id}
      />
      {/* <label className="label">Titre</label> */}
      <textarea
        className="input textarea"
        name="title"
        {...register("title", { required: true })}
        readOnly
        value={title}
      />
      {/* <label className="label">{"Résumé de l'article"}</label> */}
      <textarea
        className="input textarea"
        name="resume"
        {...register("content", { required: true })}
        readOnly
        value={resume}
        rows={5}
      />
      <img className="card-img" src={imgUrl} alt="Décoration de la carte" />

      <button
        id={`btn-submit-card-${id}`}
        className="btn-submit btn-submit-card"
        type="button"
        onClick={()=>{setShowConfirmDialog(true)}}
      
      >
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
                onClick={(e)=>{deleteOneArticle(e)}}
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

