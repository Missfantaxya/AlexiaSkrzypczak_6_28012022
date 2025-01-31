/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
function mediaFactory(data) {
  const {
    id,
    date,
    description,
    image,
    likes,
    photographerId,
    price,
    title,
  } = data;

  const heartSvg = 'assets/icons/heart-solid-brown.svg';

  /**
   * affichage dynamique des medias selon la propriété photo ou vidéo.
   * @returns {HTMLelement}
   */
  function getMediaCardDOM() {
    const mediaArticle = document.createElement('article');
    mediaArticle.className = 'media__article';

    const mediaLink = document.createElement('a');
    mediaLink.className = 'media__link';
    mediaLink.id = `mediaLink${id}`;
    mediaLink.setAttribute('aria-label', title);
    mediaArticle.appendChild(mediaLink);

    if (data.hasOwnProperty('image')) {
      mediaPhotographie(data, mediaLink);
    } else if (data.hasOwnProperty('video')) {
      mediaMovie(data, mediaLink);
    }

    const mediaDetails = document.createElement('div');
    mediaDetails.className = 'media__details';
    mediaArticle.appendChild(mediaDetails);

    const mediaName = document.createElement('h2');
    mediaName.className = 'media__name';
    mediaName.textContent = title;
    mediaDetails.appendChild(mediaName);

    const mediaContenairLikes = document.createElement('div');
    mediaContenairLikes.className = 'media__contenairLikes';
    mediaDetails.appendChild(mediaContenairLikes);

    const mediaLikes = document.createElement('button');
    mediaLikes.className = 'media__likes';
    mediaLikes.setAttribute('type', 'button');
    mediaLikes.setAttribute('aria-label', `nombre de likes pour ${title}`);
    mediaLikes.textContent = likes;
    mediaContenairLikes.appendChild(mediaLikes);

    // incrémentations au click des likes des medias
    mediaContenairLikes.addEventListener('click', (e) => {
      mediaLikes.textContent = likes + 1;
      const allLikes = document.querySelector('.photograph__likes');
      let allLikesValueNumber = parseInt(allLikes.innerHTML, 10);
      allLikesValueNumber += 1;
      allLikes.innerHTML = '';
      allLikes.innerHTML = allLikesValueNumber;
    });

    const mediaHeart = document.createElement('img');
    mediaHeart.className = 'media__heart';
    mediaHeart.setAttribute('src', heartSvg);
    mediaHeart.setAttribute('alt', 'likes');
    mediaContenairLikes.appendChild(mediaHeart);

    return mediaArticle;
  }

  return {
    id,
    date,
    description,
    image,
    likes,
    photographerId,
    price,
    title,
    getMediaCardDOM,
  };
}
