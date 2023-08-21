export class Planet {
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
    this.aminatePlanet(dir);
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
