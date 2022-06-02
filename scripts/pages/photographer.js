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
  const selectForm = document.createElement( "form" )
  selectForm.className = "selectForm"
  mediaSection.insertBefore( selectForm, medias )
  const selectLabel = document.createElement( "label" )
  selectLabel.className = "selectLabel"
  selectLabel.id = "selectLabel"
  selectLabel.textContent = "Trier par"
  selectForm.appendChild( selectLabel )
  const selection = document.createElement( "div" )
  selection.className = "selection hidden"
  selectForm.appendChild( selection )

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

  const selectButton = document.createElement( "button" )
  selectButton.className = "selectButton"
  selectButton.setAttribute( "type", "button" )
  selectButton.setAttribute( "role", "button" )
  selectButton.ariaHasPopup = "listbox"
  // TODO ajouter un aria-controls = "id de ul"  ???
  selectButton.setAttribute( "aria-expanded", "" )
  // selectButton.setAttribute( "tabindex", "0" )  //?
  selection.appendChild( selectButton )

  const selectOptions = document.createElement( "ul" )
  selectOptions.className = "selectOptions"
  selectOptions.setAttribute( "role", "listbox" )
  selectOptions.setAttribute( "aria-activedescendant", "" )
  selectOptions.setAttribute( "aria-selected", "" )
  selectOptions.setAttribute( "aria-labelledby", "selectLabel" )
  // selectOptions.setAttribute( "tabindex", "-1" )  //?
  selectButton.appendChild( selectOptions )

  const selectArrow = document.createElement( "div" )
  selectArrow.className = "selectArrow"
  selectButton.appendChild( selectArrow )

  /**
   * construction du DOM de la selection pour le classement des médias
   * @return {HTMLelement}
   */
  function selectionDOM ()
  {
    selectOptions.innerHTML = ""
    options.map( selectOption =>
    {
      const optionSelect = document.createElement( "li" )
      optionSelect.className = `selectOption ${ selectOption.classe }`
      optionSelect.setAttribute( "role", "option" )
      optionSelect.textContent = selectOption.content
      selectOptions.appendChild( optionSelect )
      return optionSelect
    } )
  }

  selectionDOM()

  // ----- Fonctionnement de la selection -----

  //ouverture de la selection
  selectButton.addEventListener( "click", function ()
  {
    selection.classList.remove( "hidden" )
    selectButton.classList.add( "open" )
    selectArrow.classList.add( "up" )
    sortMedia()
  } )

  // TODO ne ferme plus
  function closeSelection () 
  {
    console.log( "selection : ", selection ) //*
    console.log( "selectButton : ", selectButton ) //*
    console.log( "selectArrow : ", selectArrow ) //*
    console.log( "contien hidden ? ", selection.classList.contains( "hidden" ) )//*
    console.log( "contien open ? ", selectButton.classList.contains( "open" ) )//*
    console.log( "contien up ? ", selectArrow.classList.contains( "up" ) )//*
    selection.classList.add( "hidden" ) //! ne fonctionne plus
    selectButton.classList.remove( "open" ) //! ne fonctionne plus
    selectArrow.classList.remove( "up" ) //! ne fonctionne plus
  }

  /**
   * Permet de faire le tri des médias selon la selection choisi
   * @function
   */
  function sortMedia ()
  {

    // TODO rendre les options selectionnablent au clavier
    const selectOption = document.querySelectorAll( ".selectOption" )
    selectOption.forEach( item =>
    {
      item.addEventListener( "click", function ()
      {
        closeSelection()
        // récupère l'indice de l'élément cliqué 
        const indice = options.findIndex( oneOption => oneOption.content === item.textContent ) //*ok
        // suppression de l'élément cliqué du tableau
        const optionMove = options.splice( indice, 1 )
        // ajout de l'élément supprimé au début du tableau (à l'index 0)
        const optionMoved = options.splice( 0, 0, optionMove[ 0 ] )
        // classement des médias en fonctione de l'option cliqué
        if ( item.textContent === "Date" ) //* ok
        {
          // classer photographMedias par date
          photographMedias.sort( ( a, b ) => Date.parse( a.date ) - Date.parse( b.date ) )
          displayMedias()
        } else if ( item.textContent === "Titre" )  //* ok
        {
          // classer photographMedias par titre (alphabétique)
          photographMedias.sort( function compare ( a, b )
          {
            if ( a.title < b.title ) return -1
            if ( a.title > b.title ) return 1
            return 0
          } )
          displayMedias()
        } else if ( item.textContent === "Popularité" )  //* ok
        {
          popularitySort()
          displayMedias()
        }
        selectionDOM()
      } )
    } )
  }


  selectArrow.addEventListener( "click", function ()
  {
    // console.log( "click selectArrow" ) //*
    closeSelection()
  } )

  // initialisation de la lightbox:
  Lightbox.init()

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
