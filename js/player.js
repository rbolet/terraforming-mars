class Player {
  constructor(playerName, cardClickedCallBack, ArrayOfWhoCanPlay) {
    //expects String
    this.incrementVP = this.incrementVP.bind(this);
    this.name = playerName;
    this.passedTurn = false;
    this.handleCardClick = cardClickedCallBack;
    this.playCard = this.playCard.bind(this);
    this.actionNum = 0;
    this.resources = {
      money: { currentValue: 42, rate: 1 },
      plants: { currentValue: 0, rate: 1 },
      energy: { currentValue: 0, rate: 1 },
      heat: { currentValue: 0, rate: 1 }
    };
    this.victoryPoints = 0;
    this.playerArray = ArrayOfWhoCanPlay;
    this.cardsInHand = [
      new Card(
        11,
        [
          {
            type: "energy",
            effects: { resources: { currentValue: 0, rate: 1 } }
          }
        ],
        null,
        true,
        this.handleCardClick
      ),
      new Card(
        "14",
        [
          {
            type: "temperature",
            effects: {
              resources: {
                currentValue: "Raise temperature 1 step",
                rate: "-"
              }
            }
          }
        ],
        null,
        true,
        this.handleCardClick
      ),
      new Card(
        23,
        [
          {
            type: "-",
            effects: { resources: { currentValue: "Place a forest tile", rate: 0 } }
          }
        ],
        "forest",
        true,
        this.handleCardClick
      ),
      new Card(
        25,
        [
          {
            type: "Money",
            effects: { resources: { currentValue: "Place a city tile", rate: 1 } }
          }
        ],
        "city",
        true,
        this.handleCardClick
      ),
      new Card(
        "8 Plants",
        [
          {
            type: "plants",
            effects: { resources: { currentValue: "Place a forest tile", rate: "-" } }
          }
        ],
        "forest",
        true,
        this.handleCardClick
      ),
      new Card(
        "8 Heat",
        [
          {
            type: "temperature",
            effects: { resources: { currentValue: "Raise temperature 1 step", rate: "-" } }
          }
        ],
        null,
        true,
        this.handleCardClick
      )
    ];
    this.terraformRating = 20;
  }

  incrementTerraformRating() {
    this.terraformRating += 1;
  }

  incrementVP() {
    this.victoryPoints += 1;
  }

  removeCardFromHand(card) {
    if (card.permanent) return false;

    this.cardsInHand.splice(this.cardsInHand.indexOf(card), 1);
    card.removeCardfromDiv();
  }

  playCard(cardToPlay) {
    if (typeof cardToPlay.cost === "string") {
      this.playSpecialCard(cardToPlay);
      return "Special Card";
    }

    if (!this.canPlay(cardToPlay)) return false;

    this.resources.money.currentValue -= cardToPlay.cost;
    if (cardToPlay.getTileToPlace() === "city") {
      game.hideActionModal();
      game.board.findValidCityTiles();

    } else if (cardToPlay.getTileToPlace() === "forest") {
      game.hideActionModal();
      game.board.findValidForestTiles();
      game.oxygen = 1;
    }
      // game.oxygen = 1; // Calls the function twice. Calling it once with a different number messed with the display

    // } else if (cardToPlay.getTileToPlace() === "heat") {
    //   game.temperature += 2;
    // }

    cardToPlay.causeEffect();
    this.removeCardFromHand(cardToPlay);
    this.incrementAction();

  }

  playSpecialCard(specialCard) {
    switch (specialCard.cost) {
      case ("8 Plants"):
        if (this.resources["plants"].currentValue < 8) return false;
        this.resources["plants"].currentValue -= 8;
        game.hideActionModal();
        game.board.findValidForestTiles();
        game.oxygen = 1;
        // game.oxygen = 1;
        this.incrementAction();
        break;
      case ("8 Heat"):
        if (this.resources["heat"].currentValue < 8) return false;
        this.resources["heat"].currentValue -= 8;
        game.temperature += 2;
        game.updateActionModalStats();
        this.incrementAction();
        break;
      case ("14"):
        if (this.resources["money"].currentValue < 14) return false;
        this.resources["money"].currentValue -= 14;
        game.temperature += 2;
        specialCard.causeEffect();
        this.incrementAction();
        break;
      default: return false;
    }
  }


  incrementAction() {
    this.actionNum++;

    if (this.actionNum === 2) {
      var temp = this.playerArray[0];
      this.playerArray.push(temp);
      this.playerArray.shift();
      this.actionNum = 0;
      game.advanceTurn();
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
