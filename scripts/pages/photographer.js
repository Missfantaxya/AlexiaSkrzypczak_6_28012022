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
  // TODO revoir l'accessibilité (aria) quand tri refait et stylisé
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
  // TODO revoir la sémantique du tri car option de select instilisable (utiliser button voir maquette)

  const mediaSort = document.createElement( "div" )
  mediaSort.className = "media__sort"
  mediaSection.insertBefore( mediaSort, medias )

  const mediaSortLabel = document.createElement( "label" )
  mediaSortLabel.setAttribute( "for", "media__sortSelection" )
  mediaSortLabel.className = "media__sortLabel"
  mediaSortLabel.textContent = "Trier par"
  mediaSort.appendChild( mediaSortLabel )

  const mediaSortContainer = document.createElement( "div" )
  mediaSortContainer.className = "media__sortContainer"
  mediaSort.appendChild( mediaSortContainer )

  const mediaSortSelection = document.createElement( "select" )
  mediaSortSelection.id = "media__sortSelection"
  mediaSortSelection.className = "media__sortSelection"
  mediaSortSelection.setAttribute( "name", "classement des medias" )
  mediaSortContainer.appendChild( mediaSortSelection )

  // const dropdownArrow = document.createElement( "div" )
  // dropdownArrow.className = "dropdownArrow"
  // mediaSortContainer.appendChild( dropdownArrow )

  // const arrowSvg = document.createElement( "img" )
  // arrowSvg.className = "dropdownArrow__img"
  // arrowSvg.setAttribute( "src", "assets/icons/dropdown.svg" )
  // arrowSvg.setAttribute( "alt", "chevron" )
  // dropdownArrow.appendChild( arrowSvg )

  const mediaOptionPopularity = document.createElement( "option" )
  mediaOptionPopularity.className = "media__selectOption media__selectOption--popularity"
  mediaOptionPopularity.setAttribute( "value", "popularity" )
  mediaOptionPopularity.textContent = "Popularité"
  mediaSortSelection.appendChild( mediaOptionPopularity )

  const mediaOptionDate = document.createElement( "option" )
  mediaOptionDate.className = "media__selectOption media__selectOption--date"
  mediaOptionDate.setAttribute( "value", "date" )
  mediaOptionDate.textContent = "Date"
  mediaSortSelection.appendChild( mediaOptionDate )

  const mediaOptionTitle = document.createElement( "option" )
  mediaOptionTitle.className = "media__selectOption media__selectOption--title"
  mediaOptionTitle.setAttribute( "value", "title" )
  mediaOptionTitle.textContent = "Titre"
  mediaSortSelection.appendChild( mediaOptionTitle )

  // ----- style -----

  var x, i, j, l, ll, selElmnt, a, b, c
  x = document.getElementsByClassName( "media__sortContainer" )
  l = x.length
  console.log( "l : ", l ) //* ok =1
  for ( i = 0; i < l; i++ )
  {
    selElmnt = x[ i ].getElementsByTagName( "select" )[ 0 ]
    console.log( "selElmnt: ", selElmnt ) //*ok =le select élément html 
    ll = selElmnt.length
    /* pour chaque élément, créez un nouveau DIV qui agira comme l'élément sélectionné : */
    a = document.createElement( "DIV" )
    a.setAttribute( "class", "select-selected" )
    a.innerHTML = selElmnt.options[ selElmnt.selectedIndex ].innerHTML
    x[ i ].appendChild( a )
    /* pour chaque élément, créez un nouveau DIV qui contiendra la liste d'options : */
    b = document.createElement( "DIV" )
    b.setAttribute( "class", "select-items select-hide" )
    for ( j = 1; j < ll; j++ )
    {
      /* pour chaque option de l'élément de sélection d'origine, créez un nouveau DIV qui agira comme un élément d'option : */
      c = document.createElement( "DIV" )
      c.innerHTML = selElmnt.options[ j ].innerHTML
      c.addEventListener( "click", function ( e )
      {
        /* lorsqu'un élément est cliqué, mettre à jour la boîte de sélection d'origine, et l'élément sélectionné : */
        var y, i, k, s, h, sl, yl
        s = this.parentNode.parentNode.getElementsByTagName( "select" )[ 0 ]
        sl = s.length
        h = this.parentNode.previousSibling
        for ( i = 0; i < sl; i++ )
        {
          if ( s.options[ i ].innerHTML == this.innerHTML )
          {
            s.selectedIndex = i
            h.innerHTML = this.innerHTML
            y = this.parentNode.getElementsByClassName( "same-as-selected" )
            yl = y.length
            for ( k = 0; k < yl; k++ )
            {
              y[ k ].removeAttribute( "class" )
            }
            this.setAttribute( "class", "same-as-selected" )
            break
          }
        }
        h.click()
      } )
      b.appendChild( c )
    }
    x[ i ].appendChild( b )
    a.addEventListener( "click", function ( e )
    {
      /* lorsque la case de sélection est cliquée, fermez toutes les autres cases de sélection, et ouvrir/fermer la boîte de sélection actuelle : */
      e.stopPropagation()
      closeAllSelect( this )
      this.nextSibling.classList.toggle( "select-hide" )
      this.classList.toggle( "select-arrow-active" )
    } )
  }

  function closeAllSelect ( elmnt )
  {
    /* une fonction qui fermera toutes les cases de sélection du document, sauf la boîte de sélection actuelle : */
    var x, y, i, xl, yl, arrNo = []
    x = document.getElementsByClassName( "select-items" )
    y = document.getElementsByClassName( "select-selected" )
    xl = x.length
    yl = y.length
    for ( i = 0; i < yl; i++ )
    {
      if ( elmnt == y[ i ] )
      {
        arrNo.push( i )
      } else
      {
        y[ i ].classList.remove( "select-arrow-active" )
      }
    }
    for ( i = 0; i < xl; i++ )
    {
      if ( arrNo.indexOf( i ) )
      {
        x[ i ].classList.add( "select-hide" )
      }
    }
  }

  /* si l'utilisateur clique n'importe où en dehors de la zone de sélection, puis fermez toutes les cases de sélection : */
  document.addEventListener( "click", closeAllSelect )

  // ----- fonctionnement du tri des médias -----

  mediaSortSelection.addEventListener( "change", function ()
  {
    if ( mediaOptionPopularity.selected )
    {
      popularitySort()
      //affichage des média après le tri
      displayMedias()
      //réinitialisation de la lightbox après le tri
      Lightbox.init()
    }
    else if ( mediaOptionDate.selected )
    {
      photographMedias.sort( ( a, b ) => Date.parse( a.date ) - Date.parse( b.date ) )
      //affichage des média après le tri
      displayMedias()
      //réinitialisation de la lightbox après le tri
      Lightbox.init()
    } else if ( mediaOptionTitle.selected )
    {
      photographMedias.sort( function compare ( a, b )
      {
        if ( a.title < b.title ) return -1
        if ( a.title > b.title ) return 1
        return 0
      } )
      //affichage des média après le tri
      displayMedias()
      //réinitialisation de la lightbox après le tri
      Lightbox.init()
    }
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
