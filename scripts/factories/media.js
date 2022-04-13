const mediaInFactoriesTesthorsMediaFactory = "je suis dans media hors mediaFactory"

function mediaFactory ( data )
{
  let {
    id,
    date,
    description,
    image,
    video,
    likes,
    photographerId,
    price,
    title,
  } = data

  const picture = `assets/photographies/${ photographerId }/${ image }`

  const videoMedia = `assets/photographies/${ photographerId }/${ video }`

  const mediaInFactoriesTest = "je suis dans media"
  // console.log( "dans media :", lightboxInUtilsTest ) //*ok
  // console.log( "dans media :", photographerInPagesTest ) //* ok

  // TODO afficher le coeur différement pour pouvoir changer la couleur voir comme les croos de la lightbox en passant par figma
  const heartSvg = 'assets/icons/heart-solid.svg'

  function getpictureCardDOM ()
  {
    const article = document.createElement( 'a' )
    article.className = 'photographie'

    if ( data.hasOwnProperty( 'image' ) )
    {
      article.setAttribute( 'href', picture )
      const img = document.createElement( 'img' )
      img.className = 'media'
      img.setAttribute( 'src', picture )
      img.setAttribute( 'alt', title )
      img.setAttribute( 'aria-label', description )
      article.appendChild( img )
    } else if ( data.hasOwnProperty( 'video' ) )
    {
      article.setAttribute( 'href', videoMedia )
      const thumbnail = document.createElement( 'video' )
      thumbnail.className = 'media'
      thumbnail.setAttribute( 'src', videoMedia )
      thumbnail.setAttribute( 'type', 'video/mp4' )
      thumbnail.setAttribute( 'alt', title )

      thumbnail.setAttribute( 'aria-label', description )
      article.appendChild( thumbnail )
    }

    const pictureDetails = document.createElement( 'div' )
    pictureDetails.className = 'pictureDetails'
    article.appendChild( pictureDetails )

    const pictureName = document.createElement( 'h2' )
    pictureName.className = 'pictureName'
    pictureName.textContent = title
    pictureDetails.appendChild( pictureName )

    const contenairLikes = document.createElement( 'div' )
    contenairLikes.className = 'contenairLikes'
    pictureDetails.appendChild( contenairLikes )

    const pictureLikes = document.createElement( 'p' )
    pictureLikes.className = 'pictureLikes'
    pictureLikes.textContent = likes
    contenairLikes.appendChild( pictureLikes )

    //incrémentations au click des likes des medias
    contenairLikes.addEventListener( 'click', function ()
    {
      pictureLikes.textContent = ++likes
      const allLikes = document.querySelector( '.photographerLike' )
      // console.log("allLikes :", allLikes) //*ok
      // console.log("allLikes.innerHTML : ", allLikes.innerHTML) //*ok
      var allLikesValueNumber = parseInt( allLikes.innerHTML, 10 )
      ++allLikesValueNumber
      // console.log("allLikesValueNumber :", allLikesValueNumber) //*ok
      allLikes.innerHTML = ''
      allLikes.innerHTML = allLikesValueNumber
    } )

    const heartmedia = document.createElement( 'img' )
    heartmedia.className = 'heart'
    heartmedia.setAttribute( 'src', heartSvg )
    contenairLikes.appendChild( heartmedia )

    return article
  }

  // TODO attention plusieurs lightBox sont générées.
  // TODO bug dernier photo
  // TODO bugs avec les vidéos au milieu du tableau gallery
  // TODO faire fonctionner sur les vidéos

  // /**
  //  * @property {HTMLElement} element
  //  * @property {string[]} gallery Chemins des images de la lightbox
  //  * @property {string} url Image actuellement affichée
  //  */
  // class Lightbox
  // {
  //   static init ()
  //   {
  //     const links = Array.from( document.querySelectorAll( '.photographie' ) )
  //     // console.log('links', links) //* ok dans media.js
  //     const gallery = links.map( ( link ) => link.getAttribute( 'href' ) )
  //     // console.log('gallery :', gallery) //* ok dans media.js
  //     links.forEach( ( links ) =>
  //       links.addEventListener( 'click', ( e ) =>
  //       {
  //         e.preventDefault()
  //         new Lightbox( e.currentTarget.getAttribute( 'href' ), gallery )
  //       } )
  //     )
  //   }

  //   /**
  //    * @param {string} url URL de l'image
  //    * @param {string[]} gallery Chemins des images de la lightbox
  //    */
  //   constructor ( url, gallery )
  //   {
  //     const body = document.querySelector( 'body' )
  //     // if ( document.getElementsByClassName( "lightbox" ).length == 0 )
  //     // { this.element = this.buildDom( url ) } //! 1 lightbox mais pas tous les média dedans selon position du média cliqué
  //     this.element = this.buildDom( url )
  //     this.gallery = gallery
  //     this.loadImage( url )
  //     this.onKeyUp = this.onKeyUp.bind( this )
  //     body.appendChild( this.element )
  //     document.addEventListener( 'keyup', this.onKeyUp )
  //   }

  //   /**
  //    * @param {string} url URL de l'image
  //    *
  //    */
  //   loadImage ( url )
  //   {
  //     this.url = null
  //     const image = new Image() //? demander pour comprendre
  //     const container = this.element.querySelector( '.lightbox__container' )
  //     const loader = document.createElement( 'div' )
  //     loader.className = 'lightbox__loader'
  //     container.innerHTML = ''
  //     container.appendChild( loader )
  //     image.onload = () =>
  //     {
  //       container.removeChild( loader )
  //       container.appendChild( image )
  //       this.url = url
  //     }

  //     image.src = url
  //   }

  //   /**
  //    * @param {keyboardEvent} e
  //    */
  //   onKeyUp ( e )
  //   {
  //     if ( e.key === 'Escape' )
  //     {
  //       this.close( e )
  //     } else if ( e.key === 'ArrowLeft' )
  //     {
  //       this.prev( e )
  //     } else if ( e.key === 'ArrowRight' )
  //     {
  //       this.next( e )
  //     }
  //   }

  //   // TODO ok mais n'en ferme qu'une à la fois avec la souris et il y a plusieurs lightbox (cf condition au init)
  //   /**
  //    * Ferme la lightbox
  //    * @param {MouseEvent/KeyboardEvent} e
  //    */
  //   close ( e )
  //   {
  //     event.preventDefault()
  //     this.element.classList.add( 'fadeOut' )
  //     window.setTimeout( () =>
  //     {
  //       this.element.parentElement.removeChild( this.element )
  //     }, 500 ) //* ok une à la fois
  //     document.removeEventListener( 'keyup', this.onKeyUp ) //* ok
  //   }

  //   /**
  //    * Passe au média suivante
  //    * @param {MouseEvent/KeyboardEvent} e
  //    */
  //   next ( e )
  //   {
  //     e.preventDefault()
  //     let i = this.gallery.findIndex( ( media ) => media === this.url )
  //     if ( i === this.gallery.length - 1 )
  //     {
  //       i = -1
  //     }
  //     this.loadImage( this.gallery[ i + 1 ] )
  //   }

  //   /**
  //    * Passe au média précedent
  //    * @param {MouseEvent/KeyboardEvent} e
  //    */
  //   prev ( e )
  //   {
  //     e.preventDefault()
  //     let i = this.gallery.findIndex( ( media ) => media === this.url )
  //     if ( i === 0 )
  //     {
  //       i = this.gallery.length
  //     }
  //     this.loadImage( this.gallery[ i - 1 ] )
  //   }

  //   /**
  //    * @param {string} url URL de l'image
  //    * @return {HTMLelement}
  //    */
  //   buildDom ( url )
  //   {
  //     const dom = document.createElement( 'div' )
  //     dom.className = 'lightbox'
  //     dom.innerHTML = `<div class="lightbox__wrapper">
  //       <button class="lightbox__close">
  //         Fermer
  //         <img
  //           class="lightbox__cross"
  //           src="assets/images/cross.svg"
  //           alt="chevron vers la droite"
  //         />
  //       </button>
  //       <button class="lightbox__prev">
  //         précédent
  //         <img
  //           class="lightbox__arrow lightbox__arrow--prev"
  //           src="assets/images/arrow.svg"
  //           alt="chevron vers la gauche"
  //         />
  //       </button>
  //       <div class="lightbox__container">
  //        // TODO prévoir pour la vidéo
  //         <img
  //           src="${ url }"
  //           // TODO mettre un alt
  //           alt=""
  //         />
  //          // TODO mettre le titre
  //         <p class="lightbox__title">Arc-en-ciel</p>
  //       </div>
  //       <button class="lightbox__next">
  //         suivant
  //         <img
  //           class="lightbox__arrow lightbox__arrow--next"
  //           src="assets/images/arrow.svg"
  //           alt="chevron vers la droite"
  //         />
  //       </button>`
  //     dom
  //       .querySelector( '.lightbox__close' )
  //       .addEventListener( 'click', this.close.bind( this ) )
  //     dom
  //       .querySelector( '.lightbox__next' )
  //       .addEventListener( 'click', this.next.bind( this ) )
  //     dom
  //       .querySelector( '.lightbox__prev' )
  //       .addEventListener( 'click', this.prev.bind( this ) )
  //     return dom
  //   }
  // }

  // pour éviter plusieur lightbox :
  // if ( document.getElementsByClassName( "lightbox" ).length == 0 )
  // {
  //   Lightbox.init()
  // } //! ne fonctionne pas

  // Lightbox.init() //*ok si dans média.js
  // console.log( "lightbox ? :", document.getElementsByClassName( "lightbox" ) )
  // console.log( "lightbox length :", document.getElementsByClassName( "lightbox" ).length )

  return {
    id,
    date,
    description,
    image,
    likes,
    photographerId,
    price,
    title,
    getpictureCardDOM,
    // mediaInFactoriesTest, //! ne sert à rien
  }
}
