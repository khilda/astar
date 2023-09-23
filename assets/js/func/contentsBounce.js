import { InteractionElement } from "../interactionElement.js";

/**
 * 해당 elements 를 위, 아래로 움직임
 * @param {string} selector - css selectors
 */

export function contentsBounce(...selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    new InteractionElement(element, [
      { type: "translate", start: -12, end: 12, direction: "bottom" },
      { iterations: Infinity, duration: 7000 },
    ]);
  });
}
