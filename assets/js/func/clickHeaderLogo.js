// click header-logo

export function clickHeaderLogo() {
  document.querySelector('header .logo').addEventListener("click", () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    document.querySelectorAll("[data-page]").forEach(item => {
      item.classList.remove('isPageActive')
    })
    document.querySelector('.visual-area').classList.add('isPageActive')
  });
}