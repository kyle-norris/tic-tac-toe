import _ from "underscore";

export const WIN_SCENARIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinner(gameState) {
  var winner = [];
  WIN_SCENARIOS.forEach((s) => {
    if (
      gameState[s[0]] == gameState[s[1]] &&
      gameState[s[1]] == gameState[s[2]]
    ) {
      winner = s;
    }
  });
  return winner;
}

function getScore(gameState, player, opponent, depth = 0) {
  var winner = getWinner(gameState);
  if (winner.length > 0) {
    if (gameState[winner[0]] == player) {
      return 10 - depth;
    }
    if (gameState[winner[0]] == opponent) {
      return -10 + depth;
    }
  }
  return 0;
}

function getAvailableMoves(gameState) {
  var idxs = []; // indexes of available moves
  gameState.forEach((location, idx) => {
    if (location !== "x" && location !== "o") {
      idxs.push(idx);
    }
  });
  return idxs;
}

function getNewGameState(location, gameState, player) {
  return gameState.toSpliced(location, 1, player);
}

export class Computer {
  constructor(computerVal) {
    this.player = computerVal == "x" || computerVal == "o" ? computerVal : "x";
    this.opponent = computerVal == "x" ? "o" : "x";
  }

  minimax(gameState, depth, isMax) {
    // console.log(`-------- Minimax: ${gameState}`)
    var score = getScore(gameState, this.player, this.opponent, depth);
    if (score != 0) {
      return score;
    }

    var movesLeft = getAvailableMoves(gameState);
    if (movesLeft.length <= 0) {
      return 0;
    }

    if (isMax) {
      var best = -1000;

      movesLeft.forEach((move) => {
        var newGameState = getNewGameState(move, gameState, this.player);
        best = Math.max(best, this.minimax([...newGameState], depth + 1, !isMax));
      })

      return best;
    } else {
      var best = 1000;

      movesLeft.forEach((move) => {
        var newGameState = getNewGameState(move, gameState, this.opponent);
        best = Math.min(best, this.minimax([...newGameState], depth + 1, !isMax));
      })

      return best;
    }
  }


  getBestMove(gameState, difficulty = "hard") {
    let resultScores = [];
    let resultMoves = [];
    var moves = getAvailableMoves(gameState);
    moves.forEach((move) => {
      var newGameState = getNewGameState(move, gameState, this.player);
      var moveVal = this.minimax(newGameState, 0, false);
      
      resultScores.push(moveVal);
      resultMoves.push(move);
    })

    console.log(`${resultMoves}: ${resultScores}`)

    if (difficulty == "hard") {
      var maxVal = Math.max(...resultScores);
      var goodMoves = resultMoves.filter((_, idx) => resultScores[idx] == maxVal);
      return _.sample(goodMoves);
    }

    if (difficulty == "easy") {
      var val = null;
      var unique = new Set(resultScores);
      if (unique.size < 2) {
        val = [...unique][0];
      } else {
        const sorted = [...unique].sort();
        val = sorted[sorted.length - 2];
      }
      var goodMoves = resultMoves.filter((_, idx) => resultScores[idx] == val);
      return _.sample(goodMoves);
    }
    
    
  }
}
