import { setLogoRollingClone } from "../func/logoRolling.js";
import { contentsBounce } from "../func/contentsBounce.js";
import { mouseScrolling } from "../func/mouseScrolling.js";

export const fnMain = () => {
  if (!document.querySelector(".container.main")) return;
  setLogoRollingClone();
  iptEvt();
  mouseScrolling(".about-wrap", ".main-business")
  contentsBounce("[class^=main]");
};

const iptEvt = () => {
  document.querySelectorAll(".input-wrap").forEach((iptWrap) => {
    iptWrap.querySelector("input").addEventListener("change", (e) => {
      if (e.target.value) {
        e.target.classList.add("has-value");
      } else {
        e.target.classList.remove("has-value");
      }
    });
  });
};
