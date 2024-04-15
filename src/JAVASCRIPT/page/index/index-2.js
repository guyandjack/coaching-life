//import des fonctions
import { isScreenMobil } from "../../../UTILS/fonctions/isScreenMobil.js";

//gere l' afficha des liens sur ecran mobile < 700

function displayLink() {
  let containerLink = document.querySelector(".link-container");
  let isSmallScreen = isScreenMobil();

  console.log("fonction is runing");

  if (isSmallScreen && containerLink.classList.contains("hide")) {
    containerLink.classList.remove("hide");
    return;
  }

  if (!isSmallScreen && !containerLink.classList.contains("hide")) {
    containerLink.classList.add("hide");
    return;
  }
}

window.document.addEventListener("resize", function (e) {
  console.log("evenement resize: " + e);
  displayLink();
});
