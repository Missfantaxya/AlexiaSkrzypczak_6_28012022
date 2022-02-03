//Mettre le code JavaScript lié à la page photographer.html

async function displayData(media, photographers) {
  const photographerSection = document.querySelector(".photograph-header")

  const mediaSection = document.querySelector("#main")
  console.log(mediaSection)

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

  media.forEach((picture) => {
    const mediaModel = mediaFactory(picture)
    const pictureDOM = mediaModel.getpictureCardDOM()
    mediaSection.appendChild(pictureDOM)
  })
}
