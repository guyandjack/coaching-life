//import { Collapse } from "react-collapse";
import { useState, useRef, useEffect } from "react";
import { MdExpandMore } from "react-icons/md"; // Chevron-like icons


import { localOrProd } from "../../UTILS/fonctions/testEnvironement.js";
import { cleanTokenInLocalStorage } from "../../UTILS/fonctions/cleanTokenInLocalStorage.js";

import "../../style/CSS/custom-collapse.css";

let result = localOrProd();
let url = result.url;
let heart = `❤️`;

//permet de se deconnecter en suprimant le token d' authentification
function logOut() {
   cleanTokenInLocalStorage(
    "token",
    "admin",
    "time",
    "expire",
    "lastCountUpdated",
    "lastDateUpdated"
  )
  window.location.href = `${url}/index.html`;
}

// eslint-disable-next-line no-unused-vars
function displayAdmin(ref) {
  
  console.log("elemnet ref: " + ref);
  let adminName = localStorage.getItem("admin");

  if (adminName == "sophie") {
   
    ref.current.textContent = `Bonjour Sophie`;
    
    return;
  }

  if (adminName == "guillaume") {
    
    ref.current.textContent = "Bonjour Guillaume";
    return;
  }

  
}

function CustomCollapse() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const summary = useRef(null);
  const chevron = useRef(null);
  const collapsed = useRef(null);
 

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
