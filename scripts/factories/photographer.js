function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement("article")
    const link = document.createElement("a")
    link.setAttribute("href", "/photographer.html")
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
  return { name, portrait, country, city, tagline, price, getUserCardDOM }
}
