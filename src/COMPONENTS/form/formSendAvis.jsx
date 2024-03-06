//composant form "sendAvis"

//import des librairies
import { useForm } from "react-hook-form";

//import des composants enfants
import { Input } from "../input.jsx";

function FormSendAvis() {
  return (
    <form
      id="upload-avis"
      className="form"
      method="post"
      action="../JSX/dashboard.jsx"
    >
      <div id="input-lastname" className="cont-input"></div>
      <div id="input-firstname" className="cont-input"></div>
      <div id="avatar" className="cont-input"></div>
      <div id="textarea" className="cont-input"></div>
      <div id="social" className="cont-input"></div>
    </form>
  );
}

export { FormSendAvis };
