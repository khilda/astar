export const fnAbout = () => {
  if (!document.querySelector(".about")) return;
  const _timelineArea = document.querySelector(".timeline-area");
  const _timelineGroup = document.querySelector(".timeline-group");
  const _timeline = document.querySelector(".timeline");
  const _btnPrev = document.querySelector(".btn-tl-prev");
  const _btnNext = document.querySelector(".btn-tl-next");

  let h = 0;
  _btnPrev.style.opacity = "0";
  _btnPrev.addEventListener("click", (e) => {
    // h -= _timelineArea.clientHeight;
    h = getTimelineView();
    _timelineArea.scrollTo({ top: h, left: 0, behavior: "smooth" });
    _btnNext.removeAttribute("style");
    console.log("toTop", getTimelineView(false), h);
    if (h <= 0) {
      _btnPrev.style.opacity = "0";
    }
  });
  _btnNext.addEventListener("click", (e) => {
    // h += _timelineArea.clientHeight;
    h = getTimelineView(true);
    _timelineArea.scrollTo({ top: h, left: 0, behavior: "smooth" });
    _btnPrev.removeAttribute("style");
    console.log("toBottom", getTimelineView(true), h);
    if (h >= _timelineGroup.clientHeight - _timelineArea.clientHeight) {
      _btnNext.style.opacity = "0";
    }
  });
};
const getTimelineView = (isBottom) => {
  const _timelineArea = document.querySelector(".timeline-area");
  const _timeline = document.querySelectorAll(".timeline");
  const scrollY = _timelineArea.scrollTop;
  const target = Array.from(_timeline).find((el) => {
    const targetY = el.offsetTop + el.clientHeight;
    console.log(
      scrollY - _timelineArea.clientHeight,
      el.offsetTop + el.clientHeight
    );
    if (isBottom) {
      return scrollY + _timelineArea.clientHeight < targetY;
    } else {
      return scrollY - _timelineArea.clientHeight < targetY;
    }
  });
  return target.offsetTop;
};
