// Подгружаем данные из json файла и добавляем клиентов на страницу

const downloadData = () => {

  const portfolio = document.querySelector(".portfolio__list");

  // Подгружаем данные из json файла
  const request = new XMLHttpRequest();
  request.open('GET', "./js/data.json");
  request.responseType = 'json';
  request.send();

  request.onload = () => {
    const data = request.response;

    //Добавляем клиентов на страницу
    data.clients.forEach((element, index) => {
      const item = document.createElement("li");
      const itemLink = document.createElement("a");
      const imageBlock = document.createElement("div");
      const image = document.createElement("img");
      const desc = document.createElement("div");
      const name = document.createElement("div");
      const subscribersCount = document.createElement("div");

      item.classList.add("portfolio__item");
      item.classList.add("client");
      if(element.status === "pro") {
        item.classList.add("client_pro");
      }

      itemLink.setAttribute("href", element.link);
      itemLink.setAttribute("target", "_blank");
      itemLink.classList.add("client__link");

      imageBlock.classList.add("client__image-block");

      image.setAttribute("src", element.img);
      image.setAttribute("alt", "Аватарка Youtube канала " + element.name);
      image.setAttribute("width", "77px");
      image.setAttribute("height", "77px");
      image.classList.add("client__image");

      desc.classList.add("client__desc");

      name.classList.add("client__name");
      name.textContent = element.name;

      subscribersCount.classList.add("client__subscribers-count");
      subscribersCount.textContent = element.subscribersCount;


      item.appendChild(itemLink);
      itemLink.appendChild(imageBlock);
      itemLink.appendChild(desc);
      imageBlock.appendChild(image);
      desc.appendChild(name);
      desc.appendChild(subscribersCount);

      portfolio.appendChild(item);
    });
  }
}

export default downloadData;