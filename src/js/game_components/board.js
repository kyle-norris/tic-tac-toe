import { CLASS_O, CLASS_X } from "../logic";
import { Tile } from "./tile";

export class Board {

  constructor() {
    this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.currentPlayer = "x";
    this.userPlayer = "x";
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


  onTileClick(id, location) {
    if (this.isValidMove(location)) {
      console.log("is Valid!")
      if (this.currentPlayer == "x") {
        $(`#${id}`).addClass(CLASS_X);
      }
      if (this.currentPlayer == "o") {
        $(`#${id}`).addClass(CLASS_O);
      }
      this.move(location, this.currentPlayer);
    }
    
  }


  createTiles() {
    this.state.forEach((i) => {
      var id = `tile-${i}`;
      new Tile(id, () => this.onTileClick(id, i));
    })
  }
}
