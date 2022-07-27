/* eslint-disable no-unused-vars */
function modalDOM(data) {
  // ----- construction du DOM -----
  const modalContact = document.getElementById('contact__modal');
  modalContact.setAttribute('role', 'dialog');
  modalContact.setAttribute('aria-labelledby', 'modal__title');

  const modal = document.querySelector('.modal');
  const modalHeader = modal.firstElementChild;
  modalHeader.className = 'modal__header';

  const OriginalModalTitle = modalHeader.firstElementChild;
  const modalTitle = document.createElement('h1');
  modalTitle.textContent = 'Contactez-moi';
  modalTitle.className = 'modal__title';
  modalTitle.id = 'modal__title';
  OriginalModalTitle.replaceWith(modalTitle);

  const modalPhotographerName = document.createElement('div');
  modalPhotographerName.className = 'modal__photographerName';
  modalPhotographerName.textContent = data[0].name;
  modalTitle.appendChild(modalPhotographerName);

  const closeModal = document.createElement('button');
  closeModal.className = 'modal__close';
  closeModal.ariaLabel = 'Close Contact form';
  closeModal.setAttribute('type', 'button');
  closeModal.setAttribute('onClick', 'closeModal()');
  modalHeader.before(closeModal);

  const closeModalImg = modalHeader.lastElementChild;

  closeModalImg.removeAttribute('onClick');
  closeModal.appendChild(closeModalImg);

  const form = document.querySelector('div.modal form');
  form.className = 'contact__form';
  const formFields = form.firstElementChild;

  const formLastnameLabel = document.createElement('label');
  formLastnameLabel.setAttribute('for', 'form__lastnameInput');
  formLastnameLabel.textContent = 'Nom';
  formFields.appendChild(formLastnameLabel);

  const formLastnameInput = document.createElement('input');
  formLastnameInput.id = 'form__lastnameInput';
  formLastnameInput.className = 'form__input';
  formLastnameInput.setAttribute('name', 'lastname');
  formLastnameInput.setAttribute('type', 'text');
  formFields.appendChild(formLastnameInput);

  const formEmailLabel = document.createElement('label');
  formEmailLabel.setAttribute('for', 'form__emailInput');
  formEmailLabel.textContent = 'Email';
  formFields.appendChild(formEmailLabel);

  const formEmailInput = document.createElement('input');
  formEmailInput.id = 'form__emailInput';
  formEmailInput.className = 'form__input';
  formEmailInput.setAttribute('name', 'email');
  formEmailInput.setAttribute('type', 'email');
  formFields.appendChild(formEmailInput);

  const formMessageLabel = document.createElement('label');
  formMessageLabel.className = 'form__messageLabel';
  formMessageLabel.setAttribute('for', 'form__messageInput');
  formMessageLabel.textContent = 'Votre message';
  formFields.appendChild(formMessageLabel);

  const formMessageInput = document.createElement('textarea');
  formMessageInput.id = 'form__messageInput';
  formMessageInput.className = 'form__input form__textarea';
  formMessageInput.setAttribute('name', 'message');
  formFields.appendChild(formMessageInput);

  const modalSubmit = form.querySelector('.contact__button');
  modalSubmit.setAttribute('type', 'submit');
  modalSubmit.classList.add('modal__submit');
}
