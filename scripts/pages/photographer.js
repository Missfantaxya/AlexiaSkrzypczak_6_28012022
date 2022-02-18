//Mettre le code JavaScript lié à la page photographer.html

// TODO faire fonctionner le bouton de contact

// récupération de l'id du photographe dans l'url
let urlRechercheParams = new URLSearchParams(window.location.search)
let idUrl = parseInt(urlRechercheParams.get("id"))
// console.log(idUrl) //*ok

async function displayData(photographers, media) {
  // La parties avec le photographe :----------------------------------------

  const heartSvg = "assets/icons/heart-solid.svg"

  const photographHeader = document.querySelector(".photograph-header")
  const contact = document.querySelector(".contact_button")

  // tableau du photographe
  const photographer = photographers.filter(
    (photographer) => photographer.id == idUrl
  )

  // Utilisation de la factory photographer pour afficher les détails du photographe
  const photographerModel = photographerFactory(photographer)
  const UserProfilDOM = photographerModel.getUserProfilDOM()
  photographHeader.insertBefore(UserProfilDOM, contact)

  // Utilisation de la factory photographer pour afficher l'avatar du photographe
  const photographerAvatarModel = photographerFactory(photographer)
  const UserAvatarDOM = photographerAvatarModel.getUserAvatarDOM()
  photographHeader.appendChild(UserAvatarDOM)

  // tableau avec les médias du photographe
  const photographerMedias = media.filter(
    (photographerMedia) => photographerMedia.photographerId == idUrl
  )

  // récupération des likes de chaque média du photographe
  const mediasLikes = photographerMedias.map(
    (oneMediaLikes) => oneMediaLikes.likes
  )

  // addition de tous les likes du photographe
  let initialLike = 0
  const photographerAllLikes = mediasLikes.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialLike
  )

  const priceAndLike = document.createElement("div")
  priceAndLike.className = "priceAndLike"
  photographHeader.appendChild(priceAndLike)

  const wrapperLikes = document.createElement("div")
  wrapperLikes.className = "wrapperLikes"
  priceAndLike.appendChild(wrapperLikes)

  const photographerLike = document.createElement("p")
  photographerLike.className = "photographerLike"
  photographerLike.textContent = photographerAllLikes
  wrapperLikes.appendChild(photographerLike)

  const heartphotographer = document.createElement("img")
  heartphotographer.className = "heart"
  heartphotographer.setAttribute("src", heartSvg)
  wrapperLikes.appendChild(heartphotographer)

  const photographerPrice = document.createElement("p")
  photographerPrice.className = "photographerPrice"
  photographerPrice.textContent = photographer[0].price + "€ / jour"
  priceAndLike.appendChild(photographerPrice)

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
