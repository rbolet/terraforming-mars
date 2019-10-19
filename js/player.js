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
        14,
        [
          {
            type: "heat",
            effects: { resources: { currentValue: 0, rate: 0 } }
          }
        ],
        null,
        true,
        this.handleCardClick
      ),
      new Card(
        "23",
        [
          {
            type: "plants",
            effects: { resources: { currentValue: "Place a forest tile", rate: 0 } }
          }
        ],
        "forest",
        true,
        this.handleCardClick
      ),
      new Card(
        "25",
        [
          {
            type: "money",
            effects: { resources: { currentValue: "Place a city tile", rate: 1 } }
          }
        ],
        "city",
        true,
        this.handleCardClick
      ),
      new Card(
        "8 plants",
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
      if (this.canPlay(cardToPlay)) {
        this.resources.money.currentValue -= cardToPlay.cost;
        if (cardToPlay.getTileToPlace() === "city") {
          game.hideActionModal();
          // board.findValidCityTiles(); // Shouldn't do this, pass in a call back
        } else if (cardToPlay.getTileToPlace() === "forest") {
          game.hideActionModal();
          // board.findValidForestTiles();
          game.oxygen = 1;
        } else if (cardToPlay.getTileToPlace() === "heat") {
          game.tempurature = 2;
        }
        cardToPlay.causeEffect();
        this.removeCardFromHand(cardToPlay);
        this.actionNum++;
        if (this.actionNum === 2){

          var temp = this.playerArray[0];
          this.playerArray.push(temp);
          this.playerArray.shift();
          this.actionNum = 0;
          game.advanceTurn();
        }
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
