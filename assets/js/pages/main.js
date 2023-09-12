import { setLogoRollingClone } from "../func/logoRolling.js";
import { contentsBounce } from "../func/contentsBounce.js";

export const fnMain = () => {
  console.log(document.querySelector(".container.main"))
  if (!document.querySelector(".container.main")) return;
  setLogoRollingClone();
  iptEvt();
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
