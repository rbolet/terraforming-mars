class Board {
  constructor() {
    this.handleTileClick = this.handleTileClick.bind(this);
    //        0     1     2     3     4
    this.boardArray = [
      [null, null, null, null, null], //0
      [null, null, null, null, null], //1
      [null, null, null, null, null], //2
      [null, null, null, null, null], //3
      [null, null, null, null, null]
    ]; //4 // array of row arrays containing space arrays, containing tile objects
    this.populateArray();
    // this.addClickHandler();
  }

  gameOver() {
    for (var row = 0; row < 5; row++) {
      for (var cell = 0; cell < 5; cell++) {
        var currentTile = this.boardArray[row][cell];
        var tileOwner = currentTile.owner;
        if (tileOwner) {
          tileOwner.incrementVP();
        }
      }
    }
  }
  populateArray() {
    for (var row = 0; row < 5; row++) {
      var currentRow = $("<div>").addClass("row");
      for (var cell = 0; cell < 5; cell++) {
        var newTile = new Tile(
          "empty",
          null,
          { row: row, cell: cell },
          this.handleTileClick
        );
        this.boardArray[row][cell] = newTile;
        newTile.render();
        currentRow.append(newTile.tileElement);
      }
      $(".board").append(currentRow);
    }
  }
  getTileAtLocation(x, y) {
    if (this.boardArray[y]) {
      if (this.boardArray[y][x]) {
        return this.boardArray[y][x];
      }
      return false;
    }
    return false;
  }
  markAllBoardAsLegal() {
    for (var row = 0; row < this.boardArray.length; row++) {
      for (var col = 0; col < this.boardArray[0].length; col++) {
        var tile = this.boardArray[row][col];
        if (tile.getType() === "empty") {
          tile.markLegalMove();
        }
      }
    }
  }
  unMarkAllBoard() {
    for (var row = 0; row < this.boardArray.length; row++) {
      for (var col = 0; col < this.boardArray[0].length; col++) {
        var tile = this.boardArray[row][col];
        tile.unmarkLegalMove();
      }
    }
  }
  findValidCityTiles() {
    this.markAllBoardAsLegal();
    var vectors = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -0, y: -1 },
      { x: 0, y: 1 }
    ];
    for (var row = 0; row < this.boardArray.length; row++) {
      for (var col = 0; col < this.boardArray[0].length; col++) {
        if (this.boardArray[row][col].getType() === "city") {
          for (
            var vectorIndex = 0;
            vectorIndex < vectors.length;
            vectorIndex++
          ) {
            var tile = this.getTileAtLocation(
              col + vectors[vectorIndex].x,
              row + vectors[vectorIndex].y
            );
            if (tile) {
              if (tile.getType() === "empty") {
                tile.unmarkLegalMove();
              }
            }
          }
        }
      }
    }
  }
  findValidForestTiles() {
    var vectors = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -0, y: -1 },
      { x: 0, y: 1 }
    ];
    for (var row = 0; row < this.boardArray.length; row++) {
      for (var col = 0; col < this.boardArray[0].length; col++) {
        if (this.boardArray[row][col].getType() === "city") {
          for (
            var vectorIndex = 0;
            vectorIndex < vectors.length;
            vectorIndex++
          ) {
            var tile = this.getTileAtLocation(
              col + vectors[vectorIndex].x,
              row + vectors[vectorIndex].y
            );
            if (tile) {
              if (tile.getType() === "empty") {
                tile.markLegalMove();
              }
            }
          }
        }
      }
    }
  }
  handleTileClick(tileObject) {
    //Should place tile
    console.log("tile was clicked", tileObject);
    tileObject.markLegalMove();
  }
  addClickHandler() {
    $(".board").on("click", ".legalmove", function(event) {
      console.log("You clicked a valid space!");
    });
  }

  placeTile(tiletoPlace, positionToPlace) {
    // expects Tile object, position <-TBD how to store/pass positions
    if (this.boardArray[positionToPlace.row][positionToPlace.column] !== null) {
      //can place there
      return true;
    } else {
      return false;
    }
  }
}
