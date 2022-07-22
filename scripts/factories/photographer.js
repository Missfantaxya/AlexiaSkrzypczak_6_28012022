/* eslint-disable no-unused-vars */
/**
 * @param {object} data
 * @returns
 */
function photographerFactory(data) {
  const {
    name, portrait, country, city, tagline, price, id,
  } = data;
  const avatar = `assets/photographers/${portrait}`;
  /**
   * Construction du DOM pour les détails d'un photogarphe sur la page d'accueil
   * @returns {HTMLelement}
   */
  function getPhotographerCardDOM() {
    const photographerArticle = document.createElement('article');
    photographerArticle.className = 'photographer__article';
    const photographerLink = document.createElement('a');
    photographerLink.setAttribute('href', `photographer.html?id=${id}`);
    photographerLink.className = 'photographer__link';
    photographerLink.setAttribute('aria-label', name);

    const photographerAvatar = document.createElement('img');
    photographerAvatar.setAttribute('src', avatar);
    photographerAvatar.className = 'photographer__avatar';
    // texte alternatif vide comme demandé sur la maquette
    photographerAvatar.setAttribute('alt', ' ');

    const photographerName = document.createElement('h2');
    photographerName.className = 'photographer__name';

    const photographerDetails = document.createElement('p');
    photographerDetails.className = 'photographer__details';

    const photographerLocation = document.createElement('p');
    photographerLocation.className = 'photographer__location';

    const photographerSlogan = document.createElement('p');
    photographerSlogan.className = 'photographer__slogan';

    const photographerPrice = document.createElement('p');
    photographerPrice.className = 'photographer__price';

    photographerName.textContent = name;
    photographerArticle.appendChild(photographerLink);
    photographerLink.appendChild(photographerAvatar);
    photographerLink.appendChild(photographerName);
    photographerLocation.textContent = `${city}, ${country}`;
    photographerSlogan.textContent = tagline;
    photographerPrice.textContent = `${price}€/jour`;
    photographerArticle.appendChild(photographerDetails);
    photographerDetails.appendChild(photographerLocation);
    photographerDetails.appendChild(photographerSlogan);
    photographerDetails.appendChild(photographerPrice);
    return photographerArticle;
  }

  function getPhotographName() {
    const photographName = document.createElement('h1');
    photographName.className = 'photograph__name';
    photographName.textContent = data[0].name;
    return photographName;
  }

  function getPhotographLocation() {
    const photographLocation = document.createElement('p');
    photographLocation.className = 'photograph__location';
    photographLocation.textContent = `${data[0].city}, ${data[0].country}`;
    return photographLocation;
  }

  function getPhotographTagline() {
    const photographTagline = document.createElement('p');
    photographTagline.className = 'photograph__tagline';
    photographTagline.textContent = data[0].tagline;
    return photographTagline;
  }

  function getPhotographAvatar() {
    const figure = `assets/photographers/${data[0].portrait}`;
    const photographerAvatar = document.createElement('img');
    photographerAvatar.className = 'photograph__avatar';
    photographerAvatar.setAttribute('src', figure);
    photographerAvatar.setAttribute('alt', data[0].name);
    return photographerAvatar;
  }

  return {
    name,
    portrait,
    country,
    city,
    tagline,
    price,
    id,
    getPhotographerCardDOM,
    getPhotographName,
    getPhotographLocation,
    getPhotographTagline,
    getPhotographAvatar,
  };
}
