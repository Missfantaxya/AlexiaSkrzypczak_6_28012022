function modalDOM ( data )
{
  //----- construction du DOM -----
  // TODO vérifier avec la maquette la sémantique
  const modal = document.querySelector( ".modal" )
  const modalHeader = modal.firstElementChild
  modalHeader.className = "modal__header"
  const modalTitle = modalHeader.firstElementChild
  modalTitle.className = "modal__title"
  const modalDetails = document.createElement( 'div' )
  modalDetails.className = "modal__details"
  modalHeader.insertBefore( modalDetails, modalTitle )
  modalDetails.appendChild( modalTitle )
  const modalPhotographerName = document.createElement( "p" )
  modalPhotographerName.className = "modal__photographerName"
  modalPhotographerName.textContent = data[ 0 ].name
  modalDetails.appendChild( modalPhotographerName )


  const form = document.querySelector( 'form' )
  form.className = "contact__form"
  const formFields = form.firstElementChild

  const formFirstnameLabel = formFields.firstElementChild
  formFirstnameLabel.setAttribute( "for", "form__firstnameInput" )
  const formFirstnameInput = formFirstnameLabel.nextElementSibling
  formFirstnameInput.id = "form__firstnameInput"
  formFirstnameInput.className = "form__input"
  formFirstnameInput.setAttribute( "name", "firstname" )
  formFirstnameInput.setAttribute( "type", "text" )

  const formLastnameLabel = document.createElement( "label" )
  formLastnameLabel.setAttribute( "for", "form__lastnameInput" )
  formLastnameLabel.textContent = "Nom"
  formFields.appendChild( formLastnameLabel )
  const formLastnameInput = document.createElement( "input" )
  formLastnameInput.id = "form__lastnameInput"
  formLastnameInput.className = "form__input"
  formLastnameInput.setAttribute( "name", "lastname" )
  formLastnameInput.setAttribute( "type", "text" )
  formFields.appendChild( formLastnameInput )

  const formEmailLabel = document.createElement( "label" )
  formEmailLabel.setAttribute( "for", "form__emailInput" )
  formEmailLabel.textContent = "Email"
  formFields.appendChild( formEmailLabel )
  const formEmailInput = document.createElement( "input" )
  formEmailInput.id = "form__emailInput"
  formEmailInput.className = "form__input"
  formEmailInput.setAttribute( "name", "email" )
  formEmailInput.setAttribute( "type", "email" )
  formFields.appendChild( formEmailInput )

  const formMessageLabel = document.createElement( "label" )
  formMessageLabel.setAttribute( "for", "form__messageInput" )
  formMessageLabel.textContent = "Message"
  formFields.appendChild( formMessageLabel )
  const formMessageInput = document.createElement( "textarea" )
  formMessageInput.id = "form__messageInput"
  formMessageInput.className = "form__input form__textarea"
  formMessageInput.setAttribute( "name", "message" )
  formFields.appendChild( formMessageInput )
}