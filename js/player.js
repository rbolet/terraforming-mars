class Player {
  constructor(playerName) {
    //expects String
    this.name = playerName;
    this.passedTurn = false;
    this.resources = {
      money: { currentValue: 42, rate: 1 },
      plants: { currentValue: 0, rate: 1 },
      energy: { currentValue: 0, rate: 1 },
      heat: { currentValue: 0, rate: 1 }
    };
    this.victoryPoints = 0;
    this.cardsInHand = [];
    this.terraformRating = 20;
  }

  playCard(cardToPlay) {
    // expects a Card object
    if (this.canPlay(cardToPlay)) {
      this.resources.money -= cardToPlay.cost;
      if (cardToPlay.getTiletoPlace() === "city") {
        board.findValidCityTiles();
      } else if (cardToPlay.getTileToplace() === "forest") {
        board.findValidForestTiles();
      }
      //Playboard highlights, close modal, click handler on legal moves
    } else {
      return false;
    }
  }

  getResource(resourceType) {
    // expects string
    return this.resources[resourceType];
  }

  addCardtoHand(cardtoAdd) {
    // expects a Card object
    this.cardsInHand.push(cardtoAdd);
    cardtoAdd.render();
    //going to append
  }

  canPlay(cardToPlay) {
    if (cardToPlay.cost > this.resources.money.currentValue) {
      return false;
    } else {
      return true;
    }
  }
  updateStats() {
    var currentPlayerClass = "." + this.name + ".resources";
    $(currentPlayerClass + " .money").text(
      "Mega Credits: " + this.resources.money.currentValue
    );
    $(currentPlayerClass + " .plants").text(
      "Plants: " + this.resources.plants.currentValue
    );
    $(currentPlayerClass + " .energy").text(
      "Energy: " + this.resources.energy.currentValue
    );
    $(currentPlayerClass + " .heat").text(
      "Heat: " + this.resources.heat.currentValue
    );
  }
  passTurn() {}
  placeTile(tileType) {
    //Called by a card that knows what kind of tile to place. City or Greenery
    var newTile = new Tile(tileType, this);
  }
}
