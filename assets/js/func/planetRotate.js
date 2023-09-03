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
    this.names = ["INTRO", "ABOUT ASTAR", "BUSINESS", "COMPANY"];
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
    console.log(this);
    this._carousel.classList.add("is-animate");
    this.setBeforeRotate()
      .then(() => this.rotateLayout())
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
      this.index = this.calcIdx(1);
      this.currdeg = this.currdeg - 90;
      this.rotate();
    });
    this._prev.addEventListener("click", () => {
      this.index = this.calcIdx(-1);
      this.currdeg = this.currdeg + 90;
      this.rotate();
    });
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
      planet += `<li class="planet ${this._planetCls[i % 4]}"></li>`;
    }
    this._planetCont.innerHTML = planet;
    this._planets = this._planetCont.querySelectorAll(".planet");
    this._curntPlanet = document.querySelector(".container").classList[1];
    this.index = this._planetCls.indexOf(this._curntPlanet);
    this.angle = this.index * -45;
    this.aminatePlanet();
  }
  moveToDir(target) {
    const dir = target === "prev" ? -1 : 1;
    setTimeout(() => {
      this.aminatePlanet(dir);
    }, 1100);
  }
  aminatePlanet(dir) {
    if (dir) {
      this.angle = this.angle + dir * -45;
      this.index = (this.index + dir) % 8 < 0 ? 7 : (this.index + dir) % 8;
    }
    this._planetCont.style.transform = `rotateZ(${this.angle}deg)`;
    this._planets.forEach((el) => el.classList.remove("is-active"));
    this._curntPlanet = this._planets[this.index];
    this._curntPlanet.classList.add("is-active");
  }
}
