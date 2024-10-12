//composant error 404

import Space404 from "react-space-404";
//import { useEffect, useState } from "react";

function Error404() {
  //const [redirect, setRedirect] = useState(""); // Initialiser avec une chaîne vide

  /* useEffect(() => {
    // Vérifier si la page précédente est disponible
    const referrer = document.referrer || "/";
    console.log("URL de la page précédente :", referrer);
    setRedirect(referrer); // Utiliser "/" si aucune page précédente n'est disponible
  }, []); */

  return <Space404  stay />;
}

export { Error404 };
