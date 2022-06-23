function modalDOM(data) {
  //----- construction du DOM -----
  // TODO vérifier avec la maquette la sémantique
  /*// ~~~ maquette : N°1 - comportement : s'ouvre quand l'utilisateur clique sur "Contactez-moi"
    // ~~~ nom accessible : "Contact me Mimi Keel" (labelledby 2)
    // ~~~ états et propriétés : aria-labbelledby (pointe vers l'id 2)
    */
  const modal = document.querySelector('.modal')
  const modalHeader = modal.firstElementChild
  modalHeader.className = 'modal__header'
  const modalTitle = modalHeader.firstElementChild
  /*//~~~ role : Heading (h1)
  // ~~~ maquette : N°2 - comportement : Text statique
    // ~~~ nom accessible : vide
    // ~~~ états et propriétés : vide
    */

  // TODO h1 car h2 dans HTML
  modalTitle.className = 'modal__title'
  const modalDetails = document.createElement('div')
  modalDetails.className = 'modal__details'
  modalHeader.insertBefore(modalDetails, modalTitle)
  modalDetails.appendChild(modalTitle)
  const modalPhotographerName = document.createElement('p')
  modalPhotographerName.className = 'modal__photographerName'
  modalPhotographerName.textContent = data[0].name
  modalDetails.appendChild(modalPhotographerName)

  const form = document.querySelector('div.modal form')
  form.className = 'contact__form'
  const formFields = form.firstElementChild
  /*// ~~~ maquette : N°3 - comportement : Label de l'input prénom
    // ~~~ nom accessible : vide
    // ~~~ états et propriétés : vide
    */
  const formFirstnameLabel = formFields.firstElementChild
  formFirstnameLabel.setAttribute('for', 'form__firstnameInput')
  /*//~~~ role : text field
    // ~~~ maquette : N°4 - comportement : Input Prénom
    // ~~~ nom accessible : "Fisrt name"(labelledby 3)
    // ~~~ états et propriétés : vide
    */
  const formFirstnameInput = formFirstnameLabel.nextElementSibling
  formFirstnameInput.id = 'form__firstnameInput'
  formFirstnameInput.className = 'form__input'
  formFirstnameInput.setAttribute('name', 'firstname')
  formFirstnameInput.setAttribute('type', 'text')

  /*// ~~~ maquette : N°5 - comportement : Label de l'input Nom
    // ~~~ nom accessible : vide
    // ~~~ états et propriétés : vide
    */
  const formLastnameLabel = document.createElement('label')
  formLastnameLabel.setAttribute('for', 'form__lastnameInput')
  formLastnameLabel.textContent = 'Nom'
  formFields.appendChild(formLastnameLabel)
  /*//~~~ role : text field
    // ~~~ maquette : N°6 - comportement : Input Nom
    // ~~~ nom accessible : "Last name"(labelledby 5)
    // ~~~ états et propriétés : vide
    */
  const formLastnameInput = document.createElement('input')
  formLastnameInput.id = 'form__lastnameInput'
  formLastnameInput.className = 'form__input'
  formLastnameInput.setAttribute('name', 'lastname')
  formLastnameInput.setAttribute('type', 'text')
  formFields.appendChild(formLastnameInput)

  /*// ~~~ maquette : N°7 - comportement : Label de l'input Email
    // ~~~ nom accessible : vide
    // ~~~ états et propriétés : vide
    */
  const formEmailLabel = document.createElement('label')
  formEmailLabel.setAttribute('for', 'form__emailInput')
  formEmailLabel.textContent = 'Email'
  formFields.appendChild(formEmailLabel)
  /*//~~~ role : text field
    // ~~~ maquette : N°8 - comportement : Input de l'Email
    // ~~~ nom accessible : "Email"(labelledby 7)
    // ~~~ états et propriétés : vide
    */
  const formEmailInput = document.createElement('input')
  formEmailInput.id = 'form__emailInput'
  formEmailInput.className = 'form__input'
  formEmailInput.setAttribute('name', 'email')
  formEmailInput.setAttribute('type', 'email')
  formFields.appendChild(formEmailInput)

  /*// ~~~ maquette : N°9 - comportement : Label de l'input Votre message
    // ~~~ nom accessible : vide
    // ~~~ états et propriétés : vide
    */
  const formMessageLabel = document.createElement('label')
  formMessageLabel.setAttribute('for', 'form__messageInput')
  formMessageLabel.textContent = 'Message'
  formFields.appendChild(formMessageLabel)
  /*//~~~ role : text field
    // ~~~ maquette : N°10 - comportement : Input du message
    // ~~~ nom accessible : "Your message"(labelledby 9)
    // ~~~ états et propriétés : vide
    */
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
