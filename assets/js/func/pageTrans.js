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
  _animateTarget[0].dom.addEventListener("click", () => {
    console.log("prev");
    visualAfter();
    setTimeout(() => {
      moveToPage(_animateTarget[0].dom.dataset.link);
    }, 2500);
  });
  _animateTarget[1].dom.addEventListener("click", (e) => {
    console.log("next");
    visualAfter();
    setTimeout(() => {
      moveToPage(_animateTarget[1].dom.dataset.link);
    }, 2500);
  });
};
const moveToPage = (link) => {
  window.location.href = `${window.location.origin}/html/pages/${link}.html`;
};

const visualBefore = () => {
  _visualArea.classList.add("beforePageTrans");
  _animateTarget.forEach((el) => {
    el.dom.style.height = `${el.dom.clientHeight}px`;
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
  _animateTarget.forEach((el) => {
    el.dom.style.width = `${el.width}px`;
  });
  animate({
    delay: 1500,
    duration: 1000,
    draw(progress) {
      _animateTarget.forEach((el) => {
        widthZero(el.dom, progress, el.width);
      });
    },
  });
};

function widthZero(el, percent, width) {
  const _w = width - width * percent;
  el.style.width = `${_w}px`;
}
function widthFull(el, percent, width) {
  const _w = width * percent;
  el.style.width = `${_w}px`;
}

function animate({ delay = 0, draw, duration }) {
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
/**
 * Move To Rotate
 */
function visualRotate() {}
