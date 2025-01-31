/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/**
 * @property {HTMLElement} element
 * @property {string[]} gallery - Chemins des medias de la lightbox
 * @property {string} url - média actuellement affichée
 * @property {number} name - media actuellement affichée
 */
class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll('.media__link'));
    const gallery = links.map((link) => link.getAttribute('href'));
    const lightboxTitle = links.map((link) => link.getAttribute('aria-label'));
    const mediaName = links.map((link) => link.getAttribute('id'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-new
      new Lightbox(
        e.currentTarget.getAttribute('href'),
        e.currentTarget.getAttribute('aria-label'),
        e.currentTarget.getAttribute('id'),
        gallery,
        lightboxTitle,
        mediaName,
      );

      const lightboxClose = document.querySelector('.lightbox__close');
      lightboxClose.focus();
    }));
  }

  /**
   * @param {string} url URL du média
   * @param {string} title Titre du média
   * @param {string[]} gallery Chemins des médias de la lightbox
   * @param {string[]} lightboxTitle Titres des medias de la lightbox
   * @param {string} name Nom du média
   * @param {srting[]} mediaName Noms des médias de la lightbox
   */
  constructor(url, title, name, gallery, lightboxTitle, mediaName) {
    const main = document.getElementById('main');
    main.ariaHidden = 'true';
    this.element = this.buildDom(url, name);
    this.gallery = gallery;
    this.lightboxTitle = lightboxTitle;
    this.mediaName = mediaName;
    this.loadMedia(url, title, name);
    this.onKeyUp = this.onKeyUp.bind(this);
    main.after(this.element);
    document.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * @param {string} url URL du média
   * @param {string} title Titre du média
   * @param {string} name Nom du média
   */
  loadMedia(url, title, name) {
    this.url = null;
    this.title = null;
    this.name = null;
    const mediaTitle = document.createElement('h2');
    mediaTitle.className = 'lightbox__title';
    mediaTitle.id = 'lightbox__title';
    mediaTitle.textContent = title;
    const container = this.element.querySelector('.lightbox__container');
    container.setAttribute('aria-labelledby', 'lightbox__title');
    container.innerHTML = '';
    if (url.split('.').pop() === 'jpg') {
      const image = new Image();
      image.alt = title;
      image.src = url;
      image.name = name;
      container.appendChild(image);
      container.appendChild(mediaTitle);
      this.url = url;
      this.title = title;
      this.name = name;
    } else if (url.split('.').pop() === 'mp4') {
      const video = document.createElement('video');
      video.setAttribute('autoplay', 'true');
      video.setAttribute('alt', title);
      video.setAttribute('src', url);
      video.setAttribute('type', 'video/mp4');
      video.name = name;
      container.appendChild(video);
      container.appendChild(mediaTitle);
      this.url = url;
      this.title = title;
      this.name = name;
    }
  }

  /**
   * @param {keyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  // eslint-disable-next-line no-unused-vars
  close(e) {
    event.preventDefault();
    const main = document.getElementById('main');
    main.ariaHidden = 'false';
    this.element.ariaHidden = 'true';
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
      const mediaClicked = document.getElementById(this.name);
      mediaClicked.focus();
    }, 300);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  /**
   * Passe au média suivante
   * @param {MouseEvent/KeyboardEvent} e
   */
  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((media) => media === this.url);
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.loadMedia(
      this.gallery[i + 1],
      this.lightboxTitle[i + 1],
      this.mediaName[i + 1],
    );
  }

  /**
   * Passe au média précedent
   * @param {MouseEvent/KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((media) => media === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    this.loadMedia(
      this.gallery[i - 1],
      this.lightboxTitle[i - 1],
      this.mediaName[i - 1],
    );
  }

  /**
   * @param {string} url URL du media
   * @param {string} title Titre du média
   * @param {string} name Nom du média
   * @return {HTMLelement}
   */
  buildDom() {
    const dom = document.createElement('div');
    dom.className = 'lightbox';
    dom.ariaHidden = 'false';
    dom.innerHTML = `<div class="lightbox__wrapper" role="dialog" aria-label="media closeup view">
        <button class="lightbox__close" type="button">
          <img
            class="lightbox__cross"
            src="assets/images/cross.svg"
            alt="croix de fermeture"
          />
          Close-dialogue
        </button>
        <button class="lightbox__prev" type="button">
          Previous-image
          <img
            class="lightbox__arrow lightbox__arrow--prev"
            src="assets/images/arrow.svg"
            alt="chevron vers la gauche"
          />
        </button>
        <div class="lightbox__container"></div>
        <button class="lightbox__next" type="button">
          Next-image
          <img
            class="lightbox__arrow lightbox__arrow--next"
            src="assets/images/arrow.svg"
            alt="chevron vers la droite"
          />
        </button>
        </div>`;

    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.close.bind(this));
    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this));
    return dom;
  }
}
