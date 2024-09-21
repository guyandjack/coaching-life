//import { Collapse } from "react-collapse";
import { useState, useRef, useEffect } from "react";
import { MdExpandMore } from "react-icons/md"; // Chevron-like icons

import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";

import "../../style/CSS/custom-collapse.css";

let result = localOrProd();
let url = result.url;

//permet de se deconnecter en suprimant le token d' authentification
function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  window.location.href = `${url}/index.html`;
}

// eslint-disable-next-line no-unused-vars
function displayAdmin(ref) {
  //const spanAvatar = document.querySelector(".admin-avatar");
  console.log("elemnet ref: " + ref);
  let adminName = localStorage.getItem("admin");

  if (adminName == "sophie") {
    //spanAvatar.textcontent = "👩 ";
    ref.current.textContent = "Bonjour Sophie";
    return;
  }

  if (adminName == "guillaume") {
    //spanAvatar.textContent = `🦾 `;
    ref.current.textContent = "Bonjour Guillaume";
    return;
  }

  /* ref.current.textContent = "Utilisateur non autorisé";
  setTimeout(() => {
    window.location.href = `${url}/index.html`;
  }, 2000); */
}

function CustomCollapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const summary = useRef();
  const chevron = useRef();
    const collapsed = useRef();
    let heart = `❤️`;

  useEffect(() => {
    displayAdmin(summary);
  }, []);

  const handleLogOut = () => {
    setIsLog(false);
    setTimeout(() => {
      logOut();
    }, 3000);
  };

  const handleClickChevron = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      chevron.current.classList.add("chevron-transition");
      collapsed.current.classList.add("visible");
    } else {
      chevron.current.classList.remove("chevron-transition");
      collapsed.current.classList.remove("visible");
    }
  };

  return (
    <ul className="relative container-collapse">
      <li
        className="flex-row-start-center container-chevron"
        onClick={handleClickChevron}
      >
        <div className="trigger" ref={summary}></div>
        <div className="normal" ref={chevron}>
          <MdExpandMore className="chevron" />
        </div>
      </li>

      <li onClick={handleLogOut} ref={collapsed} className="flex-row-start-center collapsed">
        Logout
      </li>

      {isLog ? null : <li className="log-out">{`A bientôt !${heart}`}</li>}
    </ul>
  );
}

export { CustomCollapse };
