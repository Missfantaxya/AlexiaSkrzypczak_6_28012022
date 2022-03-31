function mediaFactory(data) {
  let {
    id,
    date,
    description,
    image,
    video,
    likes,
    photographerId,
    price,
    title,
  } = data

  const picture = `assets/photographies/${photographerId}/${image}`

  const videoMedia = `assets/photographies/${photographerId}/${video}`

  // TODO afficher le coeur différement pour pouvoir changer la couleur
  const heartSvg = "assets/icons/heart-solid.svg"

  function getpictureCardDOM() {
    const article = document.createElement("a")
    article.className = "photographie"

    if (data.hasOwnProperty("image")) {
      article.setAttribute("href", picture)
      const img = document.createElement("img")
      img.className = "media"
      img.setAttribute("src", picture)
      img.setAttribute("alt", title)
      img.setAttribute("aria-label", description)
      article.appendChild(img)
    } else if (data.hasOwnProperty("video")) {
      article.setAttribute("href", videoMedia)
      const thumbnail = document.createElement("video")
      thumbnail.className = "media"
      thumbnail.setAttribute("src", videoMedia)
      thumbnail.setAttribute("type", "video/mp4")
      thumbnail.setAttribute("alt", title)

      thumbnail.setAttribute("aria-label", description)
      article.appendChild(thumbnail)
    }

    // const medio = article.querySelector(".media")
    // console.log("medio :", medio) //*ok
    // medio.addEventListener("click", function () {
    //   lightbox.style.display = "block"
    //! appeler la modal avec ;l'id en paramètre
    //   console.log(data)
    //   const main = document.querySelector("#main")
    // console.log(main)//*ok
    //   main.style.display = "none"
    // console.log("ouverture de la lightbox") //*ok
    // console.log("click on media")//* ok
    // console.log(title) // *ok
    //   console.log(id) // *ok
    //   TestId(id) // *ok s'en servir
    // TODO factory à faire
    // TODO itération sur tous les média avec navigation gche/droite
    // })

    // cf Graphikart Lightbox pause à 34:24
    /**
     * @property {HTMLElement} element
     */
    // TODO ATTENTION la lightbox se créer plusieur fois
    class Lightbox {
      static init() {
        const media = main.querySelectorAll(".photographie")
        console.log("media", media) //* ok
        media.forEach((media) =>
          media.addEventListener("click", (e) => {
            e.preventDefault()
            // console.log(e.currentTarget.getAttribute("href")) //*ok
            new Lightbox(e.currentTarget.getAttribute("href"))
          })
        )
      }

      /**
       * @param {string} url URL de l'image
       */
      constructor(url) {
        const body = document.querySelector("body")
        // console.log("body : ", body) //* ok
        const element = this.buildDom(url)
        // console.log("element :", element) //*ok
        body.appendChild(element)
      }

      // TODO ok mais n'en ferme qu'une à la fois et il y a plusieurs lightbox
      /**
       * Ferme le lightbox
       * @param {MouseEvent} e
       */
      close(e) {
        event.preventDefault()
        // console.log("close => this : ", this) //* lightbox objet
        // console.log("close => element : ", element) //! error is not defined
        // console.log("close => this.element : ", this.element) //! undefioned
        const element = document.querySelector(".lightbox")
        // console.log("close => element : ", element) //* ok
        element.classList.add("fadeOut")
        window.setTimeout(() => {
          element.parentElement.removeChild(element)
        }, 500)
      }

      /**
       * @param {string} url URL de l'image
       * @return {HTMLelement}
       */
      buildDom(url) {
        const dom = document.createElement("div")
        dom.className = "lightbox"
        dom.innerHTML = `<div class="lightbox__wrapper">
        <button class="lightbox__close">
          Fermer
          <img
            class="lightbox__cross"
            src="assets/images/cross.svg"
            alt="chevron vers la droite"
          />
        </button>
        <button class="lightbox__prev">
          précédent
          <img
            class="lightbox__arrow lightbox__arrow--prev"
            src="assets/images/arrow.svg"
            alt="chevron vers la gauche"
          />
        </button>
        <div class="lightbox__container">
          <img
            src="${url}"
            // TODO mettre un alt
            alt=""
          />
           // TODO mettre le titre
          <p class="lightbox__title">Arc-en-ciel</p>
        </div>
        <button class="lightbox__next">
          suivant
          <img
            class="lightbox__arrow lightbox__arrow--next"
            src="assets/images/arrow.svg"
            alt="chevron vers la droite"
          />
        </button>`
        dom
          .querySelector(".lightbox__close")
          .addEventListener("click", this.close.bind(this))
        return dom
      }
    }

    Lightbox.init()

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

  // function getMediaCarousel() {
  //   const oneMediaCarousel = document.createElement("li")
  //   oneMediaCarousel.className = "oneMediaCarousel"

  //   if (data.hasOwnProperty("image")) {
  //     const imgCarousel = document.createElement("img")
  //     imgCarousel.className = "mediaCarousel"
  //     imgCarousel.setAttribute("src", picture)
  //     imgCarousel.setAttribute("alt", title)
  //     imgCarousel.setAttribute("aria-label", description)
  //     oneMediaCarousel.appendChild(imgCarousel)
  //   } else if (data.hasOwnProperty("video")) {
  //     const videoCarousel = document.createElement("video")
  //     videoCarousel.className = "mediaCarousel"
  //     videoCarousel.setAttribute("src", videoMedia)
  //     videoCarousel.setAttribute("type", "video/mp4")
  //     videoCarousel.setAttribute("alt", title)
  //     // TODO ajouter la lecture automatique quand visible
  //     videoCarousel.setAttribute("aria-label", description)
  //     oneMediaCarousel.appendChild(videoCarousel)
  //   }

  //   const mediaName = document.createElement("p")
  //   mediaName.className = "mediaName"
  //   mediaName.textContent = title
  //   oneMediaCarousel.appendChild(mediaName)

  //   return oneMediaCarousel
  // }

  return {
    id,
    date,
    description,
    image,
    likes,
    photographerId,
    price,
    title,
    getpictureCardDOM,
    // getMediaCarousel,
  }
}
