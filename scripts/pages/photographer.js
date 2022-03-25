//Mettre le code JavaScript lié à la page photographer.html

// TODO faire fonctionner le bouton de contact

// récupération de l'id du photographe dans l'url
let urlRechercheParams = new URLSearchParams(window.location.search)
let idUrl = parseInt(urlRechercheParams.get("id"))
// console.log(idUrl) //*ok

function TestId(id) {
  console.log(id)
}

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
  // console.log("elementsMedia :", elementsMedia) //*ok

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
  // console.log("photographerSection : ", photographerSection) //*ok

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

  // function pour afficher les media
  function displayMedia() {
    //vidage de pictures avant son remplissage pour permettre de le classer en fonction de la selection
    pictures.textContent = ""
    elementsMedia.forEach((elementMedia) => {
      const mediaModel = mediaFactory(elementMedia)
      const elementMediaDOM = mediaModel.getpictureCardDOM()
      pictures.appendChild(elementMediaDOM)
      // console.log(elementMedia.title) //*ok
    })
  }

  // indexOf ou filter pour récup id de [elementsMedia] == id du média cliqué (cf data dans media) et servir de l'id +1 ou -1 pour suivant et précédent.

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

  const popularityOption = document.createElement("p")
  popularityOption.className = "selectOption popularityOption"
  popularityOption.textContent = "Popularité"
  popularityOption.setAttribute("onClick", "displayMedia()")
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
    // console.log("elementsMedia by popularity :", elementsMedia) //* ok

    displayMedia()
    displayMediaCarousel()
  })

  const dateOption = document.createElement("p")
  dateOption.className = "selectOption dateOption"
  dateOption.textContent = "Date"
  dateOption.setAttribute("onClick", "displayMedia()")
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
    elementsMedia.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    // console.log("elementsMedia by date :", elementsMedia) //* ok

    displayMedia()
    displayMediaCarousel()
  })

  const titleOption = document.createElement("p")
  titleOption.className = "selectOption titleOption"
  titleOption.textContent = "Titre"
  titleOption.setAttribute("onClick", "displayMedia()")
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
    // console.log("elementsMedia by title :", elementsMedia) //*ok
    displayMedia()
    displayMediaCarousel()
  })

  // La Lightbox-----------------------------------

  function displayMediaCarousel() {
    // TODO afficher le média cliqué (récup id ds [elementsMedia] et place le media ==id  dans viewOneMedia : (id+1)x1000px sur la gauche.)
    carousel.textContent = ""
    console.log("elementsMedia :", elementsMedia) // *ok
    elementsMedia.forEach((elementMedia) => {
      const mediaModel = mediaFactory(elementMedia)
      const elementMediaCarouselDOM = mediaModel.getMediaCarousel()
      carousel.appendChild(elementMediaCarouselDOM)
    })
  }

  const lightbox = document.createElement("aside")
  lightbox.id = "lightbox"
  photographerSection.after(lightbox)

  const dialog = document.createElement("div")
  dialog.className = "dialog"
  lightbox.appendChild(dialog)

  function stopLink(event) {
    event.preventDefault()
    // console.log("stop link") //*ok
  }

  const previous = document.createElement("a")
  previous.className = "previous"
  previous.setAttribute("href", "media précédent")
  previous.textContent = "<"
  dialog.appendChild(previous)

  function previousMedia() {
    // TODO
    // carousel.style.transform = "translate(-1000px)" //!
    console.log("previous media") //* ok
  }

  function previousClick() {
    stopLink(event)
    previousMedia()
  }

  previous.addEventListener("click", previousClick)

  const viewOneMedia = document.createElement("div")
  viewOneMedia.className = "viewOneMedia"
  dialog.appendChild(viewOneMedia)

  const carousel = document.createElement("ul")
  carousel.className = "carousel"
  viewOneMedia.appendChild(carousel)
  displayMediaCarousel()

  const following = document.createElement("a")
  following.setAttribute("href", "media suivant")
  following.className = "following"
  following.textContent = ">"
  dialog.appendChild(following)

  function followingMedia() {
    // TODO avec index (lenght-1)
    console.log("following media") //*ok
  }

  function followingClick() {
    stopLink(event)
    followingMedia()
  }

  following.addEventListener("click", followingClick)

  const closeLightbox = document.createElement("button")
  closeLightbox.className = "closeLightbox"
  closeLightbox.textContent = "X"
  dialog.appendChild(closeLightbox)

  function stopLightboxSubmit(event) {
    event.preventDefault()
    // console.log("stop Submit") //*ok
  }

  function closeLightboxButton() {
    lightbox.style.display = "none"
    main.style.display = "block"
    // console.log("close lightbox") //*ok
  }

  function closeLightboxClick() {
    stopLightboxSubmit(event)
    closeLightboxButton()
  }

  closeLightbox.addEventListener("click", closeLightboxClick)
}
