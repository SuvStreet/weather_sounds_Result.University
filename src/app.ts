import './style.sass'

function title(): void {
  const h1: HTMLElement = document.createElement('h1')

  h1.classList.add('title')
  h1.textContent = 'Weather Sounds'

  render(h1)
}

function render(element: HTMLElement): void {
  const root: HTMLElement | null = document.getElementById('root')

  if (root !== null) {
    root.appendChild(element)
  }
}

title()
