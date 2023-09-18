/**
 * 탑 버튼 animation 실행 
 */

export const btnTopAnimate = () => {
  const _wrap = document.querySelector(".wrap");
  const _progressWrap = document.querySelector(".btn-top");
  if (!_progressWrap) return;

  const progressPath = _progressWrap.querySelector("path");
  const pathLength = progressPath.getTotalLength();
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();

  const updateProgress = function () {
    var scroll = window.scrollY;
    var height = _wrap.offsetHeight - window.innerHeight;
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  _progressWrap.addEventListener("click", () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    document.querySelectorAll("[data-page]").forEach(item => {
      item.classList.remove('isPageActive')
    })
    document.querySelector('.visual-area').classList.add('isPageActive')
    return false;
  });

  const offset = 50;
  window.addEventListener("scroll", () => {
    updateProgress();
    if (document.documentElement.scrollTop > offset) {
      _progressWrap.classList.add("is-progress");
    } else {
      _progressWrap.classList.remove("is-progress");
    }
  });
};
