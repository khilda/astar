export const fnBusiness = () => {
  if (!document.querySelector(".business")) return;
  const links = document.querySelectorAll("[data-section]");
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.dataset.section;
      const _target = document.getElementById(id);
      console.log(_target)
      window.pageAnimation.scrollToSection(_target);
    });
  });
};
