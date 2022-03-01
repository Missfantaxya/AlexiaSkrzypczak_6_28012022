// code pour si c'est une photo
function photographiesFactory(data) {
  let { date, description, image, likes, photographerId, price, title } = data

  const picture = `assets/photographies/${photographerId}/${image}`

  const img = document.createElement("img")
  img.className = "media"
  img.setAttribute("src", picture)
  img.setAttribute("alt", title)
  img.setAttribute("aria-label", description)
  containerMedia.appendChild(img)
}
