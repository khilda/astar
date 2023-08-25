export const fnAbout = () => {
  if (!document.querySelector(".about")) return;
  const _timelineArea = document.querySelector(".timeline-area");
  const _timeline = document.querySelector(".timeline-group");
  const _btnPrev = document.querySelector(".btn-tl-prev");
  const _btnNext = document.querySelector(".btn-tl-next");
  let h = 0;
  _btnPrev.style.display = "none";
  _btnPrev.addEventListener("click", (e) => {
    if (h <= 0) {
      _btnPrev.style.display = "none";
      _btnNext.removeAttribute("style");
    } else {
      h -= _timelineArea.clientHeight;
      _timeline.style.transform = `translateY(${h}px)"`;
    }
  });
  _btnNext.addEventListener("click", (e) => {
    console.log(h, _timeline.clientHeight);
    if (h >= _timeline.clientHeight) {
      _btnNext.style.display = "none";
      _btnPrev.removeAttribute("style");
    } else {
      h += _timelineArea.clientHeight;
      _timeline.style.transform = `translateY(-${h}px)`;
    }
  });
};
