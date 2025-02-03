import './style.sass'

import ICON_SUN from '../public/icons/sun.svg'
import ICON_RAIN from '../public/icons/cloud-rain.svg'
import ICON_SNOW from '../public/icons/cloud-snow.svg'

import MP3_RAIN from '../public/sounds/rain.mp3'
import MP3_WINTER from '../public/sounds/winter.mp3'
import MP3_SUMMER from '../public/sounds/summer.mp3'

function isHTMLElement(element: EventTarget | null): element is HTMLElement {
  return element instanceof HTMLElement
}

function isHTMLInputElement(
  element: EventTarget | null
): element is HTMLInputElement {
  return element instanceof HTMLInputElement
}

function title(): void {
  const h1: HTMLElement = document.createElement('h1')

  h1.classList.add('title')
  h1.textContent = 'Weather Sounds'

  render(h1)
}

function container(): void {
  const div: HTMLElement = document.createElement('div')
  div.classList.add('container')

  render(div)
}

function card(icon: string, classBG: string, audio: string): void {
  const container: HTMLElement | null = document.querySelector('.container')
  const div: HTMLElement = document.createElement('div')

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

  if (container !== null) {
    container.appendChild(div)
  }
}

function value_volume(): void {
  const input: HTMLInputElement = document.createElement('input')

  input.classList.add('volume')
  input.type = 'range'
  input.min = '0'
  input.max = '1'
  input.step = '0.1'
  input.value = '1'

  const div: HTMLElement = document.createElement('div')
  div.classList.add('container-volume')

  div.appendChild(input)

  render(div)
}

function render(element: HTMLElement): void {
  const root: HTMLElement | null = document.getElementById('root')

  if (root !== null) {
    root.appendChild(element)
  }
}

const audio_rain: HTMLAudioElement = new Audio(MP3_RAIN)
const audio_winter: HTMLAudioElement = new Audio(MP3_WINTER)
const audio_summer: HTMLAudioElement = new Audio(MP3_SUMMER)

function action(): void {
  const container: HTMLElement | null = document.querySelector('.container')
  const display_volume: NodeListOf<HTMLElement> | null =
    document.querySelectorAll('.volume-value')
  const bg_body: HTMLElement | null = document.querySelector('body')
  let current_audio: HTMLAudioElement | null = null
  let isPlaying: boolean = false
  let volume: string = '1'
  let button: string | null = null

  document.addEventListener('input', (event: Event) => {
    const target = event.target

    if (isHTMLInputElement(target)) {
      if (target.classList.contains('volume') && current_audio) {
        display_volume.forEach((item) => {
          if (item.dataset.volume === button) {
            item.textContent = target.value
          }
        })

        volume = target.value
        current_audio.volume = Number(volume)
      }
    }
  })

  if (isHTMLElement(container)) {
    container.addEventListener('click', (event: MouseEvent) => {
      let target = event.target

      if (isHTMLElement(target)) {
        if (
          target.tagName.toLowerCase() === 'img' &&
          target.parentElement?.dataset.audio
        ) {
          target = target.parentElement
        }

        if (isHTMLElement(target)) {
          button = target.dataset.audio!
        }

        if (!button) return

        const activeButton = document.querySelector('.active')

        if (isHTMLElement(activeButton)) {
          if (!activeButton || activeButton.dataset.audio !== button) {
            if (activeButton) activeButton.classList.remove('active')
            stopAudio()

            if (isHTMLElement(target)) {
              target.classList.add('active')
            }
            playNewAudio(button)

            if (bg_body !== null) {
              bg_body.classList.add(`bg-${button}`)
              // bg_body.classList = `bg-${button}`
            }

            return
          }
        }

        if (current_audio && activeButton === target) {
          togglePlayPause()
        }
      }
    })
  }

  function stopAudio(): void {
    if (current_audio) {
      current_audio.pause()
      current_audio.currentTime = 0
      isPlaying = false
    }
  }

  function togglePlayPause(): void {
    if (current_audio) {
      if (isPlaying) {
        current_audio.pause()
      } else {
        current_audio.play()
      }
    }

    isPlaying = !isPlaying
  }

  function playNewAudio(button: string): void {
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

    const volumeElement: HTMLInputElement | null =
      document.querySelector('.volume')
    if (volumeElement) {
      volumeElement.value = String(current_audio.volume)
    }
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
