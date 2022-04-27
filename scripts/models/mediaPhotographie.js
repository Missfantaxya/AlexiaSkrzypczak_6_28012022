function mediaPhotographie ( data, article )
{
  const picture = `assets/photographies/${ data.photographerId }/${ data.image }`
  article.setAttribute( 'href', picture )
  const img = document.createElement( 'img' )
  img.className = 'media'
  img.setAttribute( 'src', picture )
  img.setAttribute( 'alt', data.title )
  img.setAttribute( 'aria-label', data.description )
  article.appendChild( img )
}

