// récupération des données du fichier json
const getPhotographers = async () => {
  return await fetch("./data/photographers.json").then((res) => res.json())
}

const getMedia = async () => {
  return await fetch("./data/photographers.json").then((res) => res.json())
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  console.log(photographers)
  const { media } = await getMedia()
  console.log(media)
  displayData(photographers)
}

init()
