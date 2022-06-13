/*// ~~~ maquette : N°9 - comportement : Ouvre la vue lightbox
// ~~~ nom accessible : "Lilac breasted roller, closeup view" 
// ~~~ états et propriétés :vide
 */
function mediaMovie(data, mediaLink) {
  const videoMedia = `assets/photographies/${data.photographerId}/${data.video}`
  mediaLink.setAttribute('href', videoMedia)
  const thumbnail = document.createElement('video')
  thumbnail.className = 'media'
  thumbnail.setAttribute('src', videoMedia)
  thumbnail.setAttribute('type', 'video/mp4')
  thumbnail.setAttribute('alt', data.title)
  // TODO v"rifier l'ARIA à mettre car trop long pour label
  thumbnail.setAttribute('aria-label', data.description)
  mediaLink.appendChild(thumbnail)
}
