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

  contentsBounce("[class^=business]", "[class^=img-desc]", ".logo-group");
};
