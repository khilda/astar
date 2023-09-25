import { onClickBtn } from "../func/evtButton.js";
import { btnTopAnimate } from "../func/btnTop.js";
import { clickHeaderLogo } from "../func/clickHeaderLogo.js";
import { MobileDescRotate, VisualRotate } from "../func/planetRotate.js";
import { planetThree, PlanetsThree } from "../func/planetThree.js";
import { fetchPage } from "../func/fetchPage.js";
import { PageAnimation } from "../layout/scrollAnimation.js";

export const fnComm = () => {
  // background
  bgAnimation();
  // full page
  window.pageAnimation = new PageAnimation();
  // visual animation
  const classesRotate = visualRotate();
  // common button
  fnGnb(classesRotate);

  clickHeaderLogo();
};
export const visualRotate = () => {
  if (!document.querySelector(".visual-area")) return;
  // if (window.location.href.split("/").at(-1) === "spa.html") {
  //   const a = new PlanetsThree();
  //   a.start();
  // } else {
  //   planetThree();
  // }

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

  return { visualRotate, mDesc };
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
function gnbInteraction(_target) {
  const _header = document.querySelector(".header");
  if (_target.classList.contains("is-active")) {
    _target.classList.remove("is-active");
    _header.classList.remove("is-show");
  } else {
    _target.classList.add("is-active");
    _header.classList.add("is-show");
  }
}
const fnGnb = (classesRotate) => {
  // header background
  window.addEventListener("scroll", () => {
    const _header = document.querySelector(".header");
    if (document.documentElement.scrollTop > 0) {
      _header.classList.add("is-scroll");
    } else {
      _header.classList.remove("is-scroll");
    }
  });
  onClickBtn(".gnb-toggle-btn", (e, _target) => {
    gnbInteraction(_target);
  });
  if (window.location.href.split("/").at(-1) === "spa.html") {
    const { visualRotate, mDesc } = classesRotate;
    onClickBtn(".gnb-menu", (e, _target) => {
      const menu = _target.dataset.link;
      const _gnbToggleBtn = document.querySelector(".gnb-toggle-btn");
      gnbInteraction(_gnbToggleBtn);

      const menus = ["main", "about", "business", "company"];
      const [selectedMenu] = Array.from(
        document.querySelector(".v-crnt .is-active").classList
      ).filter((className) => {
        return menus.find((menu) => menu === className);
      });
      const toStep =
        menus.findIndex((item) => item === menu) -
        menus.findIndex((item) => item === selectedMenu);
      visualRotate.toRotate({ step: toStep });
      mDesc.moveToDir("next", toStep);

      const container = document.querySelector(".container");
      fetchPage(container, null, menu);
    });
  } else {
    onClickBtn(".gnb-menu", (e, _target) => {
      const menu = _target.dataset.link;
      window.location.href = `${window.location.origin}/html/pages/${menu}.html`;
    });
  }
  btnTopAnimate();
};
