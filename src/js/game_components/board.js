import { Tile } from "./tile";
import {getWinner, Computer} from "./brains";


export class Board {
  constructor() {
    this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.tiles = [];
    this.currentPlayer = "x";
    this.userPlayer = "x";
    this.computerPlayer = "o";
    this.computer = new Computer(this.computerPlayer);
    this.gameOver = false;
    this.difficulty = "hard";
    this.createTiles();
  }

  move(location, player) {
    this.state.splice(location, 1, player);
    this.togglePlayer();
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer == "x" ? "o" : "x";
  }

  isValidMove(location) {
    return this.state[location] !== "x" && this.state[location] !== "o";
  }

  computerTurn() {
    var location = this.computer.getBestMove(this.state, this.difficulty);
    console.log(`FINAL DECISION: ${location}`);
    this.takeTurn(location, this.computerPlayer);
  }

  takeTurn(location, player) {
    if (this.isValidMove(location) && !this.gameOver) {
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
      this.gameOver = true;
    } else {
      if (
        this.state.filter((val) => (val !== "x" && val !== "o")).length <= 0
      ) {
        console.log("Tie!");
        this.gameOver = true;
      }
    }
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
}
