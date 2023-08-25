import { setLogoRollingClone } from "./../animation.js";
export const fnMain = () => {
  if (!document.querySelector(".container.main")) return;
  setLogoRollingClone();
};
