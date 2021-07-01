"use strict";

const paletteItems = document.querySelectorAll(".palette-box-item");
const inputColor = document.getElementById("color");

let currentIndex = 0;
let colors = [];

paletteItems.forEach((paletteItem, index) => {
  paletteItem.addEventListener("click", () => {
    currentIndex = index + 1;
    inputColor.value = colors[index];
  });
});

const saveColors = () => {
  localStorage.setItem("colors", JSON.stringify(colors));
};

const readColor = () => {
  colors = JSON.parse(localStorage.getItem("colors"));

  paletteItems.forEach((paletteItem, index) => {
    setColor(document.getElementById(`item-${index + 1}`), colors[index]);
  });
};

const setColor = (paletteItem, color) => {
  paletteItem.style.backgroundColor = color;
  colors[currentIndex - 1] = color;
  saveColors();
};

const getColor = () => {
  const color = inputColor.value;
  return color;
};

const initSetColor = () => {
  inputColor.addEventListener("input", () => {
    setColor(document.getElementById(`item-${currentIndex}`), getColor());
  });
};

const showColorInput = () => {
  paletteItems.forEach((paletteItem) => {
    paletteItem.addEventListener("click", () => {
      document
        .querySelector(".color-picker-box")

        .classList.add("color-picker-box--active");
      document.querySelector(".color-input").select();
      document.querySelector(".color-input").click();
    });
  });
};

document.querySelector(".color-input").addEventListener("blur", () => {
  document
    .querySelector(".color-picker-box")

    .classList.remove("color-picker-box--active");
});

showColorInput();
initSetColor();
readColor();
