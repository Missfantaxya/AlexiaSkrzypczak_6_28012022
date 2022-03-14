// TODO ajouter le photo choisi par le photographe
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")
  // console.log("photographersSection :", photographersSection) //*ok

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}
