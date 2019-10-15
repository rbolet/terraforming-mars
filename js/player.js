class Player {

  constructor( playerName ){ //expects String
    this.name = playerName;
    this.passedTurn = false;
    this.resources = {
      money: {currentValue : 42, rate : 1} ,
      plants: {currentValue : 0, rate : 1} ,
      energy: {currentValue: 0, rate: 1},
      heat: {currentValue: 0, rate: 1}
    };
    this.victoryPoints = 0;
    this.cardsInHand = [];
  }

  playCard(cardToPlay) {
    // expects a Card object
    if (this.canPlay(cardToPlay)) {
      this.resources.money -= cardToPlay.cost;
    } else {
      return false;
    }
  }

  getResource(resourceType, resourceAmount) {
    // expects string, number
  }

  setResource(resourceType, resourceAmount) {
    // expects string, number
  }

  addCardtoHand(cardtoAdd) {
    // expects a Card object
  }

  canPlay(cardToPlay) {
    if (cardToPlay.cost > this.resources.money.currentValue) {
      return false;
    } else {
      return true;
    }
  }


  passTurn(){

  }

}
