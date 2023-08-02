import { onClickBtn } from "./evtButton.js";


window.addEventListener("DOMContentLoaded", () => {
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
});
