const playBtn = document.getElementById("play-btn");
const winWindow = document.getElementById("win-window");
const playAgainBtn = document.getElementById("play-again-btn");
const gameBlock = document.getElementById("game");
const cards = document.querySelectorAll(".card");
const score = document.getElementById("score");
const scoreCount = document.getElementById("score-count");
const stepCount = document.getElementById("step-count");

let sroceNumber = 0;
let stepNumber = 0;
score.innerText = "Score: " + sroceNumber;

const activeCards = [
  {
    id: 0,
    name: "",
    indx: null,
  },
  {
    id: 1,
    name: "",
    indx: null,
  },
];

function generateRandomDigits() {
  const digits = [];

  for (let i = 1; i <= 8; i++) {
    digits.push(i, i);
  }

  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }

  for (let card = 0; card < cards.length; card++) {
    cards[card].value = digits[card];
    cards[card].classList.add("card" + digits[card]);
  }
}
generateRandomDigits();

playBtn.addEventListener("click", function () {
  playBtn.classList.add("clicked");
  gameBlock.classList.add("active");
});

const reset = () => {
  stepNumber += 1;
  for (let c = 0; c < cards.length; c++) {
    cards[c].classList.remove("active");
    indx = null;
  }
  for (let c = 0; c < activeCards.length; c++) {
    (activeCards[c].id = 0), (activeCards[c].name = "");
    indx = null;
  }
};

const checkCards = () => {
  if (
    activeCards[0].name === activeCards[1].name &&
    activeCards[0].indx !== activeCards[1].indx
  ) {
    sroceNumber += 1;
    score.innerText = "Score: " + sroceNumber;

    activeCards.map((act) => {
      cards[act.indx].classList.add("ok");
    });
    setTimeout(reset, 500);
  } else {
    setTimeout(reset, 500);
  }
};

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {
    if (activeCards[0].name === "") {
      activeCards[0].name = cards[i].value;
      cards[i].classList.add("active");
      activeCards[0].indx = i;
    } else if (activeCards[1].name === "") {
      activeCards[1].name = cards[i].value;
      cards[i].classList.add("active");
      activeCards[1].indx = i;
      checkCards();
      if (sroceNumber >= 8) {
        scoreCount.innerText = sroceNumber;
        stepCount.innerText = stepNumber;
        winWindow.classList.add("active");
        gameBlock.classList.remove("active");
      }
    }
  });
}

playAgainBtn.addEventListener("click", function () {
  window.location.reload();
});
