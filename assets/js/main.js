import { onClickBtn } from "./evtButton.js";
import { Planet } from "./mPlanetAnimation.js";

window.addEventListener("DOMContentLoaded", () => {
  const _container = document.querySelector(".container");
  if (_container.classList.contains("intro")) {
    fnIntro();
  } else {
    fnComm();
  }
});

const fnIntro = () => {
  onClickBtn(".intro-link", (e, _target) => {
    window.location.href = `${window.location.origin}/html/layout.html`;
  });
};

const fnComm = () => {
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

  // gnb-menu link

  onClickBtn(".gnb-menu", (e, _target) => {
    console.log(_target);
    const menu = _target.dataset.link;
    window.location.href = `${window.location.origin}/html/pages/${menu}.html`;
  });
};

const fnMobile = () => {};
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
planetAnimate();

export const animateionIntro = () => {
  starRotate();
  setTimeout(() => {
    document.querySelector(".container").classList.add("is-animate");
  }, 3000);
};
const starRotate = () => {
  const _visualCont = document.querySelector(".visual-background.type2");
  const _wrap = `<div class="origin"><div class="control"><ul class="galaxy"></ul></div></div>`;

  _visualCont.innerHTML = _wrap;
  let star = "";
  for (let i = 0; i <= 200; i++) {
    star += `<li class="star"></li>`;
  }
  _visualCont.querySelector(".galaxy").innerHTML = star;
};
