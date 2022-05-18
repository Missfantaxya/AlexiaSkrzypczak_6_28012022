//TODO pb avec gitHub Page

//Mettre le code JavaScript lié à la page photographer.html

// TODO revoir les descriptions des médias (j'ai inversé certaines) dans la data

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
  // wrapper.appendChild( photographHeader )
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
  // TODO aria-description FAUX
  // photographLike.setAttribute( "aria-description", "nombre de likes du photographe" )
  photographLike.textContent = photographerAllLikes
  photographWrapperLikes.appendChild( photographLike )

  const photographHeart = document.createElement( "img" )
  photographHeart.className = "photograph__heart"
  photographHeart.setAttribute( "src", heartSvg )
  photographHeart.setAttribute( "alt", "likes" )
  photographWrapperLikes.appendChild( photographHeart )

  const photographPrice = document.createElement( "p" )
  photographPrice.className = "photograph__price"
  // TODO aria-description FAUX
  // photographPrice.setAttribute( "aria-description", "tarif du photographe" )
  photographPrice.textContent = photograph[ 0 ].price + "€ / jour"
  photographPriceAndLike.appendChild( photographPrice )

  // ========== La parties avec les médias ==========
  // TODO https://www.w3schools.com/howto/howto_custom_select.asp style du select

  // ----- construction du DOM -----

  const main = document.querySelector( "#main" )

  const mediaSection = document.createElement( "section" )
  mediaSection.className = "medias__section"
  main.appendChild( mediaSection )

  const mediaTitle = document.createElement( "h2" )
  mediaTitle.className = "medias__title"
  mediaTitle.textContent = "Les médias du photographe"
  mediaSection.appendChild( mediaTitle )

  const medias = document.createElement( "div" )
  medias.className = "medias"
  mediaSection.appendChild( medias )

  /**
   * Classe les media par popularité
   */
  function popularitySort ()
  {
    photographMedias.sort( function ( a, b )
    {
      return a.likes - b.likes
    } )
  }

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

  popularitySort()
  displayMedias()

  //=========== La selection du classement ==========

  // ----- construction du DOM -----
  // TODO faire les ARIA cf maquette
  const selectForm = document.createElement( "div" )
  selectForm.className = "selectForm"
  mediaSection.insertBefore( selectForm, medias )
  const selectLabel = document.createElement( "p" )
  selectLabel.className = "selectLabel"
  selectLabel.textContent = "Trier par"
  selectForm.appendChild( selectLabel )
  const selection = document.createElement( "div" )
  selection.className = "selection hidden"
  selectForm.appendChild( selection )
  const selectButton = document.createElement( "button" )
  selectButton.className = "selectButton close"
  selection.appendChild( selectButton )


  const selectOptions = document.createElement( "div" )
  selectOptions.className = "selectOptions"
  selection.appendChild( selectOptions )

  options = [
    {
      content: "Popularité",
      classe: "popularityOption"
    },
    {
      content: "Date",
      classe: "dateOption"
    }, {
      content: "Titre",
      classe: "titleOption"
    }
  ]


  const selectA = options.map( selectOption =>
  {
    const optionSelect = document.createElement( "p" )
    optionSelect.className = `selectOption ${ selectOption.classe }`
    optionSelect.textContent = selectOption.content
    selectOptions.appendChild( optionSelect )
    console.log( "option dans le map : ", optionSelect ) // *ok
    return optionSelect
  } )
  console.log( "selectA : ", selectA ) //*ok un tableau des 3 éléments html

  const selectArrow = document.createElement( "div" )
  selectArrow.className = "selectArrow"
  selectArrow.textContent = ">"
  selection.appendChild( selectArrow )

  // TODO ajouter avec fontAwesome
  // const chevron = document.createElement("i")
  // chevron.className = "fa-solid fa-chevron-down"
  // chevron.appendChild(selectArrow)

  const option = document.getElementsByClassName( "selectOption" )
  console.log( "option : ", option )

  const popularityOption = document.querySelector( ".popularityOption" )
  console.log( "popularityOption : ", popularityOption )// *ok

  console.log( "selectOptions : ", selectOptions ) //* ok


  popularityOption.addEventListener( "click", function ()
  {
    selection.classList.add( "hidden" )
    selectButton.classList.add( "close" )
    // TODO meilleur méthode : changer l'orde des éléments selectOption
    //TODO récupere l'index de l'option (.findIndex) et suprimer l'option choisi (.splice ?) du tableau puis la remttre en premier (.unshift)
    // options = [
    //   {
    //     content: "Popularité",
    //     classe: "popularityOption"
    //   },
    //   {
    //     content: "Date",
    //     classe: "dateOption"
    //   }, {
    //     content: "Titre",
    //     classe: "titleOption"
    //   }
    // ]
    selectArrow.classList.remove( "up" )


    popularitySort()
  } )

  const dateOption = document.querySelector( ".dateOption" )
  console.log( "dateOption : ", dateOption ) //*ok

  dateOption.addEventListener( "click", function ()
  {
    selection.classList.add( "hidden" )
    selectButton.classList.add( "close" )
    selectArrow.classList.remove( "up" )

    // classer photographMedias par date
    photographMedias.sort( ( a, b ) => Date.parse( a.date ) - Date.parse( b.date ) )
    console.log( "photographMedias by date :", photographMedias )

    displayMedias()
  } )
  const titleOption = document.querySelector( ".titleOption" )
  console.log( "titleOption : ", titleOption ) //*ok

  titleOption.addEventListener( "click", function ()
  {
    selection.classList.add( "hidden" )
    selectButton.classList.add( "close" )
    selectArrow.classList.remove( "up" )

    // classer photographMedias par titre (alphabétique)
    photographMedias.sort( function compare ( a, b )
    {
      if ( a.title < b.title ) return -1
      if ( a.title > b.title ) return 1
      return 0
    } )
    console.log( "photographMedias by title :", photographMedias )
    displayMedias()
  } )

  //ouverture de la selection
  selectButton.addEventListener( "click", function ()
  {
    selection.classList.remove( "hidden" )
    selectButton.classList.remove( "close" )
    selectArrow.classList.add( "up" )
  } )

  // ========== La parties avec la modal ==========

  // ----- construction du DOM -----
  modalDOM( photograph )

  // ----- inscrption du contenu des input en cosole -----
  const modal = document.querySelector( ".modal" )
  const register = modal.querySelector( ".contact__button" )
  register.addEventListener( "click", function ( event )
  {
    // evite la soumission par default du formulaire
    event.preventDefault()


    logInput()

    // function temporaire en attendant une soumission fonctionnelle du formulaire
    eraseInput()
  } )

}
