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

  //récupération des média du photographe
  const elementsMedia = media.filter(
    (elementsMedia) => elementsMedia.photographerId == idUrl
  )

  // récupération des likes de chaque média du photographe
  const mediasLikes = elementsMedia.map((oneMediaLikes) => oneMediaLikes.likes)

  // addition de tous les likes du photographe
  let initialLike = 0
  const photographerAllLikes = mediasLikes.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialLike
  )
  // TODO attention à chq incrémentation(function ++ a faire sur total)

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

  const mediaSection = document.createElement("div")
  mediaSection.className = "mediaSection"
  photographerSection.appendChild(mediaSection)

  const selectForm = document.createElement("div")
  selectForm.className = "selectForm"
  mediaSection.appendChild(selectForm)

  const selectLabel = document.createElement("p")
  selectLabel.className = "selectLabel"
  selectLabel.textContent = "Trier par"
  selectForm.appendChild(selectLabel)

  const selection = document.createElement("div")
  selection.className = "selection hidden"
  selectForm.appendChild(selection)

  const selectButton = document.createElement("button")
  selectButton.className = "selectButton close"
  selection.appendChild(selectButton)

  //ouverture de la selection
  selectButton.addEventListener("click", function () {
    selection.classList.remove("hidden")
    selectButton.classList.remove("close")
  })

  const selectOptions = document.createElement("div")
  selectOptions.className = "selectOptions"
  selection.appendChild(selectOptions)

  const selectArrow = document.createElement("div")
  selectArrow.className = "selectArrow"
  selectArrow.textContent = ">"
  selectOptions.appendChild(selectArrow)

  // TODO ajouter avec fontAwesome
  // const chevron = document.createElement("i")
  // chevron.className = "fa-solid fa-chevron-down"
  // chevron.appendChild(selectArrow)

  const popularityOption = document.createElement("p")
  popularityOption.className = "selectOption popularityOption"
  popularityOption.textContent = "Popularité"
  selectOptions.appendChild(popularityOption)

  popularityOption.addEventListener("click", function () {
    selection.classList.add("hidden")
    selectButton.classList.add("close")
    //TODO classer les image par popularité (en fonction des likes)
  })

  const dateOption = document.createElement("p")
  dateOption.className = "selectOption dateOption"
  dateOption.textContent = "Date"
  selectOptions.appendChild(dateOption)

  dateOption.addEventListener("click", function () {
    selection.classList.add("hidden")
    selectButton.classList.add("close")
    // TODO positionner le select pour rendre visible le selectOption
    //   //TODO classer les image par date
  })

  const titleOption = document.createElement("p")
  titleOption.className = "selectOption titleOption"
  titleOption.textContent = "Titre"
  selectOptions.appendChild(titleOption)

  titleOption.addEventListener("click", function () {
    selection.classList.add("hidden")
    selectButton.classList.add("close")
    // TODO positionner le select pour rendre visible le selectOption
    //   //TODO classer les image par titre (alphabétique)
  })

  const pictures = document.createElement("div")
  pictures.className = "pictures"
  mediaSection.appendChild(pictures)

  elementsMedia.forEach((elementMedia) => {
    const mediaModel = mediaFactory(elementMedia)
    const elementMediaDOM = mediaModel.getpictureCardDOM()
    pictures.appendChild(elementMediaDOM)
  })
}
