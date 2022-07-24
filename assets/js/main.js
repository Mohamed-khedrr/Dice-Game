// Html elements
const totalScore1 = document.querySelector("#total-score1");
const totalScore2 = document.querySelector("#total-score2");
const currentScore1 = document.querySelector("#current-score-1");
const currentScore2 = document.querySelector("#current-score-2");
const newGameButton = document.querySelector("#new-game");
const rollDiceButton = document.querySelector("#roll-dice");
const holdButton = document.querySelector("#hold-button");
const dicePic = document.querySelector("#dice");
const playerOneContainer = document.querySelector(".left-side");
const playerTwoContainer = document.querySelector(".right-side");
const winningWord = document.querySelector(".winner");
// === colors
const lightedColor = "rgba(255, 255, 255, 0.7)";
const darkColor = "rgba(255, 255, 255, 0.5)";

let player1 = {
  name: "player 1",
  current: 0,
  total: 0,
  totalScore: totalScore1,
  currentScore: currentScore1,
  container: playerOneContainer,
};
let player2 = {
  name: "player 2",
  current: 0,
  total: 0,
  totalScore: totalScore2,
  currentScore: currentScore2,
  container: playerTwoContainer,
};
// set the currentplayer initally to player1
let currentPlayer = player1;

// Start a New Game
function newGame() {
  if (currentPlayer != player1) {
    switchPlayer();
  }
  player1.current = 0;
  player1.currentScore.innerHTML = 0;
  player1.total = 0;
  player1.totalScore.innerHTML = 0;
  player2.current = 0;
  player2.currentScore.innerHTML = 0;
  player2.total = 0;
  player2.totalScore.innerHTML = 0;
  winningWord.style.display = "none";
  rollDiceButton.style.display = "inline";
  holdButton.style.display = "inline";
  dicePic.style.display = "inline";
  player1.container.style.display = "flex";
  player2.container.style.display = "flex";
}

// ==== this function handle the roll Dice Action ====

function play() {
  let dice = Math.ceil(Math.random() * 6);
  dicePic.src = `./assets/photos/${dice}.png`;
  if (dice === 1) {
    // Switch ...
    clearCurrentScore();
    switchPlayer();
  } else {
    currentPlayer.current = currentPlayer.current + dice;
    displayCurrentScore();
  }
}

// hold function sets the total Score
function hold() {
  currentPlayer.total = currentPlayer.current + currentPlayer.total;
  currentPlayer.totalScore.innerHTML = currentPlayer.total;
  clearCurrentScore();
  if (currentPlayer.total >= 100) {
    winning(currentPlayer);
  } else {
    switchPlayer();
  }
}

// this function switch turns
function switchPlayer() {
  let oldPlayer;
  let newPlayer;
  if (currentPlayer == player1) {
    oldPlayer = player1;
    newPlayer = player2;
  } else {
    oldPlayer = player2;
    newPlayer = player1;
  }
  oldPlayer.container.style.backgroundColor = darkColor;
  newPlayer.container.style.backgroundColor = lightedColor;
  currentPlayer = newPlayer;
}

// this funciton displayes the current player Score
function displayCurrentScore() {
  currentPlayer.currentScore.innerHTML = currentPlayer.current;
}
// clear Current Score when one appear
function clearCurrentScore() {
  currentPlayer.current = 0;
  currentPlayer.currentScore.innerHTML = 0;
}

// Winning function
function winning(winner) {
  let loser = winner == player1 ? player2 : player1;
  loser.container.style.display = "none";
  rollDiceButton.style.display = "none";
  holdButton.style.display = "none";
  dicePic.style.display = "none";
  winningWord.style.display = "block";
}

// ==== Click Buttons Events ====
rollDiceButton.addEventListener("click", play);
holdButton.addEventListener("click", hold);
newGameButton.addEventListener("click", newGame);
newGame();
