// computer rolls
// default behavior is to return string result
// set param returnInt = true to return raw integer roll instead
//    (for testing probabilities or etc)
// returns string "rock" "paper" or "scissors"
function computerPlay(returnInt = false) {
  let roll = Math.floor(Math.random()*3);

  // return raw integer instead
  if(returnInt === true)
    return roll;
  
    // return string "rock", "paper" or "scissors"
  if(roll === 0)
    return "rock";
  else if(roll === 1)
    return "paper";
  else
    return "scissors";
}

// Play a round of rock, paper, scissors and return a string with the result text
// if returnSimple = true instead returns "error", "tie", "win" or "lose"
function playRound(playerSelInput, compSel, returnSimple = false) {
  // prep selections
  let playerSel = playerSelInput.toLowerCase();
  if(!compSel) compSel = computerPlay();

  // error condition if player didn't pick rock/paper/scissors
  if(playerSel !== "rock" && playerSel !== "paper" && playerSel !== "scissors") {
     return (returnSimple ? `error` : `Error: Input "${playerSelInput}", expecting "rock", "paper" or "scissors".`);
  }

  // tie condition
  if(playerSel === compSel)
    return (returnSimple ? `tie` : `A tie! You and the computer both picked ${playerSel}!`);
  
  // player win conditions
  if((playerSel === "rock" && compSel === "scissors") || 
    (playerSel === "paper" && compSel === "rock") || 
    (playerSel === "scissors" && compSel === "paper")) {
    return (returnSimple ? `win` : `Congratulations! You picked ${playerSel} which beat computer's ${compSel}!`);
  }

  // player lose conditions
  if((playerSel === "rock" && compSel === "paper") || 
    (playerSel === "paper" && compSel === "scissors") || 
    (playerSel === "scissors" && compSel === "rock")) {
    return (returnSimple ? `lose` : `You lost! Computer picked ${compSel} which beat your ${playerSel}!`);
  }

  // shouldn't get here, but just in case
  return (returnSimple ? `error` : `Error: Unexpected result!`);
}

// Run game for a number of rounds (default 5) and return a winner
function game(rounds = 5) {
  let playerWins = 0, compWins = 0, ties = 0, errors = 0;
  let playerInput, compInput, gameResult;

  for(let i = 0; i < rounds; i++) {
    // get computer and player choices
    compInput = computerPlay();
    playerInput = prompt(`Type "rock", "paper" or "scissors":`);

    gameResult = playRound(playerInput, compInput, true);

    switch(gameResult) {
      case "tie":
        ties++;
        break;
      case "win":
        playerWins++;
        break;
      case "lose":
        compWins++;
        break;
      case "error":
        errors++;
        break;
      default:
        errors++;
    }

    console.log(gameResult);
  }

  console.log(`Wins: ${playerWins} Losses: ${compWins} Ties: ${ties} Errors: ${errors}`);
}

game();

/*function playRound(playerSelStr, compSel) {
  let playerSelLower = playerSelString.toLowerCase();
  let playerSel;

  if(playerSelLower === "rock") {
    playerSel = 0;
  } else if(playerSelLower === "paper") {
    playerSel = 1;
  } else if(playerSelLower === "scissors") {
    playerSel = 2;
  } else {
    // Error condition - invalid player input
    return "Error";
  }

  // Rock (0) beats Scissors (2) 0 >>> 2
  // Paper (1) beats Rock (0) 1 >>> 0
  // Scissors (2) beats Paper (1) - 2 >>> 1
  if((playerSel === 0 && compSel === 2) || (playerSel === 1 &&& compSel === 0) || (playerSel === 2 && compSel === 1)) {
    // Player wins
    return "You won!";
  }
}*/

function testRolls(totalRolls) {
  let rollResult;
  let r0 = 0;
  let r1 = 0;
  let r2 = 0;
  let rErr = 0;

  for(let i = 0; i < totalRolls; i++) {
    rollResult = computerPlay(true);

    if(rollResult === 0) {
      r0++;
    } else if(rollResult === 1) {
      r1++;
    } else if(rollResult === 2) {
      r2++;
    } else {
      rErr++;
    }
  }

  let prob0 = Math.round(r0 * 100 / totalRolls);
  let prob1 = Math.round(r1 * 100 / totalRolls);
  let prob2 = Math.round(r2 * 100 / totalRolls);

  return `Rock: ${prob0}% - Paper: ${prob1}% - Scissors: ${prob2}% --- Errs: ${rErr}`;
}