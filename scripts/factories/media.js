
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
  function getMediaCardDOM ()
  {
    const mediaArticle = document.createElement( 'article' )
    mediaArticle.className = 'media__article'

    const mediaLink = document.createElement( 'a' )
    mediaLink.className = 'media__link'
    mediaLink.setAttribute( "aria-label", title )
    mediaArticle.appendChild( mediaLink )


    if ( data.hasOwnProperty( 'image' ) )
    {
      mediaPhotographie( data, mediaLink )
    } else if ( data.hasOwnProperty( 'video' ) )
    {
      mediaMovie( data, mediaLink )
    }

    const mediaDetails = document.createElement( 'div' )
    mediaDetails.className = 'media__details'
    mediaArticle.appendChild( mediaDetails )

    const mediaName = document.createElement( 'h2' )
    mediaName.className = 'media__name'
    mediaName.textContent = title
    // TODO aria-description FAUX
    // mediaName.setAttribute( "aria-description", "nom du média" )
    mediaDetails.appendChild( mediaName )

    const mediaContenairLikes = document.createElement( 'div' )
    mediaContenairLikes.className = 'media__contenairLikes'
    mediaDetails.appendChild( mediaContenairLikes )

    //TODO voir pour mettre un role="button" ou convertir en <button></button> pour l'accessibilité
    const mediaLikes = document.createElement( 'p' )
    mediaLikes.className = 'media__likes'
    // TODO "L'attribut aria-label n'est pas bien pris en charge sur un p sans attribut de rôle valide."
    // mediaLikes.setAttribute( "aria-label", `nombre de like du média ${ title }` )
    mediaLikes.textContent = likes
    mediaContenairLikes.appendChild( mediaLikes )

    //incrémentations au click des likes des medias
    mediaContenairLikes.addEventListener( 'click', function ( e )
    {
      mediaLikes.textContent = ++likes
      const allLikes = document.querySelector( '.photograph__likes' )
      console.log( "allLikes :", allLikes ) //*ok
      console.log( "allLikes.innerHTML : ", allLikes.innerHTML ) //*ok
      var allLikesValueNumber = parseInt( allLikes.innerHTML, 10 )
      ++allLikesValueNumber
      // console.log("allLikesValueNumber :", allLikesValueNumber) //*ok
      allLikes.innerHTML = ''
      allLikes.innerHTML = allLikesValueNumber
    } )

    const mediaHeart = document.createElement( 'img' )
    mediaHeart.className = 'media__heart'
    mediaHeart.setAttribute( 'src', heartSvg )
    mediaHeart.setAttribute( "alt", "likes" )
    mediaContenairLikes.appendChild( mediaHeart )

    return mediaArticle
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
  }
}
