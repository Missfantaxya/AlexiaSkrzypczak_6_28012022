//Mettre le code JavaScript lié à la page photographer.html
let urlRechercheParams = new URLSearchParams(window.location.search)
let idUrl = parseInt(urlRechercheParams.get("id"))
// console.log(idUrl) //*ok

// async function displayData(photographers) {
//   console.log("photograpers2 :", photographers) //!

//   const photographHeader = document.querySelector(".photograph-header")
//   console.log("photographHeader :", photographHeader) //!
//   const contact = document.querySelector(".contact_button")

//   photographers.forEach((photographer) => {
//     const photographerModel = photographerFactory(photographer)
//     const UserProfilDOM = photographerModel.getUserProfilDOM()
//     photographHeader.appendChild(UserProfilDOM)
//   })
// }

async function displayData(photographers, media) {
  const photographerSection = document.querySelector("#main")
  // console.log("photographerSection :", photographerSection) //*ok

  console.log(idUrl)

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

  // TODO découper pour chaque photogrpher.id == media.photographerId
  console.log(media)

  console.log("id", idUrl)

  // media.filter((mediaElement => mediaElement.photographerId == idUrl) => {
  //   const mediaModel = mediaFactory(mediaElement)
  //   const mediaElementDOM = mediaModel.getpictureCardDOM()
  //   pictures.appendChild(mediaElementDOM)
  // })

  const elementsMedia = media.filter(
    (elementsMedia) => elementsMedia.photographerId == idUrl
  )
  console.log(elementsMedia)

  elementsMedia.forEach( elementMedia ) => {
  //   const mediaModel = mediaFactory(elementMedia)
  //   const elementMediaDOM = mediaModel.getpictureCardDOM()
  // pictures.appendChild(elementMediaDOM)
    // !
  }
}
