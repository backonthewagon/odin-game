// prompt computer for roll
// defaults to returning string
// set param returnInt = true to return raw integer roll instead
//    (for testing probabilities or etc)
// returns string "rock" "paper" or "scissors"
function promptComputer(returnInt = false) {
  let roll = Math.floor(Math.random()*3);

  // return raw integer instead
  if(returnInt === true) return roll;
  
    // return string "rock", "paper" or "scissors"
  if(roll === 0) return `rock`;
  else if(roll === 1) return `paper`;
  else return `scissors`;
}

// prompts user for selection
// handles input sanitizing; loops prompt until receiving valid input
// returns string "rock", "paper" or "scissors"
function promptPlayer() {
  let playerInput;
  
  statusElem.innerText = `Make your choice!`;

  rockButton.onclick = chooseAction();
  paperButton.onclick = chooseAction();
  scissorsButton.onclick = chooseAction();

  return playerInput;
  /*while(true) {
    playerInputRaw = prompt(`Type "rock", "paper" or "scissors":`);
    playerInput = playerInputRaw.toLowerCase();

    // input can only be "rock" "paper" or "scissors"
    // exit loop and return input if valid
    if(playerInput === "rock" || 
    playerInput === "paper" || 
    playerInput === "scissors") return playerInput;
  }*/
}



// Play a single round of rock, paper, scissors
// return "error", "tie", "win" or "lose"
function playRound(playerSel, compSel) {
  // tie condition
  if(playerSel === compSel) return `tie`;
  
  // player win conditions
  if((playerSel === "rock" && compSel === "scissors") || 
    (playerSel === "paper" && compSel === "rock") || 
    (playerSel === "scissors" && compSel === "paper")) {
    return `win`;
  }

  // player lose conditions
  if((playerSel === "rock" && compSel === "paper") || 
    (playerSel === "paper" && compSel === "scissors") || 
    (playerSel === "scissors" && compSel === "rock")) {
    return `lose`;
  }

  // shouldnt get here as long as inputs are expected values
  // log error string `Error: Unexpected round result!`
  return `error`;
}



const chooseAction = function() {
  let playerSel = this.id;
  let compSel = promptComputer();
  let roundLog = ``;
  let gameStatusMsg = ``;

  //console.log(`Round #${rounds+1} - P1: ${playerSel} vs CPU: ${compSel}`);

  roundLog += `Round #${roundsTotal+1} - You selected <strong>${playerSel}</strong>. Computer selected <strong>${compSel}</strong>. `;

  let result = playRound(playerSel, compSel);
  roundsTotal++;
  document.getElementById(`roundstotal`).innerText = `${roundsTotal}`;

  if(result === `win`) {
    roundsWon++;
    document.getElementById(`roundswon`).innerText = `${roundsWon}`;
    roundLog += `<strong>You won!</strong><br />`;
  } else if(result === `lose`) {
    roundsLost++;
    document.getElementById(`roundslost`).innerText = `${roundsLost}`;
    roundLog += `<strong>You lost...</strong><br />`;
  } else if(result === `tie`) {
    roundsTied++;
    document.getElementById(`roundstied`).innerText = `${roundsTied}`;
    roundLog += `<strong>It's a tie!</strong><br />`;
  } else {
    roundLog += `Something went wrong...<br />`;
  }
  

  //gameStatusMsg += `<strong>Won:</strong> ${playerWins}<br /><strong>Lost:</strong> ${compWins}<br /><strong>Tied:</strong> ${ties}<br /><strong>TOTAL:</strong> ${rounds}<br /><br />`;

  if(roundsWon === roundsLost) {
    gameStatusMsg = `You are tied!`;
  } else if(roundsWon > roundsLost) {
    gameStatusMsg = `You're winning!!`;
  } else {
    gameStatusMsg = `You're losing...`;
  }

  document.getElementById(`roundlog`).innerHTML += roundLog;
  document.getElementById(`gamestatus`).innerHTML = gameStatusMsg;
}

let roundsTotal = 0, roundsWon = 0, roundsLost = 0, roundsTied = 0;


document.getElementById(`rock`).onclick = chooseAction;
document.getElementById(`paper`).onclick = chooseAction;
document.getElementById(`scissors`).onclick = chooseAction;


// Run game for a number of rounds (default 3) and return a winner
/*function game(totalRounds = 3, statusElem, roundElem, gameElem) {
  let playerWins = 0, compWins = 0, validRounds = 0, ties = 0, errors = 0;
  let roundResult, gameResult;

  // iterate through each round and count wins, losses, ties, errors
  // validRounds counts all non-error rounds
  // TODO?: maybe change error behavior to instead repeat
  //  the round iteration until getting a valid round?
  //  i.e. in case `error` or default, subtract 1 from i
  for(let i = 0; i < totalRounds; i++) {
    // get computer and player choices
    roundResult = playRound(promptPlayer(), promptComputer());

    // increase appropriate counter(s) based on round result
    switch(roundResult) {
      case `tie`:
        ties++;
        validRounds++;
        break;
      case `win`:
        playerWins++;
        validRounds++;
        break;
      case `lose`:
        compWins++;
        validRounds++;
        break;
      case `error`:
        // repeat round iteration
        errors++;
        break;
      default:
        // repeat round iteration
        errors++;
    }

    console.log(roundResult);
  }

  if(playerWins === compWins) {
    gameResult = `tie`;
    console.log(`A stalemate! Rounds won: ${playerWins} - Rounds lost: ${compWins} - Ties: ${ties} - Total rounds: ${validRounds}`);
  } else if(playerWins > compWins) {
    gameResult = `win`;
    console.log(`Congrats - you win! Rounds won: ${playerWins} - Rounds lost: ${compWins} - Ties: ${ties} - Total rounds: ${validRounds}`);
  } else {
    gameResult = `lose`;
    console.log(`Oh no! You lose. Rounds won: ${playerWins} - Rounds lost: ${compWins} - Ties: ${ties} - Total rounds: ${validRounds}`);
  }

  return gameResult;
}*/

// testing function to calculate probabilities
// for promptComputer() rolls
// prints string of calculated probabilities
// over totalRolls iterations
function testRolls(totalRolls) {
  let rollResult;
  let prob0, prob1, prob2;
  let r0 = 0, r1 = 0, r2 = 0, rErr = 0;

  for(let i = 0; i < totalRolls; i++) {
    rollResult = promptComputer();

    if(rollResult === `rock`) r0++;
    else if(rollResult === `paper`) r1++;
    else if(rollResult === `scissors`) r2++;
    else rErr++;
  }

  prob0 = Math.round(r0 * 100 / totalRolls);
  prob1 = Math.round(r1 * 100 / totalRolls);
  prob2 = Math.round(r2 * 100 / totalRolls);

  return `Rock: ${prob0}% - Paper: ${prob1}% - Scissors: ${prob2}% --- Errs: ${rErr}`;
}