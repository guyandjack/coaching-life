//affiche les avis dans la banner des avis

async function createElementAvis() {
  try {
    const bannerAvis = document.getElementById("banner-avis");
    let elementAvis = document.createElement("div");
    console.log("banner avis : " + bannerAvis);
    console.log("element avis : " + elementAvis);
    elementAvis.setAttribute("class", "container-avis");
    bannerAvis.appendChild(elementAvis);
    return elementAvis;
  } catch (error) {
    console.log("erreur Element container avis: " + error);
    return false;
  }
}

async function createElementContentText(parentElement, content) {
  try {
    let contentText = document.createElement("p");
    contentText.setAttribute("class", "avis-content-text");

    contentText.textContent = content;
    parentElement.appendChild(contentText);
    return true;
  } catch (error) {
    console.log("erreur Element content Text: " + error);
    return false;
  }
}

async function createElementInfoUser(parentElement, firstname, lastname) {
  try {
    let infoUser = document.createElement("span");
    infoUser.setAttribute("class", "avis-info-user");
    let firstLetterName = lastname.split("")[0];
    infoUser.textContent = firstname + " " + firstLetterName;
    parentElement.appendChild(infoUser);
    return true;
  } catch (error) {
    console.log("erreur Element infoUser: " + error);
    return false;
  }
}

async function createElementAvatarImg(parentElement, urlImg) {
  try {
    let avatar = document.createElement("img");
    avatar.setAttribute("src", "http://localhost:5500/api/avatar/" + urlImg);
    avatar.setAttribute("alt", "avatar du redacteur de l' avis");

    avatar.setAttribute("class", "avis-avatar-img");
    parentElement.appendChild(avatar);
    return true;
  } catch (error) {
    console.log("erreur Element avatar: " + error);
    return false;
  }
}
async function createElementAvatarText(parentElement, lastname, firstname) {
  try {
    let avatar = document.createElement("div");
    let initialLN = lastname.split("")[0].toUpperCase();
    let initialFN = firstname.split("")[0].toUpperCase();
    avatar.textContent = initialLN + " " + initialFN;

    avatar.setAttribute("class", "avis-avatar-bis");
    parentElement.appendChild(avatar);
    return true;
  } catch (error) {
    console.log("erreur Element avatar: " + error);
    return false;
  }
}

/*function createElementSocialLink(parentElement, urlUser) {
    try {
      let socialLink = document.createElement("a");
        socialLink.setAttribute("class", "avis-social-link");
        socialLink.setAttribute("href", urlUser)
      
      parentElement.appendChild(socialLink);
      return true;
    } catch (error) {
      console.log("erreur Element social link: " + error);
      return false;
    }
}*/

async function getAllAvis() {
  try {
    const resultFetch = await fetch("http://localhost:5500/api/avis", {
      method: "GET",
    });

    let jsonResult = await resultFetch.json();
    console.log("jsonResult: " + jsonResult[0]);

    return jsonResult;
  } catch (error) {
    console.log("imposiible de faire la requette fetch: " + error);
  }
}

// eslint-disable-next-line no-unused-vars
async function displayOneAvis(index, tabfrombdd) {
  if (!tabfrombdd) {
    return "pas de resultat suite a la requete";
  }
  console.log("urlimg: " + tabfrombdd[index]["url_img"]);

  let containerAvis = await createElementAvis();

  // eslint-disable-next-line no-unused-vars
  let info = await createElementInfoUser(
    containerAvis,
    tabfrombdd[index]["first_name"],
    tabfrombdd[index]["last_name"]
  );
  // eslint-disable-next-line no-unused-vars
  let content = await createElementContentText(
    containerAvis,
    tabfrombdd[index]["content"]
  );

  // eslint-disable-next-line no-undef
  if (tabfrombdd[index]["url_img"] !== null) {
    // eslint-disable-next-line no-unused-vars
    let avatar = await createElementAvatarImg(
      containerAvis,
      tabfrombdd[index]["url_img"]
    );
  } else {
    // eslint-disable-next-line no-unused-vars
    let avatar = await createElementAvatarText(
      containerAvis,
      tabfrombdd[index]["last_name"],
      tabfrombdd[index]["first_name"]
    );
  }
  // eslint-disable-next-line no-unused-vars
}

//affiche tous les avis de la bdd
async function displayAllAvis() {
  let avisOfDataBase = await getAllAvis();

  avisOfDataBase.forEach((avis, index) => {
    displayOneAvis(index, avisOfDataBase);
  });
}

displayAllAvis();
