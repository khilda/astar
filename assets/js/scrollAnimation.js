export class PageAnimation {
  constructor() {
    this._sections = null;
    this._curDom = null;
    this.wheelValue = 0;
    this.wheelDir = null;
    this.init();
  }
  #listener = [];
  #idx = 0;

  init() {
    if (window.innerWidth < 720) {
      this.destroy();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    this.setActiveDom();
    window.addEventListener("resize", this.resize);
    window.addEventListener("wheel", this.wheel);
  }
  resize() {
    if (window.innerWidth < 720) {
      this.destroy();
      return;
    }
  }
  wheel(e) {
    console.log(this, e);
    this.wheelValue = e.wheelDelta ?? e.deltaY;
    this.wheelDir = Math.max(-1, Math.min(1, this.wheelValue));
    this.setActiveDom();
    return { wheel: this.wheelValue, dir: this.wheelDir };
  }
  destroy() {
    console.log(window.innerWidth);
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    this._sections = null;
    this._curDom = null;
    window.removeEventListener("wheel", this.getWheelDir);
  }
  setActiveDom() {
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
    this.moveToSection(scrollTo);
  }
  moveToSection(top) {
    window.scrollTo({
      top,
      left: 0,
      behavior: "smooth",
    });
  }
}
