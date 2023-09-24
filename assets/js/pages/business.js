import { setLogoRollingClone } from "../func/logoRolling.js";
import { contentsBounce } from "../func/contentsBounce.js";

export const fnBusiness = () => {
  if (!document.querySelector(".container.business")) return;

  setLogoRollingClone();

  const links = document.querySelectorAll("[data-section]");
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.dataset.section;
      const _target = document.getElementById(id);
      window.pageAnimation.scrollToSection(_target);
    });
  });

  slide()

  contentsBounce("[class^=business]", ".slide-view", ".img-desc-group:not(.slide .img-desc-group)", ".logo-group");
};

function slide() {
  const slideWrap = document.querySelector(".slide-wrap");
  const slides = slideWrap.querySelectorAll(".slide");
  const pagination = document.querySelector(".slide-pagination");
  const paginationBtns = pagination.querySelectorAll(".btn-page");
  // let autoplay = null
  let index = 0;
  
  function moveSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    slideWrap.scrollTo({
      left: parseInt(slideWidth) * index,
      behavior: 'smooth',
    })
  }

  paginationBtns.forEach((btn, idx, btns) => {
    btn.addEventListener("click", () => {
      index = idx
      btns.forEach((el) => el.classList.remove("is-active"));
      btn.classList.add("is-active");

      moveSlide()
    });
  });
}
