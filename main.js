async function getPostsInsideSlider() {
  let posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (response) => response.json()
  );

  const sliderContainer = document.getElementById("swiper-wrapper");

  posts.slice(0, 10).forEach((post, index) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("swiper-slide");
    slideElement.innerHTML = `<h3>${post.title}</h3>
      <p>${post.body}</p>`;
    sliderContainer.appendChild(slideElement);
  });

  initSwiper();
}

function initSwiper() {
  const swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
getPostsInsideSlider();

document.addEventListener("DOMContentLoaded", () => {
  getUserData();
});

async function getUserData() {
  let users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => response.json()
  );

  const userGrid = document.getElementById("grid");

  users.forEach((user) => {
    const userCell = document.createElement("div");
    userCell.className = "user-cell";
    userCell.innerHTML = `<img class="img" src="..//img/${user.id}.jpg" alt="${user.name}">
              <div class="name">
                <h2 class="name">${user.name}</h2>
                <h4 class="username">${user.username}</h4>
              </div>
              <div class="contacts">
                <p>PHONE: ${user.phone}</p>
                <p>EMAIL: ${user.email}</p>
              </div>`;

    userCell.addEventListener("click", () => {
      openModal(user);
    });

    userGrid.appendChild(userCell);
  });
}

function openModal(user) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "modal";
  modalContent.innerHTML = `<div class="modal-content">
          <img class="img" src="..//img/${user.id}.jpg" alt="${user.name}" />
          <div class="info">
            <h2>${user.name}</h2>
            <p>Username: ${user.username}</p>
            <p>Phone: ${user.phone}</p>
            <p>Email: ${user.email}</p>
          </div>
          <div class="info-additional">
            <h2>${user.company.name}</h2>
            <p>Motto: ${user.company.catchPhrase}</p>
            <p>City: ${user.address.city}</p>
            <p>Street: ${user.address.street}</p>
            <p>Website: ${user.website}</p>
          </div>
          <div class="info-additional">
            <h2>GeoPosition</h2>
            <p>lat: ${user.address.geo.lat}</p>
            <p>lng: ${user.address.geo.lng}</p>
                      </div>
        </div>`;

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  setTimeout(() => {
    modalOverlay.classList.remove("overlay__hidden");
  }, 0);

  modalOverlay.addEventListener("click", () => {
    modalOverlay.classList.add("overlay__hidden");

    setTimeout(() => {
      document.body.removeChild(modalOverlay);
    }, 250);
  });
}
