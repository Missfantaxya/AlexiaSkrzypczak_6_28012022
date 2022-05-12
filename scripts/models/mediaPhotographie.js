function mediaPhotographie ( data, mediaLink )
{
  // console.log( "data mediaPhotographie : ", data ) //*ok
  const picture = `assets/photographies/${ data.photographerId }/${ data.image }`
  mediaLink.setAttribute( 'href', picture )
  const img = document.createElement( 'img' )
  img.className = 'media'
  img.setAttribute( 'src', picture )
  img.setAttribute( 'alt', data.title )
  img.setAttribute( 'aria-label', data.description )
  mediaLink.appendChild( img )
}

