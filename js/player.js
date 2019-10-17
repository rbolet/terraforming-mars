class Player {
  constructor(playerName) {
    //expects String
    this.incrementVP = this.incrementVP.bind(this);
    this.name = playerName;
    this.passedTurn = false;
    this.playCard = this.playCard.bind(this);
    this.actionNum = 0;
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

  incrementVP() {
    this.victoryPoints += 1;
  }

  removeCardFromHand(card) {
    if (!card.permanent)
      this.cardsInHand.splice(this.cardsInHand.indexOf(card), 1);
  }

  playCard(cardToPlay) {
    //get card object from event?
    // expects a Card Object
    if (this.actionNum === 2) {
      for (var player = 1; player <= 4; player++) {
        $(".player" + player + " button").remove();
      }
      this.actionNum = 0;
    } else {
      if (this.canPlay(cardToPlay)) {
        this.resources.money.currentValue -= cardToPlay.cost;
        if (cardToPlay.getTileToPlace() === "city") {
          game.hideActionModal();
          board.findValidCityTiles(); // Shouldn't do this, pass in a call back
        } else if (cardToPlay.getTileToPlace() === "forest") {
          game.hideActionModal();
          board.findValidForestTiles();
        }
        cardToPlay.causeEffect();
        this.removeCardFromHand(cardToPlay);
        this.actionNum++;
        if (this.actionNum === 2){
          game.advanceTurn();
        }
      } else {
        return false;
      }
    }
  }

  getResource(resourceType) {
    // expects string
    return this.resources[resourceType];
  }

  addCardtoHand(cardtoAdd) {
    // expects a Card object
    this.cardsInHand.push(cardtoAdd);
    // cardtoAdd.render();
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
  passTurn() {
    this.passedTurn = true;
    this.actionNum = 0;
    game.advanceTurn();
  }
  get passed() {
    return this.passedTurn;
  }
  set passed(input) {
    this.passedTurn = false;
  }
  placeTile(tileType) {
    //Called by a card that knows what kind of tile to place. City or Greenery
    var newTile = new Tile(tileType, this);
  }
}
