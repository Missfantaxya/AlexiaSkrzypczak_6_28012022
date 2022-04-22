const lightboxInFactory = "je suis dans lightbox"
// console.log( "dans lightbox :", mediaInFactoriesTest ) //! error not defined
// console.log( "dans lightbox :", photographerInPagesTest ) //*ok
// console.log( "dans lightbox :", lightboxInPhotographieModelTest ) //*ok

// TODO faire fonctionner sur les vidéos (pattern Factory)
/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Chemins des medias de la lightbox
 * @property {string} url média actuellement affichée
 */
class Lightbox
{
  static init ()
  {
    const Teststaticinit = "je suis dans static init"
    // console.log( "dans lightbox dans la class lightbox static init :", lightboxInPhotographieModelTest ) //* ok
    const links = Array.from( document.querySelectorAll( '.photographie' ) )
    // console.log('links', links) //* ok dans media.js
    const gallery = links.map( ( link ) => link.getAttribute( 'href' ) )
    const lightboxTitle = links.map( ( link ) => link.getAttribute( 'aria-label' ) )
    // console.log( "lightboxTitle :", lightboxTitle ) // *ok => un tableau
    // console.log( 'gallery :', gallery ) //* ok dans media.js
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
    const Testconstructor = "je suis dans constructor"
    // console.log( "dans lightbox dans la class lightbox constructor :", lightboxInPhotographieModelTest ) //*ok
    // console.log( "titleConstructor :", title )  //ok
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
    const TestloadImage = "je suis dans loadMedia"
    // console.log( "dans lightbox dans la class lightbox loadMedia :", lightboxInPhotographieModelTest ) //* ok
    this.url = null
    this.title = null

    console.log( "extension :", url.split( "." ).pop() ) //*ok

    // if ( url.split( "." ).pop() === "mp4" ) { } else if ( url.split( "." ).pop() === "jpg" )
    // {
    const media = new Image()
    // }

    const mediaTitle = document.createElement( 'p' )
    mediaTitle.className = "lightbox__title"
    mediaTitle.textContent = title
    const container = this.element.querySelector( '.lightbox__container' )
    const loader = document.createElement( 'div' )
    loader.className = 'lightbox__loader'
    container.innerHTML = ''
    container.appendChild( loader )
    media.onload = () =>
    {
      container.removeChild( loader )

      container.appendChild( media )

      container.appendChild( mediaTitle )
      this.url = url
      this.title = title
    }
    media.alt = title
    media.src = url
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
  buildDom ( url, title )
  {
    const TestBuildDom = "je suis dans buildDom"
    // console.log( "dans buildom de lightbox :", lightboxInPhotographieModelTest )// *ok
    console.log( "url dans buildDom : ", url ) // *ok
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