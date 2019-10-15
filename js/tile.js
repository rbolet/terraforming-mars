class Tile {
  constructor(tileType, tileOwner, position) {
    // expects string "greenery" or "city" , player object
    this.type = tileType;
    this.owner = tileOwner;
    this.tileElement = null; // jQuery object
    this.positon = {}; //row# and cell#
  }

  render() {
    var newTile = $("<div>");
    newTile.addClass("tile " + this.type).addClass("cell");

    this.tileElement = newTile;
    return this.tileElement;
  }
}
