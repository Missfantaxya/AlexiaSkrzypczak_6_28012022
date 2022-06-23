function mediaMovie(data, mediaLink) {
  const videoMedia = `assets/photographies/${data.photographerId}/${data.video}`
  mediaLink.setAttribute('href', videoMedia)
  const mediaDecsription = document.createElement('p')
  mediaDecsription.id = `mediaDecsription${data.id}`
  mediaDecsription.className = 'mediaDecsription'
  mediaDecsription.textContent = data.description
  mediaLink.appendChild(mediaDecsription)
  const thumbnail = document.createElement('video')
  thumbnail.className = 'media'
  thumbnail.id = `media${data.id}`
  thumbnail.setAttribute('src', videoMedia)
  thumbnail.setAttribute('type', 'video/mp4')
  thumbnail.setAttribute('alt', data.title)
  thumbnail.setAttribute('aria-describedby', mediaDecsription.id)
  mediaLink.appendChild(thumbnail)
}
