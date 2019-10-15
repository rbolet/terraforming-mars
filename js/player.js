class Player {
  constructor(){
    this.name = '';
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

    playCard( cardToPlay ) { // expects a Card object

    }

    getResource ( resourceType, resourceAmount ) { // expects string, number

    }

    setResource ( resourceType, resourceAmount ){ // expects string, number

    }

    addCardtoHand ( cardtoAdd ){ // expects a Card object

    }
    passTurn(){

    }
}
