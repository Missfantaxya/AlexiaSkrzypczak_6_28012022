const lightboxInPhotographieModelTest = "je suis dans models/lightboxPhotographie"
console.log( "je suis dans models/lightboxPhotographie" ) //*ok
console.log( "dans models/lightboxPhotogrpahie :", photographerInPagesTest ) //* ok
console.log( "dans models/lightboxPhotogrpahie :", mediaInFactoriesTesthorsMediaFactory ) // *ok
// console.log( "dans models/lightboxPhotogrpahie :", lightboxInFactory ) // ! not defined
// console.log( "dans models/lightboxPhotogrpahie :", TestBuildDom )// ! not defined
// console.log( "dans models/lightboxPhotogrpahie :", TestloadImage )// ! not defined
// console.log( "dans models/lightboxPhotogrpahie :", Testconstructor ) //! not defined
// console.log( "dans models/lightboxPhotogrpahie :", Teststaticinit ) //! not defined

console.log( "dans models/lightboxPhotogrpahie => displayData.elementsMedia de pages/photographers :", displayData.elementsMedia ) //~ undefined

console.log( "dans models/lightboxPhotogrpahie => mediaFactory.data de factories/media :", mediaFactory.data ) //~ undefined

// console.log( "dans models/lightboxPhotogrpahie :", id ) //! not defined

// console.log( Data ) // !not defined

function test ( data )
{
  alert( "test" )
  console.log( "dataTest", data )
}

