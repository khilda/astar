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
  const hasSlideSection = document.querySelector(".has-slide");
  const slideWrapper = hasSlideSection.querySelector(".slide-wrapper");
  const slides = slideWrapper.querySelectorAll(".slide");
  const pagination = hasSlideSection.querySelector(".slide-pagination");
  const paginationBtns = hasSlideSection.querySelectorAll(".slide-pagination .btn-page");
  // let autoplay = null
  let index = 0;
  
  function moveSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    slideWrapper.style.transform = `translateX(${index * -slideWidth}px)`
  }

  pagination.addEventListener("click", () => {
    slides.forEach(slide => {
      const transitionGroup = slide.querySelectorAll(['.img-visual', '.vision-text', '.vision-text h3', '.vision-text p', '.vision-text .btn-move'])
      const transitionSteps = ['1s', '1.5s', '2.2s', '2.5s', '2.8s'];
      Array.from(transitionGroup).forEach((item, index) => {
        item.style.transitionDelay = `${transitionSteps[index]}`
        console.log(item.style.transitionDelay)
      })
    })
  }, { once: true });
  paginationBtns.forEach((btn, idx, btns) => {
    btn.addEventListener("click", () => {
      index = idx
      btns.forEach((el) => el.classList.remove("is-active"));
      btn.classList.add("is-active");

      slides.forEach((el) => el.classList.remove("is-active"));
      slides[index].classList.add("is-active");
      
      moveSlide()
    });
  });
}
