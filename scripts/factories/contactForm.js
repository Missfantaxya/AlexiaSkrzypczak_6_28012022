function modalDOM(data) {
  //----- construction du DOM -----
  const modal = document.querySelector('.modal')
  modal.setAttribute('aria-labelledby', 'modal__title')
  const modalHeader = modal.firstElementChild
  modalHeader.className = 'modal__header'

  //TODO mettre un arie-label ??
  const OriginalModalTitle = modalHeader.firstElementChild
  const modalTitle = document.createElement('h1')
  modalTitle.textContent = 'Contactez-moi'
  modalTitle.className = 'modal__title'
  modalTitle.id = 'modal__title'
  OriginalModalTitle.replaceWith(modalTitle)

  const modalPhotographerName = document.createElement('div')
  modalPhotographerName.className = 'modal__photographerName'
  modalPhotographerName.textContent = data[0].name
  modalTitle.appendChild(modalPhotographerName)

  const closeModal = document.createElement('button')
  closeModal.className = 'modal__close'
  closeModal.ariaLabel = 'Close Contact form'
  closeModal.setAttribute('type', 'button')
  closeModal.setAttribute('onClick', 'closeModal()')
  modalTitle.after(closeModal)

  const closeModalImg = modalHeader.lastElementChild
  closeModalImg.setAttribute('alt', 'croix de fermeture')
  closeModalImg.removeAttribute('onClick')
  closeModal.appendChild(closeModalImg)

  const form = document.querySelector('div.modal form')
  form.className = 'contact__form'
  const formFields = form.firstElementChild

  const formFirstnameLabel = formFields.firstElementChild
  formFirstnameLabel.setAttribute('for', 'form__firstnameInput')

  const formFirstnameInput = formFirstnameLabel.nextElementSibling
  formFirstnameInput.id = 'form__firstnameInput'
  formFirstnameInput.className = 'form__input'
  formFirstnameInput.setAttribute('name', 'firstname')
  formFirstnameInput.setAttribute('type', 'text')

  const formLastnameLabel = document.createElement('label')
  formLastnameLabel.setAttribute('for', 'form__lastnameInput')
  formLastnameLabel.textContent = 'Nom'
  formFields.appendChild(formLastnameLabel)

  const formLastnameInput = document.createElement('input')
  formLastnameInput.id = 'form__lastnameInput'
  formLastnameInput.className = 'form__input'
  formLastnameInput.setAttribute('name', 'lastname')
  formLastnameInput.setAttribute('type', 'text')
  formFields.appendChild(formLastnameInput)

  const formEmailLabel = document.createElement('label')
  formEmailLabel.setAttribute('for', 'form__emailInput')
  formEmailLabel.textContent = 'Email'
  formFields.appendChild(formEmailLabel)

  const formEmailInput = document.createElement('input')
  formEmailInput.id = 'form__emailInput'
  formEmailInput.className = 'form__input'
  formEmailInput.setAttribute('name', 'email')
  formEmailInput.setAttribute('type', 'email')
  formFields.appendChild(formEmailInput)

  const formMessageLabel = document.createElement('label')
  formMessageLabel.setAttribute('for', 'form__messageInput')
  formMessageLabel.textContent = 'Message'
  formFields.appendChild(formMessageLabel)

  const formMessageInput = document.createElement('textarea')
  formMessageInput.id = 'form__messageInput'
  formMessageInput.className = 'form__input form__textarea'
  formMessageInput.setAttribute('name', 'message')
  formFields.appendChild(formMessageInput)

  /*//*ok : 
  //~~~ role : button 
  //TODO
    // ~~~ maquette : N°11 - comportement : Envoie le formulaire
    // ~~~ nom accessible : "Send"
    // ~~~ états et propriétés : vide
    */

  //TODO
  /*//~~~ role : button
    // ~~~ maquette : N°12 - comportement : Ferme la modal
    // ~~~ nom accessible : "Close Contact form"
    // ~~~ états et propriétés : vide
    */
}
