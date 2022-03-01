// code pour si c'est une vidéo
function videoFactory(data) {
  let { date, description, image, likes, photographerId, price, title } = data

  const picture = `assets/photographies/${photographerId}/${image}`

  const video = document.createElement("object")
  video.className = "media"
  video.setAttribute("type", "video/mp4")
  video.setAttribute("data", picture)
  video.setAttribute("alt", title)
  video.setAttribute("aria-label", description)
  containerMedia.appendChild(video)
}
// se baser sur l'extension
