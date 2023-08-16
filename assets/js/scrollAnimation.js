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
    if (window.innerWidth < 720) this.destroy();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    this.setActiveDom();
    this.addEvt("wheel", this.getWheelDir);
    this.addEvt("resize", (e) => {
      if (window.innerWidth < 375) this.destroy();
    });
  }
  addEvt(type, listener, useCapture = false) {
    window.addEventListener(type, (e) => listener(e, this), useCapture);
    this.#listener[this.#idx] = { type, listener, useCapture };
    this.#idx++;
  }
  removeEvt(type) {
    const listen = this.#listener[type];
    if (listen) {
      window.removeEventListener(
        listen.type,
        listen.listener,
        listen.useCapture
      );
      delete this.#listener[type];
    }
  }
  destroy() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    this._sections = null;
    this._curDom = null;
    this.removeEvt("wheel");
  }
  getWheelDir(e, _this) {
    _this.wheelValue = e.wheelDelta ?? e.deltaY;
    _this.wheelDir = Math.max(-1, Math.min(1, _this.wheelValue));
    _this.setActiveDom();
    return { wheel: _this.wheelValue, dir: _this.wheelDir };
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
