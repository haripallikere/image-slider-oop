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
    this.document = document;
    this.isTransition = false;
    this.indicatorsContainer = indicatorsContainer;
    this.slideIndex = 1;
  }

  //populates images to dom
  generateImages() {
    this.images.map((v, i) => {
      const img = this.document.createElement("img");
      if (i <= 1) {
        img.setAttribute("id", `${i}`);
        img.setAttribute("src", `${v}`);
      } else {
        img.setAttribute("id", `${i}`);
        img.setAttribute("class", "lazy");
        img.setAttribute("data-src", `${v}`);
      }
      this.slide.append(img);
    });
  }

  //populate indicators
  generateIndicators() {
    const removeClonedImages = [...this.images];
    removeClonedImages.shift();
    removeClonedImages.pop();
    removeClonedImages.map((v, index) => {
      let btn = this.document.createElement("button");
      btn.setAttribute("class", "navigation__indicators");
      btn.setAttribute("id", `${index}`);
      this.indicatorsContainer.append(btn);
    });
  }

  // move images
  moveSlide() {
    this.lazyLoading();
    this.slide.style.transform = `translateX(-${this.slideIndex * 100}%)`;
  }

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

  lazyLoading() {
    let unloadedImg = this.document.querySelectorAll("img.lazy");
    if (this.slideIndex >= 2 && unloadedImg[this.slideIndex - 2].src === "") {
      unloadedImg[this.slideIndex - 2].src =
        unloadedImg[this.slideIndex - 2].dataset.src;
    }
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

const indicators = document.querySelectorAll(".navigation__indicators");
indicators.forEach((v) => {
  v.addEventListener("click", (e) => {
    slider.indicator(e);
  });
});
