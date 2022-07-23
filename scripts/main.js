function promptComputer() {
  let roll = Math.floor(Math.random()*3);
  
  return (roll === 0)? `rock`
       : (roll === 1)? `paper`
       : `scissors`;
}

// Play a single round of rock, paper, scissors
function playRound(playerChoice, compChoice) {
  if(playerChoice === compChoice) return `tie`;
  
  // player win conditions
  if((playerChoice === "rock" && compChoice === "scissors") || 
    (playerChoice === "paper" && compChoice === "rock") || 
    (playerChoice === "scissors" && compChoice === "paper"))
    return `win`;

  // player lose conditions
  if((playerChoice === "rock" && compChoice === "paper") || 
    (playerChoice === "paper" && compChoice === "scissors") || 
    (playerChoice === "scissors" && compChoice === "rock"))
    return `lose`;

  return `error`;
}

// check to see if game end conditions have been met
function checkGameEnd() {
  if(roundsWon < roundsToWin && roundsLost < roundsToWin)
    return false;
  
  gamePlayState = false;
  return (roundsWon >= roundsToWin) ? `win` : `lose`;
}

//const chooseAction = function() {
function chooseAction() {
  let roundLog = ``;
  let gameStatus = ``;

  // if game has not ended, process the round
  if(gamePlayState === true) {
    let playerChoice = this.id;
    let compChoice = promptComputer();
    let result = playRound(playerChoice, compChoice);

    roundLog += `<strong>Round #${++roundsTotal}</strong> - You played 
      <strong>${playerChoice}</strong>, `;

    if(result === `win`) {
      divRoundsWon.innerText = `${++roundsWon}`;
      roundLog += `which beat computer's <strong>${compChoice}</strong>!<br />`;
    } else if(result === `lose`) {
      divRoundsLost.innerText = `${++roundsLost}`;
      roundLog += `which was beaten by computer's <strong>${compChoice}</strong>.<br />`;
    } else if(result === `tie`) {
      roundsTied++;
      roundLog += `resulting in a tie with computer!<br />`;
    } else {
      roundLog += `Something went wrong...<br />`;
    }

    // done incrementing round tallies so
    // test if game end condition has been met
    let gameEndCheck = checkGameEnd();

    if(gameEndCheck === `win`) {
      gameStatus = `GAME OVER - You won!`;
      roundLog += `<strong>Congratulations - You won the game!</strong> Reset to play again!`;
    } else if(gameEndCheck === `lose`) {
      gameStatus = `GAME OVER - You lost.`;
      roundLog += `<strong>Game Over - You lost...</strong> Reset to play again!`;
    } else { // game end condition not met
      gameStatus = (roundsWon === roundsLost)? `You are tied!`
                 : (roundsWon > roundsLost)? `You're winning!`
                 : `You're losing...`;
    }
  } else { // game already ended and must be reset
    gameStatus = `Press RESET to start a new game!`;
  }

  divRoundLog.innerHTML += roundLog;
  divGameStatus.innerHTML = gameStatus;
}

// resets game state and UI along with updating
// roundsToWin to the currently selected value
function resetGame() {
  gamePlayState = true;
  roundsTotal = 0, roundsWon = 0, roundsLost = 0, roundsTied = 0;
  roundsToWin = selectedRoundsToWin;

  divRoundLog.innerHTML = ``;
  divGameStatus.innerHTML = `New game! First to take ${roundsToWin} rounds, wins!`;
  divRoundsWon.innerHTML = `0`;
  divRoundsLost.innerHTML = `0`;
}

function incrementRoundsToWin() {
  if(selectedRoundsToWin < maxRoundsToWin) {
    selectedRoundsToWin++;
  } else {
    selectedRoundsToWin = maxRoundsToWin;
    divGameStatus.innerHTML = `Maximum of ${maxRoundsToWin} rounds!`;
  }

  divRoundsToWin.innerHTML = `${selectedRoundsToWin}`;
}

function decrementRoundsToWin() {
  if(selectedRoundsToWin > minRoundsToWin) {
    selectedRoundsToWin--;
  } else {
    selectedRoundsToWin = minRoundsToWin;
    divGameStatus.innerHTML = `Minimum of ${minRoundsToWin} round!`;
  }

  divRoundsToWin.innerHTML = `${selectedRoundsToWin}`;
}

let roundsToWin = 5;
let gamePlayState = true;
let roundsTotal = 0, roundsWon = 0, roundsLost = 0, roundsTied = 0;
let selectedRoundsToWin = roundsToWin;
const minRoundsToWin = 1;
const maxRoundsToWin = 20;

const divRoundLog = document.getElementById(`roundlog`);
const divGameStatus = document.getElementById(`gamestatus`);
const divRoundsToWin = document.getElementById(`roundstowin`);
const divRoundsWon = document.getElementById(`roundswon`);
const divRoundsLost = document.getElementById(`roundslost`);

const buttonRock = document.getElementById(`rock`);
const buttonPaper = document.getElementById(`paper`);
const buttonScissors = document.getElementById(`scissors`);
const buttonReset = document.getElementById(`reset`);
const buttonIncrementRounds = document.getElementById(`incrementrounds`);
const buttonDecrementRounds = document.getElementById(`decrementrounds`);

buttonRock.onclick = chooseAction;
buttonPaper.onclick = chooseAction;
buttonScissors.onclick = chooseAction;

buttonReset.onclick = resetGame;

buttonIncrementRounds.onclick = incrementRoundsToWin;
buttonDecrementRounds.onclick = decrementRoundsToWin;