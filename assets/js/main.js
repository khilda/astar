// common
import { fnComm } from "./pages/visual.js";
// page
import { fnIntro } from "./pages/intro.js";
import { fnMain } from "./pages/main.js";
import { fnAbout } from "./pages/about.js";
import { fnBusiness } from "./pages/business.js";
import { fnCompany } from "./pages/company.js";

window.addEventListener("DOMContentLoaded", () => {
  fnComm();

  // content
  fnIntro();
  fnMain();
  fnAbout();
  fnBusiness();
  fnCompany();
});
