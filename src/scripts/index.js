import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import "font-awesome/css/font-awesome.css";
import dataRestaurant from "../public/data/DATA.json";

// nav
const hamburgerMenu = document.getElementById("hamburger-menu");
const navList = document.querySelector(".nav-list");

hamburgerMenu.addEventListener("click", (event) => {
  event.preventDefault();
  navList.classList.toggle("active");
});

const mainElement = document.querySelector("main");
mainElement.addEventListener("click", () => {
  navList.classList.remove("active");
});

// content
const listPost = document.querySelector(".posts");
let listRest = "";

dataRestaurant.restaurants.forEach((dataRestaurant) => {
  listRest += `
    <article class="post-item">
      <img src="${dataRestaurant.pictureId}" class="post-item-thumbnail" alt="${
    dataRestaurant.name
  }">
      <div class="post-item-content">
        <p class="post-item-rating">Rating: ${
          dataRestaurant.rating
        } <i class="fa fa-solid fa-star" style="color: #ffd43b;"></i></p>
        <h1 class="post-item-title"><a href="">${dataRestaurant.name}</a></h1>
        <p class="post-item-description">${readMore(
          dataRestaurant.description
        )}</p>
        <a href="#" class="read-more-link">Baca Selengkapnya</a>
      </div>
    </article>
  `;
  listPost.innerHTML = listRest;
});

function readMore(description) {
  const maxCharacters = 150;
  if (description.length <= maxCharacters) {
    return;
  }

  const truncatedDescription = description.slice(0, maxCharacters) + "...";
  return truncatedDescription;
}

document.querySelectorAll(".read-more-link").forEach((readMoreLink, index) => {
  readMoreLink.addEventListener("click", function (e) {
    e.preventDefault();
    const descriptionElement = document.querySelectorAll(
      ".post-item-description"
    )[index];
    const restaurantData = dataRestaurant.restaurants[index];

    if (descriptionElement.innerText.endsWith("...")) {
      descriptionElement.innerText = restaurantData.description;
      readMoreLink.innerText = "Tutup";
    } else {
      descriptionElement.innerText = readMore(restaurantData.description);
      readMoreLink.innerText = "Baca Selengkapnya";
    }
  });
});
