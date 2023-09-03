const onClickBtn = (targetClass, evt) => {
  const _target = document.querySelectorAll(targetClass);
  _target.forEach((_t) => {
    _t.addEventListener("click", (e) => {
      evt(e, _t);
    });
  });
};

export { onClickBtn };
