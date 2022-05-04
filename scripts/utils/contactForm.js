function displayModal ()
{
    const modal = document.getElementById( "contact__modal" )
    modal.style.display = "block"
}

function closeModal ()
{
    const modal = document.getElementById( "contact__modal" )
    modal.style.display = "none"
}

/**
 * Fait apparaître les valeur des inputs dans les logs de la console
 */
function logInput ()
{
    const firstnameInput = document.querySelector( "#form__firstnameInput" )
    console.log( "prénom : ", firstnameInput.value )
    const lastnameInput = document.querySelector( "#form__lastnameInput" )
    console.log( "nom : ", lastnameInput.value )
    const emailInput = document.querySelector( "#form__emailInput" )
    console.log( "email : ", emailInput.value )
    const messageInput = document.querySelector( "#form__messageInput" )
    console.log( "message : ", messageInput.value )
}

/**
 * réinitialise le formulaire
 */
function eraseInput ()
{
    const form = document.querySelector( ".contact__form" )
    form.reset()
}