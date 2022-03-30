// console.log("lightbox") //*ok
// TODO recuperer dnas la dom du document.

class Lightbox {
  static init() {
    const media = document.querySelectorAll(".photographie")
    console.log(media) //! vide
    media.forEach((media) =>
      media.addeventListener("click", (e) => {
        e.preventDefault()
        console.log(e.currentTarget.getAttribute("href"))
        new Lightbox(e.currentTarget.getAttribute("href"))
      })
    )
  }

  /**
   * @param {string} url URL de l'image
   */
  constructor(url) {
    const element = this.buildDom(url)
    document.body.appendChild(element)
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLelement}
   */
  buildDom(url) {
    const dom = document.createElement("div")
    dom.classList.add("lightbox")
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
          <img
            src="assets/photographies/243/Animals_Rainbow.jpg"
            alt="un oiseau arc-en-ciel"
          />
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
  }
}

Lightbox.init()
