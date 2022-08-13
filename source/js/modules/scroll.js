const scroll = () => {

  const navBar = document.querySelector(".nav");
  const links = navBar.querySelectorAll(".nav__link");

  // Реализация плавного скролла по id
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const linkHref = link.getAttribute("href");
      const section = document.querySelector(linkHref);

      if(section) {
        // Скролл с помощью библиотеки (кроссбарузерно)
        seamless.scrollIntoView(section, {
          behavior: "smooth",
          block: "start",
          inline: "center",
        });

        // Обычный скролл
        // section.scrollIntoView({
        //   block: "start",
        //   behavior: "smooth"
        // })
      }
    })
  })

}

export default scroll;