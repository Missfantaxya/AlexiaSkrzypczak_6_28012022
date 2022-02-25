function mediaFactory(data) {
  let { date, description, image, likes, photographerId, price, title } = data

  const picture = `assets/photographies/${photographerId}/${image}`
  // TODO afficher le coeur différement pour pouvoirchanger la couleur
  const heartSvg = "assets/icons/heart-solid.svg"

  function getpictureCardDOM() {
    const article = document.createElement("article")
    article.className = "photographie"

    const containerMedia = document.createElement("div")
    containerMedia.className = "containerMedia"
    article.appendChild(containerMedia)

    // TODO utiliser de factory si video ou si photo

    // du cours :
    // class MoviesFactory {
    //   constructor(data, type) {
    //     // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
    //     if (type === "oldApi") {
    //       return new OldMovie(data)
    //       // Sinon retourne-moi le nouveau formatage
    //     } else if (type === "newApi") {
    //       return new Movie(data)
    //       // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
    //     } else {
    //       throw "Unknown type format"
    //     }
    //   }
    // }

    const img = document.createElement("img")
    img.className = "img"
    img.setAttribute("src", picture)
    img.setAttribute("alt", title)
    img.setAttribute("aria-label", description)
    containerMedia.appendChild(img)

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

    //incrémentations au click des likes des medias
    contenairLikes.addEventListener("click", function () {
      pictureLikes.textContent = ++likes
    })

    const heartmedia = document.createElement("img")
    heartmedia.className = "heart"
    heartmedia.setAttribute("src", heartSvg)
    contenairLikes.appendChild(heartmedia)

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
