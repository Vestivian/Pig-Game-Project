'use strict';
// Pull at the elements you need at the beginning and assign them to variables
const player0ELe = document.querySelector(`.player--0`);
const player1ELe = document.querySelector(`.player--1`);

const currentScore0El = document.getElementById(`current--0`);
const currentScore1El = document.getElementById(`current--1`);

const score0Element = document.getElementById(`score--0`);
const score1Element = document.getElementById(`score--1`);

const diceElement = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
//const btnInstruct = document.querySelector //they're classes both of them

//Starting Set-up

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceElement.classList.add(`hidden`);
  player0ELe.classList.remove(`player--winner`);
  player1ELe.classList.remove(`player--winner`);
  player0ELe.classList.add(`player--active`);
  player1ELe.classList.remove(`player--active`);
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0ELe.classList.toggle(`player--active`);
  player1ELe.classList.toggle(`player--active`);
};

//Dice Rolling Functionality

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceElement.classList.remove(`hidden`);
    diceElement.src = `dice-${dice}.png`;
    // 3. Switch Player if the # is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //Updates Active Player's global score with current score total
    //same as score[i], your only assigning or re-assigning indexes at position 0 or 1
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceElement.classList.add(`hidden`);
      document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
      document.querySelector(`player--${activePlayer}`).classList.remove(`player--active`);
    } else {
      //Switches to the other player
      switchPlayer();
    }
  }
});

//New Game

btnNew.addEventListener(`click`, init);
