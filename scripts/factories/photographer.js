function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`
  const avatar = `assets/photographers/${data[0].portrait}`

  function getUserCardDOM() {
    // console.log(id)  //*ok
    const article = document.createElement("article")
    const link = document.createElement("a")
    link.setAttribute("href", `/photographer.html?id=${id}`)
    link.setAttribute("aria-label", name)
    // TODO changer pour la photo choisi par le photographe
    const img = document.createElement("img")
    img.setAttribute("src", picture)
    img.setAttribute("alt", " ")
    const h2 = document.createElement("h2")
    const details = document.createElement("p")
    details.className = "details"
    const location = document.createElement("p")
    location.className = "location"
    const slogan = document.createElement("p")
    slogan.className = "slogan"
    const prices = document.createElement("p")
    prices.className = "prices"

    h2.textContent = name
    article.appendChild(link)
    link.appendChild(img)
    link.appendChild(h2)
    location.textContent = city + ", " + country
    slogan.textContent = tagline
    prices.textContent = price + "€/jour"
    article.appendChild(details)
    details.appendChild(location)
    details.appendChild(slogan)
    details.appendChild(prices)
    return article
  }

  function getUserProfilDOM() {
    // console.log("name :", data[0].name) //*ok

    const photographerDetails = document.createElement("div")
    photographerDetails.className = "photographerDetails"

    const photographerName = document.createElement("h1")
    photographerName.className = "photographerName"
    photographerName.textContent = data[0].name
    photographerDetails.appendChild(photographerName)

    const photographerContent = document.createElement("div")
    photographerContent.className = "photographerContent"
    photographerDetails.appendChild(photographerContent)

    const photographerLocation = document.createElement("p")
    photographerLocation.className = "photographerLocation"
    photographerLocation.textContent = data[0].city + "," + data[0].country
    photographerContent.appendChild(photographerLocation)

    const photographerTagline = document.createElement("p")
    photographerTagline.className = "photographerTagline"
    photographerTagline.textContent = data[0].tagline
    photographerContent.appendChild(photographerTagline)

    return photographerDetails
  }

  function getUserAvatarDOM() {
    const photographerAvatar = document.createElement("img")
    photographerAvatar.className = "photographerAvatar"
    photographerAvatar.setAttribute("src", avatar)
    photographerAvatar.setAttribute("alt", " ")

    return photographerAvatar
  }

  //TODO ajjout du tarif et des likes en bas de page

  return {
    name,
    portrait,
    country,
    city,
    tagline,
    price,
    id,
    getUserCardDOM,
    getUserProfilDOM,
    getUserAvatarDOM,
  }
}
