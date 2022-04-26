const lightboxInPhotographieModelTest = "je suis dans models/lightboxPhotographie"
// console.log( "je suis dans models/lightboxPhotographie" ) //*ok
// console.log( "dans models/lightboxPhotogrpahie :", photographerInPagesTest ) //* ok
// console.log( "dans models/lightboxPhotogrpahie :", mediaInFactoriesTesthorsMediaFactory ) // *ok

// fonctionne en appelant la fonction dans un autree fichier, une autre fonction et en passant data en paramètre
function mediaPhotographie ( data, videoMedia )
{
  const picture = `assets/photographies/${ data.photographerId }/${ data.image }`

  // pour test -----
  console.log( "videoMedia dans le models :", videoMedia ) //! undefined
  //---------------

  // TODO trouver comment le récupérer le const article de getpictureCardDom pour ne pas dupliquer le code.
  //! 
  const article = document.querySelector( ".photographie" )

  console.log( "article de mediaPhotographie :", article ) //! null
  article.setAttribute( 'href', picture ) //! Uncaught (in promise) TypeError: Cannot read properties of null (reading 'setAttribute')
  const img = document.createElement( 'img' )
  img.className = 'media'
  img.setAttribute( 'src', picture )
  img.setAttribute( 'alt', data.title )
  img.setAttribute( 'aria-label', data.description )
  article.appendChild( img )

  // alert( "test" )
  // console.log( "dataTest", data )
}

