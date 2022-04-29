
function mediaFactory ( data )
{
  let {
    id,
    date,
    description,
    image,
    video,
    likes,
    photographerId,
    price,
    title,
  } = data

  const heartSvg = 'assets/icons/heart-solid-brown.svg'
  // La factorie permet un affichage dynamique des medias en fonction des propriétés photo ou vidéo.
  function getpictureCardDOM ()
  {
    const article = document.createElement( 'a' )
    article.className = 'photographie'
    article.setAttribute( "aria-label", title )

    if ( data.hasOwnProperty( 'image' ) )
    {
      mediaPhotographie( data, article )
    } else if ( data.hasOwnProperty( 'video' ) )
    {
      mediaMovie( data, article )
    }

    const pictureDetails = document.createElement( 'div' )
    pictureDetails.className = 'pictureDetails'
    article.appendChild( pictureDetails )

    const pictureName = document.createElement( 'h2' )
    pictureName.className = 'pictureName'
    pictureName.textContent = title
    pictureDetails.appendChild( pictureName )

    const contenairLikes = document.createElement( 'div' )
    contenairLikes.className = 'contenairLikes'
    pictureDetails.appendChild( contenairLikes )

    const pictureLikes = document.createElement( 'p' )
    pictureLikes.className = 'pictureLikes'
    pictureLikes.textContent = likes
    contenairLikes.appendChild( pictureLikes )

    // TODO faire en sorte que ça n'ouvre pas la lightbox (Z-index en css non suffisant)
    // isoler (absolute) le like des photo pour pas qu'ils soit intégrer dans le a
    //incrémentations au click des likes des medias
    contenairLikes.addEventListener( 'click', function ( e )
    {
      // e.preventDefault() //! n'empêche pas la lightBox
      pictureLikes.textContent = ++likes
      const allLikes = document.querySelector( '.photographerLike' )
      // console.log("allLikes :", allLikes) //*ok
      // console.log("allLikes.innerHTML : ", allLikes.innerHTML) //*ok
      var allLikesValueNumber = parseInt( allLikes.innerHTML, 10 )
      ++allLikesValueNumber
      // console.log("allLikesValueNumber :", allLikesValueNumber) //*ok
      allLikes.innerHTML = ''
      allLikes.innerHTML = allLikesValueNumber
    } )

    const heartmedia = document.createElement( 'img' )
    heartmedia.className = 'heart'
    heartmedia.setAttribute( 'src', heartSvg )
    contenairLikes.appendChild( heartmedia )

    return article
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
    getpictureCardDOM,
  }
}
