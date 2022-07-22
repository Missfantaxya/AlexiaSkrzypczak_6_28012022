/**
 * Affiche la liste des photographes
 * @param {Object[]} photographers Liste des photographes
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer__section');
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(photographerCardDOM);
  });
}
