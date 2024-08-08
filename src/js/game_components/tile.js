
export class Tile {
  constructor(id) {
    this.id = id;
  }

  setWinner() {
    $(this.id).addClass("tile-winner");
  }

  setX() {
    $(this.id).addClass("tile-x");
  }

  setO() {
    $(this.id).addClass("tile-o");
  }

  clear() {
    $(this.id).removeClass("tile-o");
    $(this.id).removeClass("tile-x");
    $(this.id).removeClass("tile-winner");
  }
}