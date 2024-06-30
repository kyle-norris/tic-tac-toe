import { Tile } from "./tile";

const WIN_SCENARIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export class Board {
  constructor() {
    this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.tiles = [];
    this.currentPlayer = "x";
    this.userPlayer = "x";
    this.gameOver = false;
    this.createTiles();
  }

  move(location, player) {
    if (this.isValidMove(location)) {
      this.state.splice(location, 1, player);
      this.togglePlayer();
    }

    console.log(`Current state: ${this.state}`);
    console.log(`Next player: ${this.currentPlayer}`);
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer == "x" ? "o" : "x";
  }

  isValidMove(location) {
    return this.state[location] !== "x" && this.state[location] !== "o";
  }

  getWinner() {
    var winner = [];
    WIN_SCENARIOS.forEach((s) => {
      if (
        this.state[s[0]] == this.state[s[1]] &&
        this.state[s[1]] == this.state[s[2]]
      ) {
        winner = s;
      }
    });
    return winner;
  }

  onTileClick(location) {
    if (this.isValidMove(location) && !this.gameOver) {
      if (this.currentPlayer == "x") {
        this.tiles[location].setX();
      }
      if (this.currentPlayer == "o") {
        this.tiles[location].setO();
      }
      this.move(location, this.currentPlayer);
      this.checkForWinOrTie();
    }
  }

  checkForWinOrTie() {
    var winner = this.getWinner();
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

      $(id).on("click", () => this.onTileClick(i));
    });
  }

  getTileId(i) {
    return `#tile-${i}`;
  }
}
