import { contentsBounce } from "../func/contentsBounce.js";
import { mouseScrolling } from "../func/mouseScrolling.js";

export const fnAbout = () => {
  if (!document.querySelector(".container.about")) return;
  fnTimeline();
  fnCrew();
  mouseScrolling(".vision-icon-group")
  contentsBounce('.img-desc-group', '.vision-icon-group', '.timeline-wrap', '.crew-group');
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

  const _section = document.querySelector(".l-timeline");
  window.pageAnimation.scrollCallback(_section, setClassAnimate);

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
    setClassAnimate();
  });
  function setClassAnimate() {
    const boxH = _timelineArea.clientHeight + h;
    Array.from(_timeline)
      .filter((el) => {
        return !el.classList.contains("is-animate");
      })
      .forEach((el, idx) => {
        if (el.offsetTop + el.clientHeight <= boxH) {
          setTimeout(() => {
            el.classList.add("is-animate");
          }, 500 * idx);
        }
      });
  }
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
  const _section = document.querySelector(".l-crew");
  const _crewGroup = document.querySelectorAll(".crew-group");
  const _pagination = document.querySelectorAll(".crew-pagination .btn-page");
  let crewGroupAnimate = null;
  let index = 0;
  // function setGroupAnimate() {
  //   crewGroupAnimate = setInterval(() => {
  //     _pagination.forEach((el) => el.classList.remove("is-active"));
  //     _pagination[index].classList.add("is-active");
  //     changeGroup(index);
  //   }, 5000);
  // }
  // if (window.innerWidth >= 720) {
  //   window.pageAnimation?.scrollCallback(_section, setGroupAnimate);
  // }
  // window.addEventListener("resize", () => {
  //   if (window.innerWidth >= 720) {
  //     window.pageAnimation.scrollCallback(_section, setGroupAnimate);
  //   } else {
  //     window.pageAnimation.scrollCallback();
  //     if (crewGroupAnimate) {
  //       for (let i = 0; i <= crewGroupAnimate; i++) {
  //         clearInterval(crewGroupAnimate);
  //       }
  //     }
  //   }
  // });
  _pagination.forEach((btn, idx, btns) => {
    btn.addEventListener("click", () => {
      btns.forEach((el) => el.classList.remove("is-active"));
      btn.classList.add("is-active");
      changeGroup(idx);
      // clearInterval(crewGroupAnimate);
      // setGroupAnimate();
    });
  });
  function changeGroup(idx) {
    if (!_section.classList.contains("isPageActive")) return;
    _crewGroup.forEach((el) => el.classList.remove("is-active"));
    _crewGroup[idx].classList.add("is-active");
    index = (idx + 1) % _crewGroup.length;
  }
}
