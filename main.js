import "./style.css";

// images links
const images = [
  "./images/image5.jpg",
  "./images/image1.jpg",
  "./images/image2.jpg",
  "./images/image3.jpg",
  "./images/image4.jpg",
  "./images/image5.jpg",
  "./images/image1.jpg",
];

// selectors
const slides = document.querySelector(".slide");
const nextBtn = document.querySelector(".slider__btn--right");
const previousBtn = document.querySelector(".slider__btn--left");
const navigationBar = document.querySelector(".navigation__bar");

// class declaration
class ImageSlider {
  constructor(slide, images, document, indicatorsContainer) {
    this.slide = slide;
    this.images = images;
    this.slideIndex = 1;
    this.document = document;
    this.isTransition = false;
    this.indicatorsContainer = indicatorsContainer;
  }

  //populates images to dom
  generateImages = () => {
    this.slide.innerHTML = this.images
      .map((v) => {
        return `<img src="${v}">`;
      })
      .join("");
  };

  //populate indicators
  generateIndicators() {
    const removeClonedImages = [...this.images];
    removeClonedImages.shift();
    removeClonedImages.pop();

    this.indicatorsContainer.innerHTML = removeClonedImages
      .map((v, index) => {
        return `<button class="navigation__indicators" id="${index}"></button>`;
      })
      .join("");
    // return a;
  }

  // move images
  moveSlide = () => {
    console.log(this.slideIndex);
    this.slide.style.transform = `translateX(-${this.slideIndex * 100}%)`;
  };

  // onclick
  moveHandler(direction) {
    this.isTransition = true;
    this.slide.style.transition = "transform .6s ease-in-out";
    if (direction === "right") {
      this.slideIndex += 1;
      this.moveSlide();
    } else if (direction === "left") {
      this.slideIndex -= 1;
      this.moveSlide();
    }
    this.showActiveIndicator();
  }

  //infinite-slider
  inifiniteSlide() {
    this.isTransition = false;
    if (this.slideIndex === 0) {
      this.slide.style.transition = "none";
      this.slideIndex = this.images.length - 2;
      this.moveSlide();
    } else if (this.slideIndex === this.images.length - 1) {
      this.slide.style.transition = "none";
      this.slideIndex = 1;
      this.moveSlide();
    }
  }

  indicator(e) {
    let id = Number(e.target.id);
    this.slideIndex = id + 1;
    this.slide.style.transition = "transform .6s ease-in-out";
    this.moveSlide();
    this.showActiveIndicator();
  }

  showActiveIndicator() {
    const indicators = this.document.querySelectorAll(
      ".navigation__indicators"
    );
    indicators.forEach((v) => {
      v.classList.remove("active");
    });
    switch (this.slideIndex) {
      case 0:
        indicators[indicators.length - 1].classList.add("active");
        break;
      case this.images.length - 1:
        indicators[0].classList.add("active");
        break;
      default:
        indicators[this.slideIndex - 1].classList.add("active");
        break;
    }
  }
}

// instance
const slider = new ImageSlider(slides, images, document, navigationBar);

// initialisation
slider.generateImages();
slider.moveSlide();
slider.generateIndicators();
slider.showActiveIndicator();

//event listers handlers;
nextBtn.addEventListener("click", () => {
  if (slider.isTransition) return;
  slider.moveHandler("right");
});

previousBtn.addEventListener("click", () => {
  if (slider.isTransition) return;
  slider.moveHandler("left");
});

slides.addEventListener("transitionend", () => {
  slider.inifiniteSlide();
});

// console.log(indicators, "d");

const indicators = document.querySelectorAll(".navigation__indicators");
indicators.forEach((v) => {
  v.addEventListener("click", (e) => {
    slider.indicator(e);
  });
});
