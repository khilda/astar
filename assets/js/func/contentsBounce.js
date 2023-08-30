import { AAni } from '../interactionElement.js'

export function contentsBounce(...selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    new AAni(
      element,
      [{ type: 'translate', start: -12, end: 12, direction: 'bottom' }, { iterations: Infinity, duration: 7000 }],
      [{ type: 'opacity', start: 0.8, end: 1 }, { iterations: Infinity }],
    )
  })
} 