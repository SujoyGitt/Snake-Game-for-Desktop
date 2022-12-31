"use strict";
//game contants & variables
let gamescore = document.getElementById("score");
let inputDir = { x: 0, y: 0 };
let foodsound = new Audio("bite.mp3");
let gameover = new Audio("game over.mp3");
let movesound = new Audio("bite.mp3");
let musicsound = new Audio("backgrond music.mp3");
let board = document.getElementById("board");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArry = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

//game function
let main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameinging();
};

//if you bump into yourself
function isColide(snake) {
  for (let i = 1; i < snakeArry.length; i++) {
    console.log(snake[i].y);
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if you bump into wall
  if (snake[0].x >= 19 ||snake[0].x <= 0 ||snake[0].y >= 19 ||snake[0].y <= 0) {
    return true;
  }
}
let showalert=document.querySelector('.alert');
function gameinging() {
  // part1 : upadating the snake array & food
  if (isColide(snakeArry)) {
    gameover.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    snakeArry = [{ x: 13, y: 15 }];
    score = 0;
    showalert.classList.add('show');
    setTimeout(() => {
      showalert.classList.remove('show')
    }, 2000);
  }
    

  //if you have eaten the food, increment the score and regenerate th food
  if (snakeArry[0].y === food.y && snakeArry[0].x === food.x) {
    foodsound.play();
    snakeArry.unshift({
      x: snakeArry[0].x + inputDir.x,
      y: snakeArry[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      hiscore = localStorage.setItem("Hiscore", JSON.stringify(hiscoreval));
      document.getElementById(
        "highscore"
      ).innerHTML = `Highest score : ${hiscoreval}`;
    }
    gamescore.innerHTML = `score : ${score}`;
  }
  //moving the snake
  for (let i = snakeArry.length - 2; i >= 0; i--) {
    snakeArry[i + 1] = { ...snakeArry[i] };
  }
  snakeArry[0].x += inputDir.x;
  snakeArry[0].y += inputDir.y;
  //part2 : randar the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArry.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//main logic starts here
let hiscore = localStorage.getItem("Hiscore");
let hiscoreval = 0;
if (hiscore === null) {
  hiscore = localStorage.setItem("Hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(localStorage.getItem(hiscore));
  document.getElementById("highscore").innerHTML = `Highest score : ${hiscore}`;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    
    default:
      break;
  }
});
inputDir = { x: 0, y: 1 }; //start the game

document.querySelector('.btntop').addEventListener('click',()=>{
  inputDir.x = 0;
      inputDir.y = -1;
})
document.querySelector('.btndown').addEventListener('click',()=>{
  inputDir.x = 0;
  inputDir.y = 1;
})
document.querySelector('.btnleft').addEventListener('click',()=>{
  inputDir.x = -1;
  inputDir.y = 0;
})
document.querySelector('.btnright').addEventListener('click',()=>{
  inputDir.x = 1;
  inputDir.y = 0;
})