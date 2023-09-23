/**
 * visual area rotate 애니메이션
 */
export class VisualRotate {
  currdeg = 0;
  infoWidth = 0;
  constructor() {
    this._carousel = document.querySelector(".v-carousel-container");
    this._dom = {
      items: Array.from(document.querySelectorAll(".c-item")).map((x) => x),
      container: Array.from(document.querySelectorAll(".c-item-container")).map(
        (x) => x
      ),
      info: document.querySelectorAll(".v-info"),
    };
    this.names = ["WELCOME", "ABOUT ASTAR", "BUSINESS", "COMPANY"];
    this._prev = document.querySelector(".v-prev");
    this._next = document.querySelector(".v-next");
    this.index = 0;
    this.init();
  }
  rotateLayout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // layout rotate
        this._carousel.style = `transform: rotateY(${this.currdeg}deg)`;
        this._dom.container.forEach((el, idx) => {
          let style = `transform: rotateY(${-this.currdeg}deg); `;
          if (idx === this.index) {
            el.parentElement.classList.add("is-active");
          } else {
            if (idx == this.calcIdx(0, this.index + 2)) style += "opacity: 0;";
            el.parentElement.classList.remove("is-active");
          }
          el.style = style;
        });
        resolve();
      }, 300);
    });
  }

  setBeforeRotate() {
    return new Promise((resolve) => {
      this._dom.info.forEach((info, idx) => {
        if (idx === this.index) return;
        info.style.opacity = 0;
        if (info.clientWidth) {
          this.animate({
            delay: 300,
            duration: 500,
            draw: (progress) => {
              this.widthZero(info, progress, this.infoWidth);
            },
          }).then(resolve);
        }
      });
    });
  }
  setAfterRotate() {
    const info = this._dom.info[this.index];
    return new Promise((resolve) => {
      this.animate({
        duration: 500,
        draw: (progress) => {
          this.widthFull(info, progress, this.infoWidth);
        },
      }).then(() => {
        info.style.opacity = 1;
        resolve();
      });
    });
  }

  rotate() {
    this._carousel.classList.add("is-animate");
    this.setBeforeRotate();
    this.rotateLayout()
      // .then(() => this.rotateLayout())
      .then(() => this.setAfterRotate())
      .then(() => {
        this._prev.querySelector(".menu").innerHTML =
          this.names[this.calcIdx(-1)];
        this._next.querySelector(".menu").innerHTML =
          this.names[this.calcIdx(1)];
        this._carousel.classList.remove("is-animate");
      });
  }

  widthZero(el, percent, width) {
    const _w = width - width * percent;
    el.style.width = `${_w}px`;
  }
  widthFull(el, percent, width) {
    const _w = width * percent;
    el.style.width = `${_w}px`;
  }
  calcIdx(arrow = 0, idx = this.index) {
    let i = (idx + arrow) % this._dom.container.length;
    return i < 0 ? 3 : i;
  }

  animate({ delay = 0, draw, duration }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;

          draw(timeFraction); // draw it

          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve(true);
          }
        });
      }, delay);
    });
  }

  init() {
    if (!this._carousel) return;
    if (window.innerWidth > 1180) {
      this.infoWidth = this._dom.info[0].getBoundingClientRect().width;
    } else {
      this.infoWidth = window.innerWidth;
    }
    this.rotate();

    this._next.addEventListener("click", () => {
      this.toRotate({ direction: "left" });
    });
    this._prev.addEventListener("click", () => {
      this.toRotate({ direction: "right" });
    });
  }

  toRotate({ step = 1, direction = "left" }) {
    if (direction === "left") {
      this.index = this.calcIdx(step);
      this.currdeg = this.currdeg + -step * 90;
    } else if (direction === "right") {
      this.index = this.calcIdx(-step);
      this.currdeg = this.currdeg + step * 90;
    }
    this.rotate();
  }
}

/**
 * 모바일용 하단 rotate 애니메이션
 */
export class MobileDescRotate {
  constructor() {
    this._planetCont = document.querySelector(".p-container");
    this._planets = null;
    this._planetCls = ["main", "about", "business", "company"];
    this.angle = 0;
    this.index = 0;
    this._curntPlanet = null;
  }
  init() {
    if (!this._planetCont) return;
    this.angle = 0;
    this._planetCont.replaceChildren();
    let planet = "";
    for (let i = 0; i < 8; i++) {
      planet += `<button type="button" class="planet ${
        this._planetCls[i % 4]
      }"></button>`;
    }
    this._planetCont.innerHTML = planet;
    this._planets = this._planetCont.querySelectorAll(".planet");
    this._curntPlanet = document.querySelector(".container").classList[1];
    this.index = this._planetCls.indexOf(this._curntPlanet);
    this.angle = this.index * -45;
    this.animatePlanet();
    this.moveToPlanet();
  }
  moveToDir(target, step = 1) {
    const dir = target === "prev" ? -1 : 1;
    setTimeout(() => {
      this.animatePlanet(dir, step);
    }, 1100);
  }
  animatePlanet(dir, step) {
    if (dir) {
      this.angle = this.angle + dir * step * -45;
      this.index =
        (this.index + dir * step) % 8 < 0 ? 7 : (this.index + dir * step) % 8;
    }
    this._planetCont.style.transform = `rotateZ(${this.angle}deg)`;
    this._planets.forEach((el) => el.classList.remove("is-active"));
    this._curntPlanet = this._planets[this.index];
    this._curntPlanet.classList.add("is-active");
  }
  moveToPlanet(toRotate) {
    this._planets.forEach((el, idx) => {
      el.addEventListener("click", (e) => {
        if (idx === this.index) return;

        let i = (idx - this.index) % 4;
        let arrow = i < 0 ? "prev" : "next";
        if (Math.abs(i) === 3) {
          arrow = i > 0 ? "prev" : "next";
        }
        document.querySelector(`.v-${arrow} .btn-link`).click();
      });
    });
  }
}
