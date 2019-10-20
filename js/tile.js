class Tile {
  constructor(tileType, tileOwner, position, clickCallback) {
    this.handleClick = this.handleClick.bind(this);
    // expects string "greenery" or "city" , player object
    this.clickCallback = clickCallback;
    this.type = tileType;
    this.owner = tileOwner;
    this.tileElement = null; // jQuery object
    this.position = position; //row# and cell#
    this.legalMove = false;
  }
  handleClick() {
    if (this.legalMove) {
      this.clickCallback(this);
    }
  }
  render() {
    var newTile = $("<div>");
    newTile.addClass("tile " + this.type).addClass("cell");
    newTile.click(this.handleClick);

    this.tileElement = newTile;
    return this.tileElement;
  }
  markLegalMove() {
    this.tileElement.addClass("legalMove");
    this.legalMove = true;
  }
  unmarkLegalMove() {
    this.tileElement.removeClass("legalMove");
    this.legalMove = false;
  }
  changeTileToType(tileType) {
    this.tileElement.addClass(tileType);
  }

  getType() {
    return this.type;
  }

  setType(typeToSet) {
    this.type = typeToSet;
    this.tileElement.addClass(typeToSet);
    this.unmarkLegalMove();
    return this
  }
  setOwner(owner) {
    console.log(owner)
    this.owner = owner
    return this
  }
}
