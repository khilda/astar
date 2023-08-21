export const setLogoRollingClone = () => {
  const _logoRow = document.querySelectorAll(".logo-row");
  if (!_logoRow || window.innerWidth > 720) return;
  _logoRow.forEach((row) => {
    let _cloneItem = [];
    row.querySelectorAll(".logo-item").forEach((item) => {
      _cloneItem.push(item.cloneNode(true));
    });
    console.log(_cloneItem);
    for (let i = 0; row.childElementCount < 12; i++) {
      _cloneItem.forEach((item) => {
        row.appendChild(item.cloneNode(true));
      });
    }
  });
};
