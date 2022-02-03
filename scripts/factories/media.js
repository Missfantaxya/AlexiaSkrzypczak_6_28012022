function mediaFactory(data) {
  const { date, description, image, likes, photographerId, price, title } = data

  const picture = `assets/photographies/${photographerId}/${image}`

  function getpictureCardDOM() {
    const article = document.createElement("article")

    return pictures
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
