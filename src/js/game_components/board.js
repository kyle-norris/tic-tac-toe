import { Tile } from "./tile";
import {getWinner, Computer} from "./brains";
import { settings } from "../app";



export class Board {
  constructor(onWinner) {
    this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.tiles = [];
    this.changePlayerCharacter();
    this.computer = new Computer(this.computerPlayer);
    this.gameOver = false;
    this.createTiles();
    this.playerScoreId = "#score-player";
    this.computerScoreId = "#score-computer";
    this.playerScore = 0;
    this.computerScore = 0;
    this.ties = 0;
    this.onWinner = onWinner;
  }

  move(location, player) {
    this.state.splice(location, 1, player);
    this.togglePlayer();
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer == "x" ? "o" : "x";
  }

  changePlayerCharacter() {
    this.currentPlayer = settings.playerCharacter;
    this.userPlayer = settings.playerCharacter;
    this.computerPlayer = settings.playerCharacter == "x" ? "o" : "x";
  }

  isValidMove(location) {
    return this.state[location] !== "x" && this.state[location] !== "o";
  }

  computerTurn() {
    var location = this.computer.getBestMove(this.state, settings.difficulty);
    setTimeout(() => this.takeTurn(location, this.computerPlayer), 200);
  }

  takeTurn(location, player) {
    if (this.isValidMove(location) && !this.gameOver && this.currentPlayer == player) {
      if (player == "x") {
        this.tiles[location].setX();
      }
      if (player == "o") {
        this.tiles[location].setO();
      }
      this.move(location, player);
      this.checkForWinOrTie();
      if (!this.gameOver && this.currentPlayer == this.computerPlayer) {
        this.computerTurn();
      }
    }
  }

  checkForWinOrTie() {
    var winner = getWinner(this.state);
    if (winner.length > 0) {
      winner.forEach((i) => {
        this.tiles[i].setWinner();
      });
      if (this.state[winner[0]] == this.userPlayer) {
        this.updateScores("player");
        this.onWinner("player");
      } else {
        this.updateScores("computer");
        this.onWinner("computer");
      }
    } else {
      if (
        this.state.filter((val) => (val !== "x" && val !== "o")).length <= 0
      ) {
        this.updateScores("tie");
        this.onWinner("tie");
      }
    }
  }

  updateScores(winner) {
    this.gameOver = true;
    switch (winner) {
      case "player":
        this.playerScore += 1;
        break;
      case "computer":
        this.computerScore += 1;
        break;
      default:
        this.ties += 1;
        break;
    }

    $(this.playerScoreId).html(`${this.playerScore}`);
    $(this.computerScoreId).html(`${this.computerScore}`);

  }

  createTiles() {
    this.state.forEach((i) => {
      var id = this.getTileId(i);
      this.tiles.push(new Tile(id));

      $(id).on("click", () => this.takeTurn(i, this.userPlayer));
    });
  }

  getTileId(i) {
    return `#tile-${i}`;
  }

  restart() {
    this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.gameOver = false;
    this.changePlayerCharacter();
    this.clearBoard();
  }

  clearBoard() {
    this.tiles.forEach((tile) => {
      tile.clear();
    })
  }
}
