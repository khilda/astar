import { onClickBtn } from "./evtButton.js";

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
    const _layer = document.querySelector(".gnb-layer");
    if (_target.classList.contains("is-active")) {
      _target.classList.remove("is-active");
      _layer.classList.remove("is-show");
    } else {
      _target.classList.add("is-active");
      _layer.classList.add("is-show");
    }
  });
};
