// récupération des données du fichier json
const getPhotographers = async () =>
{
  return await fetch( "./data/photographers.json" ).then( ( res ) => res.json() )
}

const getMedia = async () =>
{
  return await fetch( "./data/photographers.json" ).then( ( res ) => res.json() )
}

async function init ()
{
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  // console.log( "photographers", photographers ) //*ok
  const { media } = await getMedia()
  // console.log( "media", media ) //*ok
  displayData( photographers, media )
}

init()
