// récupération des données du fichier json
const getPhotographers = async () => {
  return await fetch("./data/photographers.json").then((res) => res.json())
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  console.log(photographers)
  displayData(photographers)
}

init()
