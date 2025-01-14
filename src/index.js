import './style.sass'

import ICON_SUN from '../public/icons/sun.svg'
import ICON_RAIN from '../public/icons/cloud-rain.svg'
import ICON_SNOW from '../public/icons/cloud-snow.svg'

import MP3_RAIN from '../public/sounds/rain.mp3'
import MP3_WINTER from '../public/sounds/winter.mp3'
import MP3_SUMMER from '../public/sounds/summer.mp3'

function title() {
  const h1 = document.createElement('h1')

  h1.classList.add('title')
  h1.textContent = 'Weather Sounds'

  render(h1)
}

function container() {
  const div = document.createElement('div')
  div.classList.add('container')

  render(div)
}

function card(icon, classBG, audio) {
  const container = document.querySelector('.container')
  const div = document.createElement('div')

  div.classList.add('card')
  div.classList.add(classBG)

  div.dataset.audio = audio

  const img = document.createElement('img')

  img.src = icon
  img.alt = 'icon'

  const span = document.createElement('span')

  span.classList.add('volume-value')
  span.textContent = '1'
  span.dataset.volume = audio

  div.appendChild(img)
  div.appendChild(span)

  container.appendChild(div)
}

function value_volume() {
  const input = document.createElement('input')

  input.classList.add('volume')
  input.type = 'range'
  input.min = 0
  input.max = 1
  input.step = 0.1
  input.value = 1

  const div = document.createElement('div')
  div.classList.add('container-volume')

  div.appendChild(input)

  render(div)
}

function render(element) {
  const root = document.getElementById('root')

  root.appendChild(element)
}

const audio_rain = new Audio(MP3_RAIN)
const audio_winter = new Audio(MP3_WINTER)
const audio_summer = new Audio(MP3_SUMMER)

function action() {
  const container = document.querySelector('.container')
  const display_volume = document.querySelectorAll('.volume-value')
  const bg_body = document.querySelector('body')
  let current_audio = null
  let isPlaying = false
  let volume = 1
  let button = null

  document.addEventListener('input', (event) => {
    if (event.target.classList.contains('volume') && current_audio) {
      display_volume.forEach((item) => {
        if (item.dataset.volume === button) {
          item.textContent = event.target.value
        }
      })

      volume = event.target.value
      current_audio.volume = event.target.value
    }
  })

  container.addEventListener('click', (event) => {
    let target = event.target

    if (
      target.tagName.toLowerCase() === 'img' &&
      target.parentElement.dataset.audio
    ) {
      target = target.parentElement
    }

    button = target.dataset.audio
    if (!button) return

    const activeButton = document.querySelector('.active')

    if (!activeButton || activeButton.dataset.audio !== button) {
      if (activeButton) activeButton.classList.remove('active')
      stopAudio()
      target.classList.add('active')
      playNewAudio(button)
      bg_body.classList = `bg-${button}`
      return
    }

    if (current_audio && activeButton === target) {
      togglePlayPause()
    }
  })

  function stopAudio() {
    if (current_audio) {
      current_audio.pause()
      current_audio.currentTime = 0
      isPlaying = false
    }
  }

  function togglePlayPause() {
    if (isPlaying) {
      current_audio.pause()
    } else {
      current_audio.volume = volume
      current_audio.play()
    }
    isPlaying = !isPlaying
  }

  function playNewAudio(button) {
    switch (button) {
      case 'rain':
        current_audio = audio_rain
        break
      case 'winter':
        current_audio = audio_winter
        break
      case 'summer':
        current_audio = audio_summer
        break
      default:
        return
    }

    document.querySelector('.volume').value = current_audio.volume
    current_audio.play()
    isPlaying = true
  }
}

title()
container()
card(ICON_RAIN, 'card-bg-rain', 'rain')
card(ICON_SNOW, 'card-bg-snow', 'winter')
card(ICON_SUN, 'card-bg-summer', 'summer')
value_volume()
action()
