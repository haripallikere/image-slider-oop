import "./style.css";

// images
const images = [
  "images/image5.jpg",
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
  "images/image5.jpg",
  "images/image1.jpg",
];

// selectors
const slides = document.querySelector(".slide");
const nextBtn = document.querySelector(".slider__btn--right");
const previousBtn = document.querySelector(".slider__btn--left");

// class declaration
class ImageSlider {
  constructor(slide, images, document) {
    this.slide = slide;
    this.images = images;
    this.slideIndex = 1;
    this.document = document;
    this.isTransition = false;
  }

  //populates images to dom
  generateImages = () => {
    this.slide.innerHTML = this.images
      .map((v) => {
        return `<img src="${v}">`;
      })
      .join("");
  };

  // move images
  moveSlide = () => {
    // if (this.isTransition) {
    //   return;
    // }
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
}

// instance
const slider = new ImageSlider(slides, images, document);

// initialisation
slider.generateImages();
slider.moveSlide();

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
