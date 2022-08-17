const parallax = () => {

  let elem = document.querySelectorAll('.parallax-js');
  for (let i = 0; i < elem.length; i++){

    // Чтобы элементы двигались в разные стороны, проверяем четность - нечетность.
    // Чтобы элементы двигались немного разнообразнее (один медленнее другой быстрее), добавляем рандомную переменную.
    let symbol = i % 2 === 0 ? "+" : "-";
    let random = Math.random()*80;
    if(random < 30) random = random + 30;

    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        elem[i].style.transform = 'translate(' + symbol + x * random + 'px,' + symbol + y * random + 'px)';
    });
  }

}

export default parallax;