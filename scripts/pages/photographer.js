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
  const photographMedia = media.filter(
    ( photographMedia ) => photographMedia.photographerId == idUrl
  )
  // console.log( "photographMedia :", photographMedia ) //*ok

  /**
   * Les likes par média du pohotographe
   * @const {number[]}
   */
  const mediasLikes = photographMedia.map( ( oneMediaLikes ) => oneMediaLikes.likes )


  /**
   * Initiation du nombre de like
   * @var {number}
   */
  let initialLike = 0
  /**
   * Nombre total de like du photographe
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
  // console.log("main : ", main) //*ok

  const mediaSection = document.createElement( "section" )
  mediaSection.className = "media__section"
  main.appendChild( mediaSection )

  // TODO revoir le nom (medias ?)
  const pictures = document.createElement( "div" )
  pictures.className = "pictures"
  mediaSection.appendChild( pictures )

  // function pour afficher les media
  function displayMedia ()
  {
    //vidage de pictures avant son remplissage pour permettre de le classer en fonction de la selection
    pictures.textContent = ""
    photographMedia.forEach( ( elementMedia ) =>
    {
      const mediaModel = mediaFactory( elementMedia )
      const elementMediaDOM = mediaModel.getpictureCardDOM()
      pictures.appendChild( elementMediaDOM )
      // console.log(elementMedia.title) //*ok
    } )
  }

  displayMedia()

  //=========== La selection du classement ==========
  // ----- construction du DOM -----
  const mediaTitle = document.createElement( "h2" )
  mediaTitle.className = "media__title"
  mediaTitle.textContent = "Les médias du photographe"
  mediaSection.appendChild( mediaTitle )

  const mediaSort = document.createElement( "div" )
  mediaSort.className = "media__sort"
  mediaSection.insertBefore( mediaSort, pictures )

  const mediaSortLabel = document.createElement( "p" )
  mediaSortLabel.className = "media__sortLabel"
  mediaSortLabel.textContent = "Trier par"
  mediaSort.appendChild( mediaSortLabel )

  const mediaSortSelection = document.createElement( "div" )
  mediaSortSelection.className = "media__sortSelection hidden"
  mediaSort.appendChild( mediaSortSelection )

  const mediaSelectButton = document.createElement( "button" )
  mediaSelectButton.className = "media__selectButton media__selectClose"
  mediaSortSelection.appendChild( mediaSelectButton )

  const mediaSelectOptions = document.createElement( "div" )
  mediaSelectOptions.className = "media__selectOptions"
  mediaSortSelection.appendChild( mediaSelectOptions )

  const mediaSelectArrow = document.createElement( "div" )
  mediaSelectArrow.className = "media__selectArrow media__selectArrow--down"
  mediaSelectArrow.textContent = ">"
  mediaSortSelection.appendChild( mediaSelectArrow )

  const mediaOptionPopularity = document.createElement( "p" )
  mediaOptionPopularity.className = "media__selectOption media__selectOption--popularity"
  mediaOptionPopularity.textContent = "Popularité"
  mediaOptionPopularity.setAttribute( "onClick", "displayMedia()" )
  mediaSelectOptions.appendChild( mediaOptionPopularity )

  const mediaOptionDate = document.createElement( "p" )
  mediaOptionDate.className = "media__selectOption media__selectOption--date"
  mediaOptionDate.textContent = "Date"
  mediaOptionDate.setAttribute( "onClick", "displayMedia()" )
  mediaSelectOptions.appendChild( mediaOptionDate )

  const mediaOptionTitle = document.createElement( "p" )
  mediaOptionTitle.className = "media__selectOption media__selectOption--title"
  mediaOptionTitle.textContent = "Titre"
  mediaOptionTitle.setAttribute( "onClick", "displayMedia()" )
  mediaSelectOptions.appendChild( mediaOptionTitle )

  // ----- fonctionnement de la selection -----

  mediaSelectButton.addEventListener( "click", function ()
  {
    mediaSortSelection.classList.remove( "hidden" )
    mediaSelectButton.classList.remove( "media__selectClose" )
    mediaOptionPopularity.classList.add( "media__selectOpen" )
    mediaOptionDate.classList.add( "media__selectOpen" )
    mediaOptionTitle.classList.add( "media__selectOpen" )
    mediaSelectArrow.classList.remove( "media__selectArrow--down" )
    mediaSelectArrow.classList.add( "media__selectArrow--up" )
  } )


  mediaOptionPopularity.addEventListener( "click", function ()
  {
    mediaSortSelection.classList.add( "hidden" )
    mediaOptionPopularity.classList.remove( "media__selectOpen" )
    mediaOptionDate.classList.remove( "media__selectOpen" )
    mediaOptionTitle.classList.remove( "media__selectOpen" )
    mediaSelectOptions.classList.remove( "title" )
    mediaSelectOptions.classList.remove( "date" )
    mediaSelectButton.classList.add( "media__selectClose" )
    // TODO meilleur méthode : changer l'orde des éléments selectOption
    mediaSelectArrow.classList.remove( "media__selectArrow--up" )
    mediaSelectArrow.classList.add( "media__selectArrow--down" )

    // classement des média par popularité
    photographMedia.sort( ( a, b ) => a.likes - b.likes )
    // console.log("photographMedia by popularity :", photographMedia) //* ok

    displayMedia()
  } )

  mediaOptionDate.addEventListener( "click", function ()
  {
    mediaSortSelection.classList.add( "hidden" )
    mediaOptionPopularity.classList.remove( "media__selectOpen" )
    mediaOptionDate.classList.remove( "media__selectOpen" )
    mediaOptionTitle.classList.remove( "media__selectOpen" )
    mediaSelectOptions.classList.remove( "title" )
    mediaSelectOptions.classList.add( "date" )
    mediaSelectButton.classList.add( "media__selectClose" )
    mediaSelectArrow.classList.remove( "media__selectArrow--up" )
    mediaSelectArrow.classList.add( "media__selectArrow--down" )
    mediaOptionDate.insertBefore
    photographMedia.sort( ( a, b ) => Date.parse( a.date ) - Date.parse( b.date ) )
    // console.log("photographMedia by date :", photographMedia) //* ok

    displayMedia()
  } )

  mediaOptionTitle.addEventListener( "click", function ()
  {
    mediaSortSelection.classList.add( "hidden" )
    mediaOptionPopularity.classList.remove( "media__selectOpen" )
    mediaOptionDate.classList.remove( "media__selectOpen" )
    mediaOptionTitle.classList.remove( "media__selectOpen" )
    mediaSelectOptions.classList.remove( "date" )
    mediaSelectOptions.classList.add( "title" )
    mediaSelectButton.classList.add( "media__selectClose" )
    // TODO changer l'odre des select meilleur méthode que glisser la selection
    selectArrow.classList.remove( "media__selectArrow--up" ) //~
    selectArrow.classList.add( "media__selectArrow--down" ) //~
    // classer photographMedia par titre (alphabétique)
    photographMedia.sort( function compoare ( a, b )
    {
      if ( a.title < b.title ) return -1
      if ( a.title > b.title ) return 1
      return 0
    } )
    // console.log("photographMedia by title :", photographMedia) //*ok
    displayMedia()
  } )

  // classement des médias par popularité
  photographMedia.sort( function ( a, b )
  {
    return a.likes - b.likes
  } )

  // initialisation de la lightbox:
  Lightbox.init()
}
