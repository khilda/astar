export const fnCompany = () => {
  if (!document.querySelector(".container.company")) return;
  const noArr = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
  ];
  const descArr = [
    "고귀한 성품을 가진 회사",
    "고객에게 신뢰를 얻는 회사",
    "상처를 주지 않는 회사",
    "시장을 개척하는 회사",
    "인정을 베푸는 회사",
    "다 함께 뛰는 회사",
  ];
  visionAnimate('.t-summary', noArr);
  visionAnimate('.t-desc', descArr);
};
const visionAnimate = (_class, textArr) => {
  const elts = {
    prev: document.querySelector(`#prev ${_class}`),
    next: document.querySelector(`#next ${_class}`),
  };

  const morphTime = 1;
  const cooldownTime = 0.5;

  let textIndex = textArr.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.prev.textContent = textArr[textIndex % textArr.length];
  elts.next.textContent = textArr[(textIndex + 1) % textArr.length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.next.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.next.style.opacity = `${Math.pow(fraction, 0.4)}`;

    fraction = 1 - fraction;
    elts.prev.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.prev.style.opacity = `${Math.pow(fraction, 0.4)}`;

    elts.prev.textContent = textArr[textIndex % textArr.length];
    elts.next.textContent = textArr[(textIndex + 1) % textArr.length];
  }

  function doCooldown() {
    morph = 0;

    elts.next.style.filter = "";
    elts.next.style.opacity = "1";

    elts.prev.style.filter = "";
    elts.prev.style.opacity = "0";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  animate();
};
