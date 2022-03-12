"use strict";
const serviceButtons = document.querySelectorAll(".services-item-button");
const serviceCards = document.querySelectorAll(".service-card");
const workButtons = document.querySelectorAll(".work-item-button");
const buttonPrev = document.querySelector(".button-prev");
const buttonNext = document.querySelector(".button-next");
const slides = document.querySelectorAll(".people-block");
const dots = document.querySelectorAll(".people-slider-item");
const btnLoader = document.querySelector(".btn-load");
const loader = document.querySelector(".loader");
const workGallery = document.querySelector(".work-gallery");
const newDiv = document.querySelector(".work-gallery-item").cloneNode(true);
const newImg = newDiv.querySelector(".work-img");
const card = [
  "img/graphic design/graphic-design12.jpg",
  "img/graphic design/graphic-design11.jpg",
  "img/graphic design/graphic-design10.jpg",
  "img/graphic design/graphic-design9.jpg",
  "img/graphic design/graphic-design8.jpg",
  "img/graphic design/graphic-design7.jpg",
  "img/graphic design/graphic-design6.jpg",
  "img/graphic design/graphic-design5.jpg",
  "img/graphic design/graphic-design4.jpg",
  "img/graphic design/graphic-design3.jpg",
  "img/graphic design/graphic-design2.jpg",
  "img/graphic design/graphic-design1.jpg",
];
const category = [
  "design",
  "web",
  "wordpress",
  "landing",
  "design",
  "design",
  "web",
  "wordpress",
  "landing",
  "wordpress",
  "landing",
  "wordpress",
];
const text = [
  "Graphic Design",
  "Web design",
  "Wordpress Design",
  "Landing Design",
  "Graphic Design",
  "Graphic Design",
  "Web design",
  "Wordpress Design",
  "Landing Design",
  "Wordpress Design",
  "Landing Design",
  "Wordpress Design",
];
function tab(button) {
  button.addEventListener("click", () => {
    let btn = button;
    let category = btn.getAttribute("data-tab");
    let tab = document.querySelector(category);
    if (!btn.classList.contains("active")) {
      serviceButtons.forEach((button) => button.classList.remove("active"));
      serviceCards.forEach((card) => card.classList.remove("active"));
      btn.classList.add("active");
      tab.classList.add("active");
    }
  });
}
serviceButtons.forEach(tab);

function tabWorks(button) {
  button.addEventListener("click", () => {
    let btn = button;
    let category = btn.getAttribute("data-filter");
    let tab = document.querySelector(category);
    if (!btn.classList.contains("active")) {
      workButtons.forEach((button) => button.classList.remove("active"));

      btn.classList.add("active");
    }
  });
}
workButtons.forEach(tabWorks);

let workCards = document.querySelectorAll(".work-gallery-item");

const loaderShow = btnLoader.addEventListener("click", () => {
  btnLoader.style.display = "none";
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    for (let i = 0; i < card.length; i++) {
      const newDiv = document
        .querySelector(".work-gallery-item")
        .cloneNode(true);
      const newImg = newDiv.querySelector(".work-img");
      const h4 = newDiv.querySelector(".work-gallery-item-hover h4");

      newDiv.classList.replace("web", category[i]);
      h4.textContent = text[i];
      newImg.src = card[i];
      workGallery.appendChild(newDiv);
    }
  }, 1000);
});

workButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let workCards = document.querySelectorAll(".work-gallery-item");

    const currentCategory = button.dataset.filter;
    filter(currentCategory, workCards);
    workCards.forEach((card) => {
      card.ontransitionend = function () {
        if (card.classList.contains("anime")) {
          card.classList.add("hide");
        }
      };
    });
  });
});

function filter(category, items) {
  items.forEach((item) => {
    const isItemFiltered = !item.classList.contains(category);
    const isShowAll = category.toLowerCase() === "all";
    if (isItemFiltered && !isShowAll) {
      item.classList.add("anime");
    } else {
      item.classList.remove("hide");
      item.classList.remove("anime");
    }
  });
}

let index = 0;

const activeSlide = (n) => {
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const activeDot = (n) => {
  for (let dot of dots) {
    dot.classList.remove("active");
  }
  dots[n].classList.add("active");
};

const prepareSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};
const nextSlide = () => {
  if (index === slides.length - 1) {
    index = 0;
    prepareSlide(index);
  } else {
    index++;
    prepareSlide(index);
  }
};

const prevSlide = () => {
  if (index === 0) {
    index = slides.length - 1;
    prepareSlide(index);
  } else {
    index--;
    prepareSlide(index);
  }
};
dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareSlide(index);
  });
});
buttonNext.addEventListener("click", nextSlide);
buttonPrev.addEventListener("click", prevSlide);
