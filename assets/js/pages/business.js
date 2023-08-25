export const fnBusiness = () => {
  if (!document.querySelector(".business")) return;
  const links =
    document.querySelectorAll(".btn-link[data-section]") ||
    document.querySelectorAll(".btn-link-type2[data-section]");
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.dataset.section;
      const _target = document.getElementById(id);
      window.pageAnimation.goToSection(_target);
    });
  });
};
