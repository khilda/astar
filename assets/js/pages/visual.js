import { onClickBtn } from "../func/evtButton.js";
import { btnTopAnimate } from "../func/btnTop.js";
import { MobileDescRotate, VisualRotate } from "../func/planetRotate.js";
import { planetThree } from "../func/planetThree.js";
import { PageAnimation } from "../layout/scrollAnimation.js";

export const fnComm = () => {
  // background
  bgAnimation();
  // full page
  window.pageAnimation = new PageAnimation();
  // visual animation
  visualRotate();
  // common button
  fnGnb();
};
export const visualRotate = () => {
  if (!document.querySelector(".visual-area")) return;
  planetThree();

  const visualRotate = new VisualRotate();

  const mDesc = new MobileDescRotate();
  mDesc.init();

  onClickBtn(".v-prev .btn-link", (e, _target) => {
    mDesc.moveToDir("prev");
  });
  onClickBtn(".v-next .btn-link", (e, _target) => {
    mDesc.moveToDir("next");
  });

  document.querySelector(".v-desc")?.addEventListener("click", (e) => {
    window.pageAnimation.scrollToSection(
      document.querySelector(".container > .w-section")
    );
  });
};

/**
 * background animation
 */
export const bgAnimation = () => {
  const _visualCont = document.querySelector(".visual-background");
  if (!_visualCont) return;

  const _wrap = `<div class="origin"><div class="control"><ul class="galaxy"></ul></div></div>`;
  _visualCont.innerHTML = _wrap;
  let star = "";
  for (let i = 0; i <= 200; i++) {
    star += `<li class="star"></li>`;
  }
  _visualCont.querySelector(".galaxy").innerHTML = star;
};

/**
 * GNB button
 */
const fnGnb = () => {
  onClickBtn(".gnb-toggle-btn", (e, _target) => {
    const _header = document.querySelector(".header");
    if (_target.classList.contains("is-active")) {
      _target.classList.remove("is-active");
      _header.classList.remove("is-show");
    } else {
      _target.classList.add("is-active");
      _header.classList.add("is-show");
    }
  });
  onClickBtn(".gnb-menu", (e, _target) => {
    console.log(_target);
    const menu = _target.dataset.link;
    window.location.href = `${window.location.origin}/html/pages/${menu}.html`;
  });
  btnTopAnimate();
};
