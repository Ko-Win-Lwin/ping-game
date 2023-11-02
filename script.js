"use strict";

const currentScoreOfPlayerOne = document.getElementById("current--0");
const currentScoreOfPlayerTwo = document.getElementById("current--1");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const diceElement = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // start with player one
  playing = true;

  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");

  playerOne.classList.remove("player--active");
  playerTwo.classList.remove("player--active");
  playerOne.classList.add("player--active");

  currentScoreOfPlayerOne.textContent = 0;
  currentScoreOfPlayerTwo.textContent = 0;

  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
}
init();

// switch player functionality
function switchActivePlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
}

// rolling dice functionality
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;
    console.log(dice);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// hold button functionality
document.querySelector(".btn--hold").addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      switchActivePlayer();
    }
  }
});

// new game button functionality
document.querySelector(".btn--new").addEventListener("click", init);
