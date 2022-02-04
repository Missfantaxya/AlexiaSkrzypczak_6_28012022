function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`

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
    const photographerDetails = document.createElement("div")
    photographerDetails.className = "photographerDetails"

    const photographerName = document.createElement("h1")
    photographerName.className = "photographerName"
    photographerName.textContent = "Nom"
    photographerDetails.appendChild(photographerName)

    return photographerDetails
  }
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
  }
}
