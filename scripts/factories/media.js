function mediaFactory(data) {
  let { date, description, image, video, likes, photographerId, price, title } =
    data

  // console.log("data : ", data) //*ok

  const picture = `assets/photographies/${photographerId}/${image}`

  const videoThumbnail = `assets/thumbnails/${title}.png`
  console.log("videoThumbnail : ", videoThumbnail)

  // TODO afficher le coeur différement pour pouvoir changer la couleur
  const heartSvg = "assets/icons/heart-solid.svg"

  function getpictureCardDOM() {
    const article = document.createElement("article")
    article.className = "photographie"

    const containerMedia = document.createElement("div")
    containerMedia.className = "containerMedia"
    article.appendChild(containerMedia)

    // TODO afficher miniature de la video
    if (data.hasOwnProperty("image")) {
      console.log("picture :", picture) //*ok
      console.log("video :", video) //*okdata.keys()

      const img = document.createElement("img")
      img.className = "media"
      img.setAttribute("src", picture)
      img.setAttribute("alt", title)
      img.setAttribute("aria-label", description)
      containerMedia.appendChild(img)
    } else if (data.hasOwnProperty("video")) {
      const thumbnail = document.createElement("img")
      thumbnail.className = "media"
      thumbnail.setAttribute("src", videoThumbnail)
      thumbnail.setAttribute("alt", title)
      thumbnail.setAttribute("aria-label", description)
      containerMedia.appendChild(thumbnail)
    }

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
