const leftOverlay = document.getElementById("leftOverlay");
const rightOverlay = document.getElementById("rightOverlay");

const topTotalNumCells = 70;
const steps = 5;

const cellSize = innerWidth / (topTotalNumCells * 2);

const randomNum = (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start - 1;
};

const randomColor = () => {
  return `rgb(${randomNum(50, 255)},${randomNum(50, 255)}, ${randomNum(
    50,
    255
  )})`;
};

const loadOverlay = () => {
  let htmlText = '';

  for (let i = topTotalNumCells; i > 0; i -= steps) {
    htmlText += '<div style="display:flex; align-items:center;">';

    for (let j = 0; j < i; j++) {
      htmlText += `<div style="width:${cellSize}px; height:${cellSize}px; background-color:${randomColor()};"></div>`;
    }

    htmlText += "</div>";
  }

  leftOverlay.innerHTML = htmlText;
  rightOverlay.innerHTML = htmlText;
};

loadOverlay()
