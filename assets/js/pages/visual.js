import { onClickBtn } from "./../evtButton.js";
import { Planet } from "./../mPlanetAnimation.js";
import { PageAnimation } from "./../scrollAnimation.js";
import { planetRotate } from "./../lib/planetRotate.js";

export const fnVisual = () => {
  bgAnimation();
  window.pageAnimation = new PageAnimation();
  planetRotate();
  planetAnimate();
  clickDesc();
};

const planetAnimate = () => {
  if (!document.querySelector(".visual-area")) return;

  const planet = new Planet();
  planet.init();
  onClickBtn(".v-prev .btn-link", (e, _target) => {
    planet.moveToDir("prev");
  });
  onClickBtn(".v-next .btn-link", (e, _target) => {
    planet.moveToDir("next");
  });
};

/**
 * background animation
 */
export const bgAnimation = () => {
  const _visualCont = document.querySelector(".visual-background");
  const cls = Array.from(_visualCont.classList);
  const _wrap = `<div class="origin"><div class="control"><ul class="galaxy"></ul></div></div>`;
  _visualCont.innerHTML = _wrap;
  let star = "";
  for (let i = 0; i <= 200; i++) {
    star += `<li class="star"></li>`;
  }
  _visualCont.querySelector(".galaxy").innerHTML = star;
};

const clickDesc = () => {
  document.querySelector(".v-desc")?.addEventListener("click", (e) => {
    window.pageAnimation.scrollToSection(document.querySelector(".container > .w-section"));
  });
};
