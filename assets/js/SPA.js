// common
import { fnComm } from "./pages/visual.js";
import { fetchPage } from "./func/fetchPage.js"

window.addEventListener('DOMContentLoaded', (e) => {
  const container = document.querySelector('.container'),
  visualArea = container.querySelector('.visual-area'),
  navBtns = visualArea.querySelectorAll('.btn-link');

  fnComm()
  fetchPage(container)
  navBtns.forEach(navBtn => {
    navBtn.addEventListener('click', () => fetchPage(container, navBtn))
  })
  
  visualArea.style.transitionDelay = '3s'
  setTimeout(() => {
    visualArea.style.transitionDelay = '0s'
  }, 4000)
})