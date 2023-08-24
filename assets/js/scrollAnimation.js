export class PageAnimation {
  constructor() {
    this._sections = null;
    this._curDom = null;
    this.wheelValue = 0;
    this.wheelDir = null;

    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener("wheel", this.scrollHandler);

    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener("resize", this.resizeHandler);

    this.initFullPage();
  }

  initFullPage() {
    this.updateCurrentSection();
    this.handleResize();
    // 해당 지정이 아닐경우, 삭제
    if (!this._sections.length) {
      this.removeScrollListener();
    }
  }

  handleScroll(e) {
    this.wheelValue = e.wheelDelta ?? e.deltaY;
    this.wheelDir = Math.max(-1, Math.min(1, this.wheelValue));
    // 페이지 전환
    this.updateCurrentSection();
  }

  handleResize() {
    if (window.innerWidth >= 720) {
      this.addScrollListener();
    } else {
      this.removeScrollListener();
    }
  }

  addScrollListener() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", this.scrollHandler);
  }

  removeScrollListener() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    window.removeEventListener("wheel", this.scrollHandler);
  }

  updateCurrentSection() {
    if (!this._sections) {
      this._sections = document.querySelectorAll("[data-page]");
      this._curDom = this._sections[0];
    }
    this._sections.forEach((el) => el.classList.remove("isPageActive"));
    let prevIdx = Array.from(this._sections).indexOf(this._curDom);
    let idx = prevIdx < 0 ? this._sections.length : prevIdx;
    idx -= this.wheelDir;
    let scrollTo = 0;
    if (idx < 0) {
      idx = 0;
      return;
    } else if (idx < this._sections.length) {
      this._curDom = this._sections[idx];
      this._curDom.classList.add("isPageActive");
      scrollTo = this._curDom.offsetTop;
    } else {
      this._curDom = null;
      scrollTo = document.documentElement.getBoundingClientRect().height;
    }
    window.scrollTo({ top: scrollTo, left: 0, behavior: "smooth" });
  }
}
