/**
 * @property {HTMLElement} element
 * @property {string[]} gallery - Chemins des medias de la lightbox
 * @property {string} url - média actuellement affichée
 */
// TODO rendre possible l'ouverture au clavier
class Lightbox
{
  static init ()
  {
    const links = Array.from( document.querySelectorAll( '.media__link' ) )
    const gallery = links.map( ( link ) => link.getAttribute( 'href' ) )
    const lightboxTitle = links.map( ( link ) => link.getAttribute( 'aria-label' ) )
    links.forEach( ( links ) =>

      links.addEventListener( 'click', ( e ) =>
      {
        e.preventDefault()
        new Lightbox( e.currentTarget.getAttribute( 'href' ), e.currentTarget.getAttribute( 'aria-label' ), gallery, lightboxTitle )
      } )
    )
  }

  /**
   * @param {string} url URL du média
   * @param {string} title Titre de l'média
   * @param {string[]} gallery Chemins des médias de la lightbox
   * @param {string[]} lightboxTitle Titres des medias de la lightbox
   */
  constructor ( url, title, gallery, lightboxTitle )
  {
    const body = document.querySelector( 'body' )
    this.element = this.buildDom( url )
    this.gallery = gallery
    this.lightboxTitle = lightboxTitle
    this.loadMedia( url, title )
    this.onKeyUp = this.onKeyUp.bind( this )
    body.appendChild( this.element )
    document.addEventListener( 'keyup', this.onKeyUp )
  }

  /**
   * @param {string} url URL du média
   * @param {string} title Titre du média
   */
  loadMedia ( url, title )
  {
    this.url = null
    this.title = null
    const mediaTitle = document.createElement( 'p' )
    mediaTitle.className = "lightbox__title"
    mediaTitle.textContent = title
    const container = this.element.querySelector( '.lightbox__container' )
    container.innerHTML = ''
    if ( url.split( "." ).pop() === "jpg" ) //*ok
    {
      const image = new Image()
      image.alt = title
      image.src = url
      container.appendChild( image )
      container.appendChild( mediaTitle )
      this.url = url
      this.title = title
    } else if ( url.split( "." ).pop() === "mp4" )
    {
      const video = document.createElement( 'video' )
      video.setAttribute( "autoplay", "true" )
      video.setAttribute( "alt", title )
      video.setAttribute( "src", url )
      video.setAttribute( "type", "video/mp4" )
      container.appendChild( video )
      container.appendChild( mediaTitle )
      this.url = url
      this.title = title
    }
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
    }, 500 )
    document.removeEventListener( 'keyup', this.onKeyUp )
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
    this.loadMedia( this.gallery[ i + 1 ], this.lightboxTitle[ i + 1 ] )
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
    this.loadMedia( this.gallery[ i - 1 ], this.lightboxTitle[ i - 1 ] )
  }

  /**
   * @param {string} url URL du media
   * @param {string} title Titre du média
   * @return {HTMLelement}
   */
  //TODO /lightbox-- contnaier : "Contenu non imbriqué dans une région ARIA"
  buildDom ( url, title )
  {
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
        <div class="lightbox__container"></div>
        <button class="lightbox__next">
          suivant
          <img
            class="lightbox__arrow lightbox__arrow--next"
            src="assets/images/arrow.svg"
            alt="chevron vers la droite"
          />
        </button>
        </div>`

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