export const fnAbout = () => {
  if (!document.querySelector(".about")) return;
  fnTimeline();
};
function fnTimeline() {
  const _timelineArea = document.querySelector(".timeline-area");
  const _timelineGroup = document.querySelector(".timeline-group");
  const _timeline = document.querySelectorAll(".timeline");
  const _btnPrev = document.querySelector(".btn-tl-prev");
  const _btnNext = document.querySelector(".btn-tl-next");
  let targetIdx = 0;

  let h = 0;
  _btnPrev.style.opacity = "0";
  _btnPrev.addEventListener("click", (e) => {
    h = getTimelineView();
    _timelineArea.scrollTo({ top: h, left: 0, behavior: "smooth" });
    _btnNext.removeAttribute("style");
    if (h <= 0) {
      _btnPrev.style.opacity = "0";
    }
  });
  _btnNext.addEventListener("click", (e) => {
    h = getTimelineView(true);
    _timelineArea.scrollTo({ top: h, left: 0, behavior: "smooth" });
    _btnPrev.removeAttribute("style");
    if (h >= _timelineGroup.clientHeight - _timelineArea.clientHeight) {
      _btnNext.style.opacity = "0";
    }
  });
  function getTimelineView(isBottom) {
    if (isBottom) {
      targetIdx += 3;
      if (targetIdx >= _timeline.length) targetIdx = _timeline.length;
    } else {
      targetIdx -= 3;
      if (targetIdx < 0) targetIdx = 0;
    }
    return _timeline[targetIdx].offsetTop;
  }
}
