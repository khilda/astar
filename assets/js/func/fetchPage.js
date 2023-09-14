// page
import { fnMain } from "./../pages/main.js";
import { fnAbout } from "./../pages/about.js";
import { fnBusiness } from "./../pages/business.js";
import { fnCompany } from "./../pages/company.js";
import { PageAnimation } from "./../layout/scrollAnimation.js";

/**
 * SPA 헝태에서 contents 변경
 * @param {string} target - contents container
 * @param {HTMLElement} navBtn - visual-area 의 prev, next btn
 * @param {string} clickedGnb - gnb에서 클릭한 메뉴 이름
 */

export function fetchPage(target, navBtn, clickedGnb) {
  const pageFunction = {
    main: fnMain,
    about: fnAbout,
    business: fnBusiness,
    company: fnCompany,
  }
  let menu = navBtn?.querySelector('.menu').textContent.split(' ')[0]
  if (!menu || menu === 'WELCOME') {
    menu = 'MAIN'
  }
  menu = clickedGnb || menu.toLowerCase()
  fetch(`${menu}.html`)
  .then(response => {
    return response.text()
  })
  .then(html => {
    const html_dom = new DOMParser().parseFromString(html,'text/html');

    const fetchContainer = html_dom.querySelector('.container'),
          fetchContents = fetchContainer.querySelectorAll('.w-section');
    
    target.querySelectorAll('.w-section').forEach(content => {
      content.remove()
    })
    fetchContents.forEach(content => {
      target.insertAdjacentElement('beforeend', content)
    })
    target.classList.remove(...Array.from(target.classList).filter(className => className !== 'container'))
    target.classList.add(menu)
    
    window.pageAnimation = new PageAnimation();
    pageFunction[menu]()
  })
}