function displayModal ( data )
{
    console.log( "data utils contactForm:", data )
    const modal = document.getElementById( "contact__modal" )
    modalDOM( data )
    modal.style.display = "block"
}

function closeModal ()
{
    const modal = document.getElementById( "contact__modal" )
    modal.style.display = "none"
}
