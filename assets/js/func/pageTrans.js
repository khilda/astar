const _visualArea = document.querySelector(".visual-area");
const _animateTarget = [
  {
    dom: _visualArea.querySelector(".v-prev .btn-link"),
    width: _visualArea.querySelector(".v-prev .btn-link").clientWidth,
  },
  {
    dom: _visualArea.querySelector(".v-next .btn-link"),
    width: _visualArea.querySelector(".v-next .btn-link").clientWidth,
  },
  {
    dom: _visualArea.querySelector(".v-info"),
    width: _visualArea.querySelector(".v-info").clientWidth,
  },
];
export const pageTrnasition = () => {
  visualBefore();
  _animateTarget[0].dom.addEventListener('click', ()=>{
    console.log('prev')
  })
  _animateTarget[1].dom.addEventListener('click', ()=>{
    console.log('next')
  })
};

const visualBefore = () => {
  _visualArea.classList.add("beforePageTrans");
  _animateTarget.forEach((el) => {
    el.dom.style.width = 0;
  });
  setTimeout(() => {
    animate({
      delay: 1500,
      duration: 1000,
      draw(progress) {
        _animateTarget.forEach((el) => {
          widthFull(el.dom, progress, el.width);
        });
      },
    });
  }, 2800);
  setTimeout(() => {
    _visualArea.classList.remove("beforePageTrans");
  }, 5000);
};
const visualAfter = () => {
  _visualArea.classList.add("afterPageTrans");
  setTimeout(() => {
    animate({
      delay: 1500,
      duration: 1000,
      draw(progress) {
        _animateTarget.forEach((el) => {
          widthZero(el.dom, progress, el.width);
        });
      },
    });
  }, 2800);
  setTimeout(() => {
    _visualArea.classList.remove("afterPageTrans");
  }, 5000);
};

function widthZero(el, percent) {
  const _w = el.clientWidth - el.clientWidth * percent;
  el.style.width = `${_w}px`;
}
function widthFull(el, percent, width) {
  if (percent === 1) {
    el.removeAttribute("style");
  } else {
    const _w = width * percent;
    el.style.width = `${_w}px`;
  }
}

function animate({ delay, draw, duration }) {
  if (delay) {
    setTimeout(() => {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        draw(timeFraction); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }, delay);
  }
}
