const lightboxInMovieModelTest = "je suis dans models/lightboxMovie"
console.log( "models/lightboxMovie" )

function mediaMovie ( data, article )
{
  const videoMedia = `assets/photographies/${ data.photographerId }/${ data.video }`
  article.setAttribute( 'href', videoMedia )
  const thumbnail = document.createElement( 'video' )
  thumbnail.className = 'media'
  thumbnail.setAttribute( 'src', videoMedia )
  thumbnail.setAttribute( 'type', 'video/mp4' )
  thumbnail.setAttribute( 'alt', data.title )

  thumbnail.setAttribute( 'aria-label', data.description )
  article.appendChild( thumbnail )
}