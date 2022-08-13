
const modal = () => {

  const modal = document.querySelector(".modal");
  const modalInner = modal.querySelector(".modal__box");
  const btns = document.querySelectorAll(".modal-open-js");
  const modalClose = modal.querySelector(".modal__close")

  // При клике на "крестик" скрываем модальное окно
  modalClose.addEventListener("click", () => {
    modal.classList.remove("modal_active");
  })

  // При клике на одну из кнопок отображаем модальное окно
  btns.forEach((button) => {
    button.addEventListener("click", () => {
      modal.classList.add("modal_active");
    });
  })

    // При клике вне модального окна - скрываем его

    // Способ 1.
    // modal.addEventListener("click", (event) => {
    //   const findModalInner = event.target.closest(".modal__inner");

    //   if(findModalInner) {
    //     return;
    //   } else {
    //     modal.classList.remove("active");
    //   }
    // })

  // Способ 2.
  modal.addEventListener("click", (event) => {
    const clickedElementsTree = event.composedPath();

    if(clickedElementsTree.includes(modalInner)) {
      return;
    } else {
      modal.classList.remove("modal_active");
    }
  })
}


export default modal;