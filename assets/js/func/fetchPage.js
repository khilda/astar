// page
import { fnMain } from "./../pages/main.js";
import { fnAbout } from "./../pages/about.js";
import { fnBusiness } from "./../pages/business.js";
import { fnCompany } from "./../pages/company.js";
import { PageAnimation } from "./../layout/scrollAnimation.js";

export function fetchPage(target, navBtn, clickedGnb) {
  const pageFunction = {
    main: fnMain,
    about: fnAbout,
    business: fnBusiness,
    company: fnCompany,
  }
  let menu = navBtn?.querySelector('.menu').textContent.split(' ')[0]
  if (!menu || menu === 'INTRO') {
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