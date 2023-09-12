/**
 * 해당 element 에 click event 추가
 * @param {string} targetClass - css selector
 * @param {function} evt - callback function
 */

const onClickBtn = (targetClass, evt) => {
  const _target = document.querySelectorAll(targetClass);
  _target.forEach((_t) => {
    _t.addEventListener("click", (e) => {
      evt(e, _t);
    });
  });
};

export { onClickBtn };
