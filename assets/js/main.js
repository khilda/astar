import { onClickBtn } from "./evtButton.js";
import { Planet } from "./mPlanetAnimation.js";
import { PageAnimation } from "./scrollAnimation.js";
import { setLogoRollingClone } from "./animation.js";
import { planetRotate } from "./lib/planetRotate.js";
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
  commLayout();
  // gnb-menu link

  onClickBtn(".gnb-menu", (e, _target) => {
    console.log(_target);
    const menu = _target.dataset.link;
    window.location.href = `${window.location.origin}/html/pages/${menu}.html`;
  });

  // setAnimation
  new PageAnimation();
  setLogoRollingClone();
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
planetAnimate();

/**
 * Intro background animation
 */
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

export const introType01 = () => {
  starRotate();
  setTimeout(() => {
    document.querySelector(".container").classList.add("is-animate");
  }, 3000);
};

export const introType02 = () => {
  descAnimation();
  bgAnimation();
  setTimeout(() => {
    document.querySelector(".container").classList.add("is-animate");
  }, 1000);
};
export const commLayout = () => {
  bgAnimation();
  planetRotate();
  setTimeout(() => {
    document.querySelector(".container").classList.add("is-animate");
  }, 2000);
};
export const bgAnimation = () => {
  const _visualCont = document.querySelector(".visual-background");
  const cls = Array.from(_visualCont.classList);
  if (cls.includes("type1")) {
    _visualCont.innerHTML = `<div class="star"></div><div class="star"></div><div class="star"></div>`;
  } else if (cls.includes("type2")) {
    const _wrap = `<div class="origin"><div class="control"><ul class="galaxy"></ul></div></div>`;
    _visualCont.innerHTML = _wrap;
    let star = "";
    for (let i = 0; i <= 200; i++) {
      star += `<li class="star"></li>`;
    }
    _visualCont.querySelector(".galaxy").innerHTML = star;
  }
};
const descAnimation = () => {
  const desc = document.querySelector(".visual-text"); // Find the H2
  if (!desc) return;
  const descText = desc.innerHTML; // Get the content of the H2
  const descArr = descText.split(""); // Split content into array
  desc.innerHTML = ""; // Empty current content

  let span; // Create variables to create elements
  let letter;

  for (let i = 0; i < descArr.length; i++) {
    // Loop for every letter
    span = document.createElement("span"); // Create a <span> element
    letter = document.createTextNode(descArr[i]); // Create the letter
    if (descArr[i] == " ") {
      // If the letter is a space...
      desc.appendChild(letter); // ...Add the space without a span
    } else {
      span.appendChild(letter); // Add the letter to the span
      desc.appendChild(span); // Add the span to the h2
    }
  }
};

/**
 * Main
 */
const fnMain = () => {};
