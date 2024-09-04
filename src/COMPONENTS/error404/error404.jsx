//composant error 404

import Space404 from "react-space-404";

import { useEffect, useState } from "react";



function Error404() {

  const [redirect, setRedirect] = useState();

    useEffect(() => {
      console.log("URL de la page précédente :", document.referrer);
      setRedirect(document.referrer);
    }, []);
  return (
    <Space404  href={redirect} stay />)
}

export {Error404}
