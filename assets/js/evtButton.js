const onClickBtn = (targetClass, evt) => {
  const _target = document.querySelector(targetClass);
  _target.addEventListener("click", (e) => {
    evt(e, _target);
  });
};

export { onClickBtn };
