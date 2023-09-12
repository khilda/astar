import { contentsBounce } from "../func/contentsBounce.js";
import { InteractionElement } from './../interactionElement.js'

export const fnCompany = () => {
  if (!document.querySelector(".container.company")) return;
  fnJoinGroup()
  contentsBounce('.join-group');
};

function fnJoinGroup() {
  const joinGroups = document.querySelectorAll('.join-group');
  joinGroups.forEach(joinGroup => {
    const logo = joinGroup.querySelector('.img-logo'),
          title = joinGroup.querySelector('.join-title');
    new InteractionElement(
      joinGroup,
      [{ type: 'translate', start: -4, end: [0, 4], diraction: 'bottom' }, { iterations: Infinity }],
      [{ type: 'scale', start: 0.95, end: 1 }, { iterations: Infinity, duration: 3000 }],
    )
    new InteractionElement(
      logo,
      [{ type: 'translate', start: 0, end: 8, direction: 'top' }, { iterations: Infinity }],
      [{ type: 'opacity', start: 0.8, end: 1 }, { iterations: Infinity }],
    )
    new InteractionElement(
      title,
      [{ type: 'translate', start: 0, end: 8, direction: 'bottom' }, { iterations: Infinity }],
      [{ type: 'rotate', srat: -2, end: 2 }, { iterations: Infinity }],
    )
  })
}
