import { onClickBtn } from "./evtButton.js";
// page
import { fnVisual } from "./pages/visual.js";
import { fnIntro } from "./pages/intro.js";
import { fnMain } from "./pages/main.js";
import { fnBusiness } from "./pages/business.js";

window.addEventListener("DOMContentLoaded", () => {
  fnVisual();
  const _container = document.querySelector(".container");
  if (_container.classList.contains("intro")) {
    fnComm();
  }
  // content
  fnIntro();
  fnMain();
  fnBusiness();
});

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
  onClickBtn(".gnb-menu", (e, _target) => {
    console.log(_target);
    const menu = _target.dataset.link;
    window.location.href = `${window.location.origin}/html/pages/${menu}.html`;
  });
};
