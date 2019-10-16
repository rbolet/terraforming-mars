class Board {
  constructor() {
    //        0     1     2     3     4
    this.boardArray = [
      [null, null, null, null, null], //0
      [null, null, null, null, null], //1
      [null, null, null, null, null], //2
      [null, null, null, null, null], //3
      [null, null, null, null, null]
    ]; //4 // array of row arrays containing space arrays, containing tile objects
    this.populateArray();
    this.addClickHandler();
  }
  populateArray() {
    for (var row = 0; row < 5; row++) {
      var currentRow = $("<div>").addClass("row");
      for (var cell = 0; cell < 5; cell++) {
        var newTile = new Tile("empty", null, { row: row, cell: cell });
        this.boardArray[row][cell] = newTile;
        newTile.render();
        currentRow.append(newTile.tileElement);
      }
      $(".board").append(currentRow);
    }
  }
  addClickHandler() {
    $(".board").on("click", ".cell", function(event) {
      $(event.currentTarget).toggleClass("legalmove");
    });
  }

  checkForTile(positionToCheck) {
    // expects a position <- TBD how to store/pass positions
  }

  //Add class of legal moves to legal spots. Add click delegator for the gameboard that looks for a legal moved to be clicked

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
