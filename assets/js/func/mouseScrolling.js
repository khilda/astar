export function mouseScrolling(...selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    mouseScrollingHandler(element)
  });
}

function mouseScrollingHandler(target) {
  target.style.userSelect = 'none'
  let isDown = false;
  let startX;
  let scrollLeft;

  target.addEventListener('mousedown', e => {
    isDown = true;
    target.classList.add('active');
    target.querySelectorAll('.slide').forEach(slide => {
      slide.style.scrollSnapAlign = 'none'
    })
    target.style.scrollBehavior = 'smooth'
    startX = e.pageX - target.offsetLeft;
    scrollLeft = target.scrollLeft;
  });
  
  target.addEventListener('mouseleave', () => {
    isDown = false;
    target.classList.remove('active');
  });
  
  target.addEventListener('mouseup', () => {
    isDown = false;
    target.classList.remove('active');
    target.querySelectorAll('.slide').forEach(slide => {
      slide.style.scrollSnapAlign = 'center'
    })
  });
  
  target.addEventListener('mousemove', e => {
    if (!isDown) return; 
    e.preventDefault();
    const x = e.pageX - target.offsetLeft;
    const walk = x - startX;
    target.scrollLeft = scrollLeft - walk;
  });
}