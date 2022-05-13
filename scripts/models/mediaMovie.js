function mediaMovie ( data, mediaLink )
{
  const videoMedia = `assets/photographies/${ data.photographerId }/${ data.video }`
  mediaLink.setAttribute( 'href', videoMedia )
  const thumbnail = document.createElement( 'video' )
  thumbnail.className = 'media'
  //TODO "Aucune piste de sous-titres n’a pu être trouvée pour cet élément"
  thumbnail.setAttribute( 'src', videoMedia )
  thumbnail.setAttribute( 'type', 'video/mp4' )
  thumbnail.setAttribute( 'alt', data.title )
  thumbnail.setAttribute( 'aria-label', data.description )
  mediaLink.appendChild( thumbnail )
}