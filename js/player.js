class Player {
  constructor() {
    this.name = "";
    this.canPlay = false;
    this.resources = {};
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
}
