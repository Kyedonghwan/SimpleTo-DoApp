const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(i) {
  const image = new Image();
  image.src = `images/${i + 1}.jpg`;
  image.classList.add("bg-Image");
  body.prepend(image);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
