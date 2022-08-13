// Секция Что мы сделали - слайдер

const whatSlider = () => {

  let counter = 0;

  const whatList = document.querySelector(".what__list");
  const whatSlides = whatList.querySelectorAll(".what__item");
  const whatFirstSlide = whatList.querySelector(".what__item_1");
  const whatSecondSlide = whatList.querySelector(".what__item_2");
  const whatThirdSlide = whatList.querySelector(".what__item_3");
  const controlsBlock = document.querySelector(".what__controls");
  const controls = controlsBlock.querySelectorAll("button");

  controls.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.classList.contains("what__toleft")) {
        counter--;
        if(counter < 0) {
          counter = 2;
        }
      }

      if (button.classList.contains("what__toright")) {
        counter++;
        if(counter > 2) {
          counter = 0;
        }
      }

      switch (counter) {
        case 0:
          whatSlides.forEach((currentSlide) => {
            currentSlide.classList.remove("what__item_active")
          });
          whatFirstSlide.classList.add("what__item_active");
          break;
        case 1:
          whatSlides.forEach((currentSlide) => {
            currentSlide.classList.remove("what__item_active")
          });
          whatSecondSlide.classList.add("what__item_active");
          break;
        case 2:
          whatSlides.forEach((currentSlide) => {
            currentSlide.classList.remove("what__item_active")
          });
          whatThirdSlide.classList.add("what__item_active");
          break;
      }
    });
  });
};

export default whatSlider;