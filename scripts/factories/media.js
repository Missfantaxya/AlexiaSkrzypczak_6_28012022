//TODO vérifier car les data sont undéfined

function mediaFactory(data) {
  const { date, description, image, likes, photographerId, price, title } = data
  // TODO voir pour ne l'appliquer qu'à un indice

  // TODO voir pour les mp4
  const picture = `assets/photographies/${photographerId}/${image}.jpg`

  const heartSvg = "assets/icons/heart-solid.svg"

  function getpictureCardDOM() {
    const article = document.createElement("article")
    article.className = "photographie"

    const img = document.createElement("img")
    img.className = "picture"
    img.setAttribute("src", picture)
    img.setAttribute("alt", title)
    img.setAttribute("aria-label", description)
    article.appendChild(img)

    const pictureDetails = document.createElement("div")
    pictureDetails.className = "pictureDetails"
    article.appendChild(pictureDetails)

    const pictureName = document.createElement("h2")
    pictureName.className = "pictureName"
    pictureName.textContent = title
    pictureDetails.appendChild(pictureName)

    const contenairLikes = document.createElement("div")
    contenairLikes.className = "contenairLikes"
    pictureDetails.appendChild(contenairLikes)

    const pictureLikes = document.createElement("p")
    pictureLikes.className = "pictureLikes"
    pictureLikes.textContent = likes
    contenairLikes.appendChild(pictureLikes)

    const heart = document.createElement("img")
    heart.className = "heart"
    heart.setAttribute("src", heartSvg)
    contenairLikes.appendChild(heart)

    return article
  }
  return {
    date,
    description,
    image,
    likes,
    photographerId,
    price,
    title,
    getpictureCardDOM,
  }
}
