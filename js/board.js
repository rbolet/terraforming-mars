class Board {
  constructor(){//        0     1     2     3     4
    this.boardArray = [ [null, null, null, null, null], //0
                        [null, null, null, null, null], //1
                        [null, null, null, null, null], //2
                        [null, null, null, null, null], //3
                        [null, null, null, null, null]];//4 // array of row arrays containing space arrays, containing tile objects
  }

  checkForTile( positionToCheck ){ // expects a position <- TBD how to store/pass positions

  }

  placeTile( tiletoPlace, positionToPlace){ // expects Tile object, position <-TBD how to store/pass positions
    if (this.boardArray[positionToPlace.row][positionToPlace.column]!==null){//can place there
      return true;
    }
    else {
      return false;
    }
  }
}
