const mediaInFactoriesTesthorsMediaFactory = "je suis dans media hors mediaFactory"
// console.log( "Dans factories/media :", lightboxInPhotographieModelTest )  //! not defined

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

  // console.log( "Dans factories/media dans la function mediaFactory :", lightboxInPhotographieModelTest ) //* ok
  const mediaInFactoriesTest = "je suis dans media"
  // console.log( "dans media :", lightboxInFactory ) //*ok
  // console.log( "dans media :", photographerInPagesTest ) //* ok

  // TODO mettre de la bonne couleur (attention le même asset est noir ailleur)
  const heartSvg = 'assets/icons/heart-solid.svg'

  function getpictureCardDOM ()
  {
    const article = document.createElement( 'a' )
    article.className = 'photographie'
    article.setAttribute( "aria-label", title )

    // TODO séparer le code dans fichier model pour expliquer la factory: création d'objets dynamiquement.
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
