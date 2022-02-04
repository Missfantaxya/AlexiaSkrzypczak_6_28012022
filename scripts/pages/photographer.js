//Mettre le code JavaScript lié à la page photographer.html

// TODO faire fonctionner le bouton de contact

// récupération de l'id du photographe dans l'url
let urlRechercheParams = new URLSearchParams(window.location.search)
let idUrl = parseInt(urlRechercheParams.get("id"))
// console.log(idUrl) //*ok

async function displayData(photographers, media) {
  // La parties avec le photographe :----------------------------------------

  const photographHeader = document.querySelector(".photograph-header")
  const contact = document.querySelector(".contact_button")

  const photographer = photographers.filter(
    (photographer) => photographer.id == idUrl
  )
  // console.log(photographer) //*ok

  const photographerModel = photographerFactory(photographer)
  const UserProfilDOM = photographerModel.getUserProfilDOM()
  photographHeader.insertBefore(UserProfilDOM, contact)

  const photographerAvatarModel = photographerFactory(photographer)
  const UserAvatarDOM = photographerAvatarModel.getUserAvatarDOM()
  photographHeader.appendChild(UserAvatarDOM)

  // La partie avec les médias :--------------------------------------

  const photographerSection = document.querySelector("#main")
  // console.log("photographerSection :", photographerSection) //*ok
  // console.log(idUrl) //*ok

  const mediaSection = document.createElement("div")
  mediaSection.className = "mediaSection"
  photographerSection.appendChild(mediaSection)

  const selectForm = document.createElement("form")
  selectForm.className = "selectForm"
  mediaSection.appendChild(selectForm)

  const selectLabel = document.createElement("label")
  selectLabel.className = "selectLabel"
  selectLabel.textContent = "Trier par"
  selectForm.appendChild(selectLabel)

  // TODO style du select
  const selectOption = document.createElement("select")
  selectOption.className = "selectLabel"
  selectForm.appendChild(selectOption)

  const popularityOption = document.createElement("option")
  popularityOption.className = "popularityOption"
  popularityOption.setAttribute("value", "popularité")
  popularityOption.textContent = "Popularité"
  selectOption.appendChild(popularityOption)

  const dateOption = document.createElement("option")
  dateOption.className = "dateOption"
  dateOption.setAttribute("value", "date")
  dateOption.textContent = "Date"
  selectOption.appendChild(dateOption)

  const titreOption = document.createElement("option")
  titreOption.className = "popularityOption"
  titreOption.setAttribute("value", "titre")
  titreOption.textContent = "Titre"
  selectOption.appendChild(titreOption)

  const pictures = document.createElement("div")
  pictures.className = "pictures"
  mediaSection.appendChild(pictures)

  // console.log(media) //*ok
  // console.log("id", idUrl) //*ok

  const elementsMedia = media.filter(
    (elementsMedia) => elementsMedia.photographerId == idUrl
  )
  // console.log(elementsMedia) //*ok

  elementsMedia.forEach((elementMedia) => {
    const mediaModel = mediaFactory(elementMedia)
    const elementMediaDOM = mediaModel.getpictureCardDOM()
    pictures.appendChild(elementMediaDOM)
  })
}
