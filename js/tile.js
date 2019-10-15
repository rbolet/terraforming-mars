class Tile {
  constructor( tileType, tileOwner ){ // expects string "greenery" or "city" , player object
    this.type = tileType;
    this.owner = tileOwner;
    this.tileElement = {}; // jQuery object
  }

  render(){
    var newTile = $("<div>")
    newTile.addClass("tile " + this.type);

    this.tileElement = newTile;
    return this.tileElement;
    }

}
