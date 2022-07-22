function mediaPhotographie(data, mediaLink) {
  const picture = `assets/photographies/${data.photographerId}/${data.image}`;
  mediaLink.setAttribute('href', picture);
  const mediaDecsription = document.createElement('p');
  mediaDecsription.id = `mediaDecsription${data.id}`;
  mediaDecsription.className = 'mediaDecsription';
  mediaDecsription.textContent = data.description;
  mediaLink.appendChild(mediaDecsription);
  const img = document.createElement('img');
  img.className = 'media';
  img.id = `media${data.id}`;
  img.setAttribute('src', picture);
  img.setAttribute('alt', data.title);
  img.setAttribute('aria-describedby', mediaDecsription.id);
  mediaLink.appendChild(img);
}
