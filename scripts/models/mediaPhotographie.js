/*// ~~~ maquette : N°9 - comportement : Ouvre la vue lightbox
// ~~~ nom accessible : "Lilac breasted roller, closeup view" 
// ~~~ états et propriétés :vide
 */
function mediaPhotographie(data, mediaLink) {
  const picture = `assets/photographies/${data.photographerId}/${data.image}`
  mediaLink.setAttribute('href', picture)
  const img = document.createElement('img')
  img.className = 'media'
  img.setAttribute('src', picture)
  img.setAttribute('alt', data.title)
  // TODO label trop long, vérifier l'aria à mettre
  img.setAttribute('aria-label', data.description)
  mediaLink.appendChild(img)
}
