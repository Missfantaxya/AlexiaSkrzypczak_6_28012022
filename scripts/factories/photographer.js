/**
 * @param {object} data
 * @returns
 */
function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price, id } = data
  const avatar = `assets/photographers/${portrait}`
  /**
   * Construction du DOM pour les détails d'un photogarphe sur la page d'accueil
   * @returns {HTMLelement}
   */
  function getPhotographerCardDOM() {
    const photographerArticle = document.createElement('article')
    photographerArticle.className = 'photographer__article'
    photographerArticle.setAttribute(
      'aria-description',
      'détails du photographe'
    )
    const photographerLink = document.createElement('a')
    photographerLink.setAttribute('href', `photographer.html?id=${id}`)
    photographerLink.className = 'photographer__link'
    photographerLink.setAttribute('aria-label', name)

    const photographerAvatar = document.createElement('img')
    photographerAvatar.setAttribute('src', avatar)
    photographerAvatar.className = 'photographer__avatar'
    photographerAvatar.setAttribute('alt', '')

    const photographerName = document.createElement('h2')
    photographerName.className = 'photographer__name'
    const photographerDetails = document.createElement('p')
    photographerDetails.className = 'photographer__details'
    const photographerLocation = document.createElement('p')
    photographerLocation.className = 'photographer__location'
    photographerLocation.setAttribute(
      'aria-description',
      `localisation du photographe ${name}`
    )
    const photographerSlogan = document.createElement('p')
    photographerSlogan.className = 'photographer__slogan'
    photographerSlogan.setAttribute(
      'aria-description',
      `phrase d'accroche du photographe ${name}`
    )
    const photographerPrice = document.createElement('p')
    photographerPrice.className = 'photographer__price'
    photographerPrice.setAttribute(
      'aria-description',
      `tarifs du photographe ${name}`
    )

    photographerName.textContent = name
    photographerArticle.appendChild(photographerLink)
    photographerLink.appendChild(photographerAvatar)
    photographerLink.appendChild(photographerName)
    photographerLocation.textContent = city + ', ' + country
    photographerSlogan.textContent = tagline
    photographerPrice.textContent = price + '€/jour'
    photographerArticle.appendChild(photographerDetails)
    photographerDetails.appendChild(photographerLocation)
    photographerDetails.appendChild(photographerSlogan)
    photographerDetails.appendChild(photographerPrice)
    return photographerArticle
  }

  /**
   * Construction du DOM pour les détails d'un photographe sur sa page
   * @returns {HTMLElement}
   */
  function getPhotographProfilDOM() {
    const photographerDetails = document.createElement('div')
    photographerDetails.className = 'photographerDetails'

    const photographerName = document.createElement('h1')
    photographerName.className = 'photographerName'
    photographerName.setAttribute('aria-description', 'nom du photographe')
    photographerName.textContent = data[0].name
    photographerDetails.appendChild(photographerName)

    const photographerContent = document.createElement('div')
    photographerContent.className = 'photographerContent'
    photographerDetails.appendChild(photographerContent)

    const photographerLocation = document.createElement('p')
    photographerLocation.className = 'photographerLocation'
    photographerLocation.setAttribute(
      'aria-description',
      'localisation du photographe'
    )
    photographerLocation.textContent = data[0].city + ', ' + data[0].country
    photographerContent.appendChild(photographerLocation)

    const photographerTagline = document.createElement('p')
    photographerTagline.className = 'photographerTagline'
    photographerTagline.setAttribute(
      'aria-description',
      "phrase d'accroche du photographe"
    )
    photographerTagline.textContent = data[0].tagline
    photographerContent.appendChild(photographerTagline)

    return photographerDetails
  }

  function getUserAvatarDOM() {
    const avatar = `assets/photographers/${data[0].portrait}`
    const photographerAvatar = document.createElement('img')
    photographerAvatar.className = 'photographerAvatar'
    photographerAvatar.setAttribute('src', avatar)
    photographerAvatar.setAttribute('alt', data[0].name)

    return photographerAvatar
  }

  return {
    name,
    portrait,
    country,
    city,
    tagline,
    price,
    id,
    getPhotographerCardDOM,
    getPhotographProfilDOM,
    getUserAvatarDOM,
  }
}
