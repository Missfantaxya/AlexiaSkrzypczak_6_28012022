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
  console.log("elementsMedia :", elementsMedia)

  // récupération des likes de chaque média du photographe
  const mediasLikes = elementsMedia.map((oneMediaLikes) => oneMediaLikes.likes)

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

  // TODO incrémentation du nombre totale de like au click sur un like (function ++ a faire sur total)
  // const numberOfLikes = document.querySelectorAll(".pictureLikes")
  // console.log("numberOfLikes :", numberOfLikes) //!

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

  const pictures = document.createElement("div")
  pictures.className = "pictures"
  mediaSection.appendChild(pictures)

  // classement des média par popularité
  elementsMedia.sort(function (a, b) {
    return a.likes - b.likes
  })

  // // affichage des medias
  // elementsMedia.forEach((elementMedia) => {
  //   const mediaModel = mediaFactory(elementMedia)
  //   const elementMediaDOM = mediaModel.getpictureCardDOM()
  //   pictures.appendChild(elementMediaDOM)
  // })

  function displayMedia() {
    elementsMedia.forEach((elementMedia) => {
      const mediaModel = mediaFactory(elementMedia)
      const elementMediaDOM = mediaModel.getpictureCardDOM()
      pictures.appendChild(elementMediaDOM)
    })
  }
  console.log("displayMedia : ", displayMedia) //* ok

  displayMedia()

  //ouverture de la selection
  selectButton.addEventListener("click", function () {
    selection.classList.remove("hidden")
    selectButton.classList.remove("close")
    popularityOption.classList.add("open")
    dateOption.classList.add("open")
    titleOption.classList.add("open")
    selectArrow.classList.remove("down")
    selectArrow.classList.add("up")
  })

  const selectOptions = document.createElement("div")
  selectOptions.className = "selectOptions"
  selection.appendChild(selectOptions)

  const selectArrow = document.createElement("div")
  selectArrow.className = "selectArrow down"
  selectArrow.textContent = ">"
  selection.appendChild(selectArrow)

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
    popularityOption.classList.remove("open")
    dateOption.classList.remove("open")
    titleOption.classList.remove("open")
    selectOptions.classList.remove("title")
    selectOptions.classList.remove("date")
    selectButton.classList.add("close")
    // TODO meilleur méthode : changer l'orde des éléments selectOption
    selectArrow.classList.remove("up")
    selectArrow.classList.add("down")

    // classement des média par popularité
    elementsMedia.sort((a, b) => a.likes - b.likes)
    console.log("elementsMedia by popularity :", elementsMedia) //* ok

    displayMedia()
  })

  const dateOption = document.createElement("p")
  dateOption.className = "selectOption dateOption"
  dateOption.textContent = "Date"
  // dateOption.setAttribute("onClick", displayMedia)
  selectOptions.appendChild(dateOption)

  dateOption.addEventListener("click", function () {
    selection.classList.add("hidden")
    popularityOption.classList.remove("open")
    dateOption.classList.remove("open")
    titleOption.classList.remove("open")
    selectOptions.classList.remove("title")
    selectOptions.classList.add("date")
    selectButton.classList.add("close")
    selectArrow.classList.remove("up")
    selectArrow.classList.add("down")
    dateOption.insertBefore
    // TODO positionner le select pour rendre visible le selectOption
    // TODO convertir la date en timestamp
    //TODO classer les images par date
    // console.log("date : ", elementsMedia[0].date) //* ok
    // console.log("date parse : ", Date.parse(elementsMedia[0].date)) //* ok
    elementsMedia.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    console.log("elementsMedia by date :", elementsMedia)

    displayMedia() //!
  })

  const titleOption = document.createElement("p")
  titleOption.className = "selectOption titleOption"
  titleOption.textContent = "Titre"
  selectOptions.appendChild(titleOption)

  titleOption.addEventListener("click", function () {
    selection.classList.add("hidden")
    popularityOption.classList.remove("open")
    dateOption.classList.remove("open")
    titleOption.classList.remove("open")
    selectOptions.classList.remove("date")
    selectOptions.classList.add("title")
    selectButton.classList.add("close")
    // TODO changer l'odre des select meilleur méthode que glisser la selection
    selectArrow.classList.remove("up") //~
    selectArrow.classList.add("down") //~
    // classer elementsMedia par titre (alphabétique)
    elementsMedia.sort(function compoare(a, b) {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
    console.log("elementsMedia by title :", elementsMedia) //* ok
    displayMedia() //!
  })
}
