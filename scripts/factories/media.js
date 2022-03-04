function mediaFactory(data) {
  let { date, description, image, video, likes, photographerId, price, title } =
    data

  const picture = `assets/photographies/${photographerId}/${image}`

  const videoThumbnail = `assets/thumbnails/${title}.png`

  const videoMedia = `assets/photographies/${photographerId}/${video}`

  // TODO afficher le coeur différement pour pouvoir changer la couleur
  const heartSvg = "assets/icons/heart-solid.svg"

  function getpictureCardDOM() {
    const article = document.createElement("article")
    article.className = "photographie"

    if (data.hasOwnProperty("image")) {
      const img = document.createElement("img")
      img.className = "media"
      img.setAttribute("src", picture)
      img.setAttribute("alt", title)
      img.setAttribute("aria-label", description)
      article.appendChild(img)
    } else if (data.hasOwnProperty("video")) {
      // TODO effacer les thumbnails.
      const thumbnail = document.createElement("video")
      thumbnail.className = "media"
      thumbnail.setAttribute("src", videoMedia)
      thumbnail.setAttribute("type", "video/mp4")
      thumbnail.setAttribute("alt", title)

      thumbnail.setAttribute("aria-label", description)
      article.appendChild(thumbnail)
    }

    const media = article.querySelector(".media")
    // console.log("media :", media) //*ok
    media.addEventListener("click", function () {
      console.log("click on media")
      //factory à faire
      // itération sur tous les média avec navigation gche/droite
      // cf Graphikart Lightbox
    })

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
      const allLikes = document.querySelector(".photographerLike")
      // console.log("allLikes :", allLikes) //*ok
      // console.log("allLikes.innerHTML : ", allLikes.innerHTML) //*ok
      var allLikesValueNumber = parseInt(allLikes.innerHTML, 10)
      ++allLikesValueNumber
      // console.log("allLikesValueNumber :", allLikesValueNumber) //*ok
      allLikes.innerHTML = ""
      allLikes.innerHTML = allLikesValueNumber
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
