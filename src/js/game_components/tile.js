
export class Tile {
  constructor(id, onClick) {
    this.id = id;
    this.setup(onClick);
  }

  setup(callback) {
    $(`#${this.id}`).on("click", function() {
      callback();
    })
  }
}