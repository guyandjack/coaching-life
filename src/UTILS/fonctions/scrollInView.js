
//realise un scroll vers un element de la page
function smoothScroll(classElement) {
    
    let arrayLinkMenu = document.querySelectorAll(`.${classElement}`);
    arrayLinkMenu.forEach((link) => {
        link.addEventListener("click", (e) => {
            let elementLink = e.target;
            let targetScrollId = elementLink.dataset.link;
           
            let targetScrollElement = document.querySelector(`#${targetScrollId}`)
            targetScrollElement.scrollIntoView({ behavior: "smooth" });
            
        })
    })

}

export {smoothScroll}

