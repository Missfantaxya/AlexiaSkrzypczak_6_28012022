//Mettre le code JavaScript lié à la page photographer.html

// TODO revoir les descriptions des médias (j'ai inversé certaines) dans la data

// TODO faire fonctionner le bouton de contact

// ----- récupération de l'id du photographe dans l'url -----

/**
 * Récupère les paramètres de l'url
 * @type {object}
 */
let urlResearchParams = new URLSearchParams( window.location.search )

/**
 * Récupère l'id du photographe dans les paramètres de l'url
 * @type {number}
 */
let idUrl = parseInt( urlResearchParams.get( "id" ) )

/**
 * Affiche les donées et les médias du photographe
 * @param {object} photographers - la liste des photographes
 * @param {object} media - la liste des médias
 */
async function displayData ( photographers, media )
{
  // ========== La parties avec le photographe ==========

  const heartSvg = "assets/icons/heart-solid-black.svg"

  const photographHeader = document.querySelector( ".photograph__header" )
  const photographContact = document.querySelector( ".contact__button" )

  /**
   * Donées du photographe
   * @const {object[]}
   */
  const photograph = photographers.filter(
    ( photograph ) => photograph.id == idUrl
  )

  // ----- Affichage des donées du photographe -----
  const photographerModel = photographerFactory( photograph )
  const photographProfilDOM = photographerModel.getPhotographProfilDOM()
  photographHeader.insertBefore( photographProfilDOM, photographContact )

  // ----- Affichage de l'avatar du photographe -----
  const photographerAvatarModel = photographerFactory( photograph )
  const UserAvatarDOM = photographerAvatarModel.getUserAvatarDOM()
  photographHeader.appendChild( UserAvatarDOM )

  // ========== La parties avec les likes du photographe ==========

  /**
   * Les médias d'un photographe
   * @const {object[]}
   */
  const photographMedias = media.filter(
    ( photographMedia ) => photographMedia.photographerId == idUrl
  )

  /**
   * Les likes par média du pohotographe
   * @const {number[]}
   */
  const mediasLikes = photographMedias.map( ( oneMediaLikes ) => oneMediaLikes.likes )

  /**
   * Initiation du nombre de like
   * @var {number}
   */
  let initialLike = 0
  /**
   * Nombre total de likes du photographe
   * @const {number}
   */
  const photographerAllLikes = mediasLikes.reduce(
    ( previousValue, currentValue ) => previousValue + currentValue,
    initialLike
  )

  // ----- construction du DOM -----
  const photographPriceAndLike = document.createElement( "div" )
  photographPriceAndLike.className = "photograph__priceAndLike"
  photographHeader.appendChild( photographPriceAndLike )

  const photographWrapperLikes = document.createElement( "div" )
  photographWrapperLikes.className = "photograph__wrapperLikes"
  photographPriceAndLike.appendChild( photographWrapperLikes )

  const photographLike = document.createElement( "p" )
  photographLike.className = "photograph__likes"
  photographLike.textContent = photographerAllLikes
  photographWrapperLikes.appendChild( photographLike )

  const photographHeart = document.createElement( "img" )
  photographHeart.className = "photograph__heart"
  photographHeart.setAttribute( "src", heartSvg )
  photographWrapperLikes.appendChild( photographHeart )

  const photographPrice = document.createElement( "p" )
  photographPrice.className = "photograph__price"
  photographPrice.textContent = photograph[ 0 ].price + "€ / jour"
  photographPriceAndLike.appendChild( photographPrice )

  // ========== La parties avec les médias ==========

  // ----- construction du DOM -----

  const main = document.querySelector( "#main" )

  const mediaSection = document.createElement( "section" )
  mediaSection.className = "media__section"
  main.appendChild( mediaSection )

  const mediaTitle = document.createElement( "h2" )
  mediaTitle.className = "media__title"
  mediaTitle.textContent = "Les médias du photographe"
  mediaSection.appendChild( mediaTitle )

  const medias = document.createElement( "div" )
  medias.className = "medias"
  mediaSection.appendChild( medias )

  // classement des médias par popularité
  photographMedias.sort( function ( a, b )
  {
    return a.likes - b.likes
  } )

  /**
   * Affichage des médias
   */
  function displayMedias ()
  {
    //Vidage des medias
    medias.textContent = ""
    // Remplissage des médias avec classement
    photographMedias.forEach( ( elementMedia ) =>
    {
      const mediaModel = mediaFactory( elementMedia )
      const elementMediaDOM = mediaModel.getMediaCardDOM()
      medias.appendChild( elementMediaDOM )
    } )
  }

  displayMedias()

  //=========== La selection du classement ==========

  // ----- construction du DOM -----

  const mediaSort = document.createElement( "div" )
  mediaSort.className = "media__sort"
  mediaSection.insertBefore( mediaSort, medias )

  const mediaSortLabel = document.createElement( "label" )
  mediaSortLabel.setAttribute( "for", "media__sortSelection" )
  mediaSortLabel.className = "media__sortLabel"
  mediaSortLabel.textContent = "Trier par"
  mediaSort.appendChild( mediaSortLabel )

  const mediaSortSelection = document.createElement( "select" )
  mediaSortSelection.id = "media__sortSelection"
  mediaSortSelection.className = "media__sortSelection"
  mediaSortSelection.setAttribute( "name", "classement des medias" )
  mediaSort.appendChild( mediaSortSelection )

  const mediaOptionPopularity = document.createElement( "option" )
  mediaOptionPopularity.className = "media__selectOption media__selectOption--popularity"
  mediaOptionPopularity.setAttribute( "value", "popularity" )
  mediaOptionPopularity.textContent = "Popularité"
  mediaOptionPopularity.setAttribute( "onClick", "displayMedia()" )
  mediaSortSelection.appendChild( mediaOptionPopularity )

  const mediaOptionDate = document.createElement( "option" )
  mediaOptionDate.className = "media__selectOption media__selectOption--date"
  mediaOptionDate.setAttribute( "value", "date" )
  mediaOptionDate.textContent = "Date"
  mediaOptionDate.setAttribute( "onClick", "displayMedia()" )
  mediaSortSelection.appendChild( mediaOptionDate )

  const mediaOptionTitle = document.createElement( "option" )
  mediaOptionTitle.className = "media__selectOption media__selectOption--title"
  mediaOptionTitle.setAttribute( "value", "title" )
  mediaOptionTitle.textContent = "Titre"
  mediaOptionTitle.setAttribute( "onClick", "displayMedia()" )
  mediaSortSelection.appendChild( mediaOptionTitle )

  // ----- fonctionnement de la selection -----

  // TODO faire fonctionner le select

  mediaOptionPopularity.addEventListener( "click", function ()
  {

    // classement des média par popularité
    photographMedia.sort( ( a, b ) => a.likes - b.likes )
    displayMedia()
  } )

  mediaOptionDate.addEventListener( "click", function ()
  {
    // classement des média par date
    photographMedias.sort( ( a, b ) => Date.parse( a.date ) - Date.parse( b.date ) )
    displayMedia()
  } )

  mediaOptionTitle.addEventListener( "click", function ()
  {
    // classer photographMedias par titre
    photographMedias.sort( function compoare ( a, b )
    {
      if ( a.title < b.title ) return -1
      if ( a.title > b.title ) return 1
      return 0
    } )
    displayMedia()
  } )

  // initialisation de la lightbox:
  Lightbox.init()

  // ========== La parties avec la modal ==========

  // ----- construction du DOM -----
  modalDOM( photograph )
}
