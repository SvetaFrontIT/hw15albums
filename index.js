// Интерфейс разделен на две части. В левой части пользователь видит
//список альбомов. его берем из https://jsonplaceholder.typicode.com/albums

// Когда пользователь нажмет на какой-то альбом в правой части он увидит фотографии
//из этого альбома. Их берем из https://jsonplaceholder.typicode.com/photos?albumId=ID
//где вместо ID подставляем id нужного альбома.

// Сразу при загрузке приложения и получения списка альбомов, в правой части
//нужно показать фотографии из первого альбома в списке


class Gallery {
  constructor(container) {
    this.container = container;
    this.init();
    this.getAlbumImages();
    this.createEventListener();
    this.clearCarusel ();
  }
  init() {
    this.list = this.container.querySelector(".js-list");
    this.indicatoros = this.container.querySelector(".js-indicators");
    this.images = this.container.querySelector(".js-images");
    this.albumID = 1;
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          this.a = document.createElement("a");
          this.a.href = "#";
          this.a.id = i;
          this.a.className = "list-group-item list-group-item-action list-group-item-info js-item";
          this.a.innerHTML = response[i].title;
          this.list.appendChild(this.a);
        }
        this.getAlbumImages(this.albumID);
        this.createEventListener();
      });
  }
  getAlbumImages(albumID) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${Number(albumID)}`)
      .then((response) => response.json())
      .then((response) => {
        this.clearCarusel ();
        this.createCaruselIndicators (response);
        this.createCaruselImages (response);
        
      });
  }
  createEventListener() {
    this.list.addEventListener("click", (event) => {
      if (event.target.classList.contains("js-item")) {
        this.albumID = event.target.id;
      }
      this.getAlbumImages(this.albumID);
    });
  }
  createCaruselIndicators (response) {
    for (let i = 0; i < response.length; i++) {
        this.li = document.createElement("li");
      this.li.dataset.bsTarget = "#carouselExampleIndicators";
      this.li.dataset.bsSlideTo = i;
      this.li.dataset.albumId = response[i].albumId;
      if (i === 0) {
        this.li.className = "active";
      }
      this.indicatoros.appendChild(this.li);
    }
  }
  createCaruselImages (response) {
    for (let i = 0; i < response.length; i++) {
        this.imageBlock = document.createElement("div");
        this.imageBlock.className = "carousel-item";
      if (i === 0) {
        this.imageBlock.className = "carousel-item active";
      }
      this.imageBlock.innerHTML = `<img src="${response[i].url}" class="d-block w-100" alt="...">`;
      this.images.appendChild(this.imageBlock);
    }
  }
  clearCarusel () {
    this.indicatoros.innerHTML = "";
    this.images.innerHTML = "";
  }
}

new Gallery(document.getElementById("gallery"));