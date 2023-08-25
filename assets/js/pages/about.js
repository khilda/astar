export const fnAbout = () => {
  if (!document.querySelector(".about")) return;
  fnTimeline();
  fnCrew();
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
function fnCrew() {
  const _crewWrap = document.querySelector(".crew-wrap");
  let crewGroupAnimate = null;
  function setGroupAnimate() {
    crewGroupAnimate = setInterval(() => {
      if (
        !document.querySelector(".l-crew").classList.contains("isPageActive")
      ) {
        return;
      }
      _crewWrap.classList.toggle("is-animate");
    }, 5000);
  }
  if (window.innerWidth >= 720) {
    setGroupAnimate();
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720) {
      setGroupAnimate();
    } else {
      if (crewGroupAnimate) {
        for (let i = 0; i <= crewGroupAnimate; i++) {
          clearInterval(crewGroupAnimate);
        }
      }
    }
  });
}
