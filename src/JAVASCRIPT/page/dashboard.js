/// concerne les script de la apge "dashboard"




const linkLogOut = document.querySelector(".log-out");

if (linkLogOut) {
  linkLogOut.addEventListener("click", (e) => {
    e.preventDefault(); // Correction de l'appel de preventDefault
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "./index.html";
  });
}
