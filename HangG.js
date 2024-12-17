// Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const gameTitle = document.getElementById("game-title");
const timerDisplay = document.getElementById("timer");

// Options values for buttons
let options = {
  fruits: ["Apple", "Banana", "Orange", "Grape", "Pear", "Mango", "Pineapple", "Peach", "Kiwi", "Plum"],
  animals: ["Zebra", "Kangaroo", "Penguin", "Cheetah", "Alligator", "Peacock", "Ostrich", "Sloth", "Rhinoceros", "Armadillo"],
  countries: ["Canada", "Australia", "Brazil", "Japan", "Germany", "Italy", "Mexico", "India", "South Africa", "Argentina", "China", "Thailand", "Indonesia", "Vietnam", "Pakistan"],
};

let winCount = 0;
let count = 0;
let chosenWord = "";
let timer;
let timeLeft = 90; // Set timer to 120 seconds

// Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

// Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Initially hide the letter container and reset the user input section
  letterContainer.classList.add("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;

  letterContainer.classList.remove("hide"); // Show the letters now

  startTimer(); // Start the timer when the word is generated
};

// Timer function
const startTimer = () => {
  timeLeft = 90; // Reset timer to 120 seconds
  timerDisplay.innerText = `Time Left: ${timeLeft}s`; // Display the timer

  // Clear any existing timers
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      resultText.innerHTML = `<h2 class='lose-msg'>Time's Up! You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
    }
  }, 1000);
};

// Initial Function
const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

// Handle letter input with the keyboard
window.addEventListener("keydown", (event) => {
  const pressedKey = event.key.toUpperCase();

  if (pressedKey >= "A" && pressedKey <= "Z") {
    handleLetterClick(pressedKey);
  }
});

// Handle letter clicks (refactored to handle keyboard input as well)
const handleLetterClick = (key) => {
  let charArray = chosenWord.split("");
  let dashes = document.getElementsByClassName("dashes");

  if (charArray.includes(key)) {
    charArray.forEach((char, index) => {
      if (char === key) {
        dashes[index].innerText = char;
        winCount += 1;
        if (winCount === charArray.length) {
          resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);
    if (count === 6) {
      resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
      blocker();
    }
  }
};

// Canvas for drawing
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;