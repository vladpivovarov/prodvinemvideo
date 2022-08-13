
const menu = () => {

  const menuBlock = document.querySelector(".header__nav-block");
  const humburger = document.querySelector(".header__humb");
  const closeBtn = menuBlock.querySelector(".nav__close");

  humburger.addEventListener("click", (e) => {
    menuBlock.classList.toggle("header__nav-block_active");
  });

  closeBtn.addEventListener("click", (e) => {
    menuBlock.classList.remove("header__nav-block_active");
  });
}

export default menu;