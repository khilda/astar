import { setLogoRollingClone } from "./../animation.js";
export const fnMain = () => {
  if (!document.querySelector(".container.main")) return;
  setLogoRollingClone();
  iptEvt();
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
