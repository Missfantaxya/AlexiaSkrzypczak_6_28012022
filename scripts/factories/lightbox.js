const lightboxInUtilsTest = "je suis dans lightbox"
// console.log( "dans lightbox :", mediaInFactoriesTest ) //! error not defined
// console.log( "dans lightbox :", photographerInPagesTest ) //*ok

// TODO faire fonctionner sur les vidéos (pattern Factory)
/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 */
class Lightbox
{
  static init ()
  {
    const links = Array.from( document.querySelectorAll( '.photographie' ) )
    // console.log('links', links) //* ok dans media.js
    const gallery = links.map( ( link ) => link.getAttribute( 'href' ) )
    // console.log('gallery :', gallery) //* ok dans media.js
    links.forEach( ( links ) =>
      links.addEventListener( 'click', ( e ) =>
      {
        e.preventDefault()
        new Lightbox( e.currentTarget.getAttribute( 'href' ), gallery )
      } )
    )
  }

  /**
   * @param {string} url URL de l'image
   * @param {string[]} gallery Chemins des images de la lightbox
   */
  constructor ( url, gallery )
  {
    const body = document.querySelector( 'body' )
    this.element = this.buildDom( url )
    this.gallery = gallery
    this.loadImage( url )
    this.onKeyUp = this.onKeyUp.bind( this )
    body.appendChild( this.element )
    document.addEventListener( 'keyup', this.onKeyUp )
  }

  /**
   * @param {string} url URL de l'image
   *
   */
  loadImage ( url )
  {
    this.url = null
    const image = new Image() //? demander pour comprendre
    const container = this.element.querySelector( '.lightbox__container' )
    const loader = document.createElement( 'div' )
    loader.className = 'lightbox__loader'
    container.innerHTML = ''
    container.appendChild( loader )
    image.onload = () =>
    {
      container.removeChild( loader )
      container.appendChild( image )
      this.url = url
    }

    image.src = url
  }

  /**
   * @param {keyboardEvent} e
   */
  onKeyUp ( e )
  {
    if ( e.key === 'Escape' )
    {
      this.close( e )
    } else if ( e.key === 'ArrowLeft' )
    {
      this.prev( e )
    } else if ( e.key === 'ArrowRight' )
    {
      this.next( e )
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  close ( e )
  {
    event.preventDefault()
    this.element.classList.add( 'fadeOut' )
    window.setTimeout( () =>
    {
      this.element.parentElement.removeChild( this.element )
    }, 500 ) //* ok une à la fois
    document.removeEventListener( 'keyup', this.onKeyUp ) //* ok
  }

  /**
   * Passe au média suivante
   * @param {MouseEvent/KeyboardEvent} e
   */
  next ( e )
  {
    e.preventDefault()
    let i = this.gallery.findIndex( ( media ) => media === this.url )
    if ( i === this.gallery.length - 1 )
    {
      i = -1
    }
    this.loadImage( this.gallery[ i + 1 ] )
  }

  /**
   * Passe au média précedent
   * @param {MouseEvent/KeyboardEvent} e
   */
  prev ( e )
  {
    e.preventDefault()
    let i = this.gallery.findIndex( ( media ) => media === this.url )
    if ( i === 0 )
    {
      i = this.gallery.length
    }
    this.loadImage( this.gallery[ i - 1 ] )
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLelement}
   */
  buildDom ( url )
  {
    console.log( url )
    const dom = document.createElement( 'div' )
    dom.className = 'lightbox'
    dom.innerHTML = `<div class="lightbox__wrapper">
        <button class="lightbox__close">
          Fermer
          <img
            class="lightbox__cross"
            src="assets/images/cross.svg"
            alt="chevron vers la droite"
          />
        </button>
        <button class="lightbox__prev">
          précédent
          <img
            class="lightbox__arrow lightbox__arrow--prev"
            src="assets/images/arrow.svg"
            alt="chevron vers la gauche"
          />
        </button>
        <div class="lightbox__container">
         // TODO prévoir pour la vidéo
          <img
            src="${ url }"
            // TODO mettre un alt
            alt=""
          />
           // TODO mettre le titre
          <p class="lightbox__title">Arc-en-ciel</p>
        </div>
        <button class="lightbox__next">
          suivant
          <img
            class="lightbox__arrow lightbox__arrow--next"
            src="assets/images/arrow.svg"
            alt="chevron vers la droite"
          />
        </button>`
    dom
      .querySelector( '.lightbox__close' )
      .addEventListener( 'click', this.close.bind( this ) )
    dom
      .querySelector( '.lightbox__next' )
      .addEventListener( 'click', this.next.bind( this ) )
    dom
      .querySelector( '.lightbox__prev' )
      .addEventListener( 'click', this.prev.bind( this ) )
    return dom
  }
}