/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Mettre le code JavaScript lié à la page photographer.html

// ----- récupération de l'id du photographe dans l'url -----

/**
 * Récupère les paramètres de l'url
 * @type {object}
 */
const urlResearchParams = new URLSearchParams(window.location.search);

/**
 * Récupère l'id du photographe dans les paramètres de l'url
 * @type {number}
 */
const idUrl = parseInt(urlResearchParams.get('id'), 10);

/**
 * Affiche les donées et les médias du photographe
 * @param {object} photographers - la liste des photographes
 * @param {object} media - la liste des médias
 */
async function displayData(photographers, media) {
  // ========== Pour la mise en page ==========

  const photographerMain = document.getElementById('main');
  photographerMain.className = 'main__photographer';
  const header = document.querySelector('header');
  header.className = 'header';
  // ========== La parties avec le photographe ==========

  const heartSvg = 'assets/icons/heart-solid-black.svg';

  const photographHeader = document.querySelector('.photograph__header');
  const photographContact = photographHeader.querySelector('.contact__button');
  photographContact.classList.add('photograph__contact');
  photographContact.setAttribute('type', 'button');
  photographHeader.appendChild(photographContact);
  const photographDetails = document.createElement('div');
  photographDetails.className = 'photograph__details';
  photographHeader.insertBefore(photographDetails, photographContact);

  /**
   * Donées du photographe
   * @const {object[]}
   */
  const photograph = photographers.filter(
    (photographer) => photographer.id === idUrl,
  );

  // ----- Affichage des donées du photographe -----
  const photographerModel = photographerFactory(photograph);
  const photographNameDOM = photographerModel.getPhotographName();
  photographDetails.appendChild(photographNameDOM);
  const photographLocationDOM = photographerModel.getPhotographLocation();
  photographDetails.appendChild(photographLocationDOM);
  const photographTaglineDOM = photographerModel.getPhotographTagline();
  photographDetails.appendChild(photographTaglineDOM);

  // -----Accessibilité du bouton de contact
  const contactButton = document.querySelector('.contact__button');
  contactButton.setAttribute('type', 'button');

  // ----- Affichage de l'avatar du photographe -----
  const photographerAvatarModel = photographerFactory(photograph);
  const PhotographAvatarDOM = photographerAvatarModel.getPhotographAvatar();
  photographHeader.appendChild(PhotographAvatarDOM);

  // ========== La parties avec les likes du photographe ==========

  /**
   * Les médias d'un photographe
   * @const {object[]}
   */
  const photographMedias = media.filter(
    (photographMedia) => photographMedia.photographerId === idUrl,
  );

  /**
   * Les likes par média du pohotographe
   * @const {number[]}
   */
  const mediasLikes = photographMedias.map(
    (oneMediaLikes) => oneMediaLikes.likes,
  );

  /**
   * Initiation du nombre de like
   * @var {number}
   */
  const initialLike = 0;
  /**
   * Nombre total de likes du photographe
   * @const {number}
   */
  const photographerAllLikes = mediasLikes.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialLike,
  );

  // ----- construction du DOM -----

  const photographPriceAndLike = document.createElement('div');
  photographPriceAndLike.className = 'photograph__priceAndLike';
  photographHeader.appendChild(photographPriceAndLike);

  const photographWrapperLikes = document.createElement('div');
  photographWrapperLikes.className = 'photograph__wrapperLikes';
  photographPriceAndLike.appendChild(photographWrapperLikes);

  const photographLike = document.createElement('p');
  photographLike.className = 'photograph__likes';
  photographLike.textContent = photographerAllLikes;
  photographLike.setAttribute('aria-label', 'nombre de likes');
  photographWrapperLikes.appendChild(photographLike);

  const photographHeart = document.createElement('img');
  photographHeart.className = 'photograph__heart';
  photographHeart.id = 'photograph__heart';
  photographHeart.setAttribute('src', heartSvg);
  photographHeart.setAttribute('alt', 'likes');
  photographWrapperLikes.appendChild(photographHeart);

  const photographPrice = document.createElement('p');
  photographPrice.className = 'photograph__price';
  photographPrice.textContent = `${photograph[0].price}€ / jour`;
  photographPriceAndLike.appendChild(photographPrice);

  // ========== La parties avec les médias ==========

  // ----- construction du DOM -----

  const main = document.querySelector('#main');

  const mediaSection = document.createElement('section');
  mediaSection.className = 'medias__section';
  mediaSection.setAttribute('aria-labelledby', 'media__title');
  main.appendChild(mediaSection);

  const mediaTitle = document.createElement('h2');
  mediaTitle.className = 'medias__title';
  mediaTitle.id = 'media__title';
  mediaTitle.textContent = 'Les médias du photographe';
  mediaSection.appendChild(mediaTitle);

  const medias = document.createElement('div');
  medias.className = 'medias';
  mediaSection.appendChild(medias);

  // ----- fonctions des médias -----

  /**
   * Classement des medias par popularité
   */
  function popularitySort() {
    photographMedias.sort((a, b) => a.likes - b.likes);
  }

  /**
   * Affichage des médias
   */
  function displayMedias() {
    // Vide les medias
    medias.textContent = '';
    // Remplissage des médias avec classement
    photographMedias.forEach((elementMedia) => {
      const mediaModel = mediaFactory(elementMedia);
      const elementMediaDOM = mediaModel.getMediaCardDOM();
      medias.appendChild(elementMediaDOM);
    });
  }

  popularitySort();
  displayMedias();

  // ========== La selection du classement ==========

  // ----- construction du DOM -----

  const selectForm = document.createElement('form');
  selectForm.className = 'selectForm';
  mediaSection.insertBefore(selectForm, medias);

  const selectLabel = document.createElement('label');
  selectLabel.className = 'selectLabel';
  selectLabel.id = 'selectLabel';
  selectLabel.textContent = 'Trier par';
  selectForm.appendChild(selectLabel);

  const options = [
    {
      content: 'Popularité',
      id: 'popularityOption',
      classe: 'popularityOption',
      selected: 'true',
    },
    {
      content: 'Date',
      id: 'dateOption',
      classe: 'dateOption',
      selected: 'false',
    },
    {
      content: 'Titre',
      id: 'titleOption',
      classe: 'titleOption',
      selected: 'false',
    },
  ];

  const selectButton = document.createElement('button');
  selectButton.className = 'selectButton hidden';
  selectButton.setAttribute('type', 'button');
  selectButton.setAttribute('role', 'button');
  selectButton.setAttribute('aria-labelledby', 'selectLabel');
  selectButton.ariaHasPopup = 'listbox';
  selectButton.ariaExpanded = 'false';
  selectForm.appendChild(selectButton);

  const selectArrow = document.createElement('div');
  selectArrow.className = 'selectArrow';
  selectButton.appendChild(selectArrow);

  const selectOptions = document.createElement('ul');

  /**
   * construction du DOM de la liste des options du classement
   * @return {HTMLelement}
   */
  function selectOptionsDOM() {
    selectOptions.className = 'selectOptions';
    selectOptions.id = 'selectOptions';
    selectOptions.setAttribute('role', 'listbox');
    selectOptions.setAttribute('aria-activedescendant', `${options[0].id}`);
    selectOptions.setAttribute('aria-labelledby', 'selectLabel');
    selectButton.insertBefore(selectOptions, selectArrow);
  }
  selectOptionsDOM();

  /**
   * construction du DOM des options la selection pour le classement des médias
   * @return {HTMLelement}
   */
  function selectionDOM() {
    selectOptions.innerHTML = '';
    options.map((selectOption) => {
      const optionSelect = document.createElement('li');
      optionSelect.className = `selectOption ${selectOption.classe}`;
      optionSelect.id = `${selectOption.classe}`;
      optionSelect.setAttribute('role', 'option');
      optionSelect.setAttribute('tabindex', '-1');
      optionSelect.setAttribute('aria-selected', `${selectOption.selected}`);
      optionSelect.textContent = selectOption.content;
      selectOptions.appendChild(optionSelect);
      return optionSelect;
    });
  }

  selectionDOM();

  // ----- Fonctionnement de la selection -----

  /**
   * rendre les options selectionnablent au clavier uniquement quand la selection est ouverte
   * @function
   */
  function toggleAccessOption() {
    const optionSelect = document.getElementsByClassName('selectOption');
    Array.isArray(optionSelect);
    const firstOption = document.querySelector('.selectOptions').firstElementChild;
    if (selectButton.ariaExpanded === 'true') {
      // eslint-disable-next-line no-restricted-syntax
      for (const selectOption of optionSelect) {
        selectOption.setAttribute('tabindex', '0');
      }
      firstOption.setAttribute('autofocus', 'true');
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const selectOption of optionSelect) {
        selectOption.setAttribute('tabindex', '-1');
      }
      firstOption.setAttribute('autofocus', 'false');
    }
  }

  /**
   * inversion du boléen ariaExpanded de la selection
   * @function
   */
  function toggleSelection() {
    selectButton.classList.toggle('hidden');
    selectArrow.classList.toggle('up');
    if (selectButton.ariaExpanded === 'false') {
      selectButton.ariaExpanded = 'true';
    } else {
      selectButton.ariaExpanded = 'false';
    }
    toggleAccessOption();
  }

  // axe d'amélioration : fermeture de la selection à la perte de focus
  /**
   * Permet de faire le tri des médias selon la selection choisi
   * @function
   */
  function sortMedia() {
    const selectOption = document.querySelectorAll('.selectOption');
    selectOption.forEach((item) => {
      // eslint-disable-next-line no-unused-vars
      function select(e) {
        const indice = options.findIndex(
          (oneOption) => oneOption.content === item.textContent,
        );
        // suppression de l'élément sélectioné du tableau
        const optionMove = options.splice(indice, 1);
        // ajout de l'élément supprimé au début du tableau (à l'index 0)
        // eslint-disable-next-line no-unused-vars
        options.splice(0, 0, optionMove[0]);
        options[0].selected = 'true';
        options[1].selected = 'false';
        options[2].selected = 'false';
        // classement des médias en fonction de l'option sélectionée
        if (item.textContent === 'Date') {
          // classer photographMedias par date
          photographMedias.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date),
          );
          displayMedias();
          Lightbox.init();
        } else if (item.textContent === 'Titre') {
          // classer photographMedias par titre (alphabétique)
          photographMedias.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          displayMedias();
          Lightbox.init();
        } else if (item.textContent === 'Popularité') {
          popularitySort();
          displayMedias();
          Lightbox.init();
        }
        selectOptions.remove();
        selectOptionsDOM();
        selectionDOM();
      }

      /**
       * @param {keyboarEvent} e
       */
      item.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          select();
        }
      });

      item.addEventListener('click', select);
    });
  }

  // alternance ouverture et fermeture de la selection
  // eslint-disable-next-line no-unused-vars
  selectButton.addEventListener('click', (e) => {
    toggleSelection();
    sortMedia();
  });

  // initialisation de la lightbox:
  Lightbox.init();

  // ========== La parties avec la modal ==========

  // ----- construction du DOM -----
  modalDOM(photograph);

  // ----- inscription du contenu des inputs en console -----
  const modal = document.querySelector('.modal');
  const contactSubmit = modal.querySelector('.contact__button');
  contactSubmit.addEventListener('click', (event) => {
    // evite la soumission par default du formulaire
    event.preventDefault();

    logInput();

    // function temporaire en attendant une soumission fonctionnelle du formulaire
    eraseInput();
    window.setTimeout(() => {
      closeModal();
    }, 500);
  });
}
