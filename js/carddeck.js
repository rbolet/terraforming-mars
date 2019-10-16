class CardDeck{
  constructor(){
    this.cardsInDeck = [];
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
    this.addCard();
  }

  dealCard() {//deals 1 card to the current player. add argrument to give x cards to all players
    if (arguments.length>0 && this.cardsInDeck.length>arguments[0]*game.playerList.length){
      for (var round = 1;round<=arguments[0];round++){
        for (var player = 0; player<game.playerList.length;player++){
          var dealCard = this.cardsInDeck[this.cardsInDeck.length - 1];
          game.playerList[player].addCardtoHand(dealCard);
          this.cardsInDeck.pop();
        }
      }
    }
    else{
      var dealCard = this.cardsInDeck[this.cardsInDeck.length - 1];
      game.playerList[game.currentPlayer].addCardtoHand(dealCard);
      this.cardsInDeck.pop();
    }
  }
  shuffleCards() {
    var newPos = 0;
    var tempVar = 0;
    for (var position = this.cardsInDeck.length - 1; position >= 0; position--) {
      newPos = Math.floor(Math.random() * (position + 1));
      tempVar = this.cardsInDeck[position];
      this.cardsInDeck[position] = this.cardsInDeck[newPos];
      this.cardsInDeck[newPos] = tempVar;
    }
    return this.cardsInDeck;
  }
  addCard() {
    var newCard = new Card(15, "plants", 5, 2);
    this.cardsInDeck.push(newCard);
      }
}
