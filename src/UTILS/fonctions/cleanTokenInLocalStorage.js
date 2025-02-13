function cleanTokenInLocalStorage(...arg) {
    try {
        
        arg.forEach((item) => {
            if (localStorage.getItem(item)) {
                
                localStorage.removeItem(item)
            }
            else {
                console.warn("item non trouvé : " + item)
            }
        })

    }
    catch (e) {
        console.warn("une erreur c' est produite: " + e.message)
    }
}

export {cleanTokenInLocalStorage}