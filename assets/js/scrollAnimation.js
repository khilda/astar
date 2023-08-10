export class PageAnimation {
  constructor() {
    this._sections = null;
    this._curDom = null;
    this.wheelValue = 0;
    this.wheelDir = null;
    this.init();
  }
  init() {
    if (window.innerWidth < 270) this.destroy();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    this.setActiveDom();

    window.addEventListener("wheel", (e) => {
      this.getWheelDir(e);
    });
    window.addEventListener("resize", (e) => {
      if (window.innerWidth < 270) this.destroy();
    });
  }
  destroy() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    this._sections = null;
    this._curDom = null;
    window.removeEventListener("wheel");
  }
  getWheelDir(e) {
    this.wheelValue = e.wheelDelta || deltaY;
    this.wheelDir = Math.max(-1, Math.min(1, this.wheelValue));
    this.setActiveDom();
    return { wheel: this.wheelValue, dir: this.wheelDir };
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
