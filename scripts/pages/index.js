async function getPhotographers ()
{
    // récupération des données du fichier json
    const data = require( "../../data/photographers.json" )
    // sélection des données des photographes dans les données globales
    const photographers = data.photographers
    // renvoie des données sélectionnées sous forme de tableau
    return {
        photographers: [ ...photographers ]
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
