class CardDeck {
  constructor(cardList, gameClickCallback, gameDivCallback) {
    this.cardsInDeck = cardList;
    this.cardClickCallback = gameClickCallback;
    this.removeDivCallback = gameDivCallback;
    this.createCards();
  }
  createCards() {
    for (var deckIndex = 0; deckIndex < this.cardsInDeck.length; deckIndex++) {

      var card = new Card(
        this.cardsInDeck[deckIndex][0],
        this.cardsInDeck[deckIndex][1],
        this.cardsInDeck[deckIndex][2],
        this.cardsInDeck[deckIndex][3],
        this.cardClickCallback,
        this.removeDivCallback
      );
      this.cardsInDeck[deckIndex] = card;
    }
  }
  dealCard() {

    if (arguments.length > 0) {
      for (var round = 1; round <= arguments[0]; round++) {
        for (var player = 0; player < game.playerList.length; player++) {
          var dealCard = this.cardsInDeck[this.cardsInDeck.length - 1];
          game.playerList[player].addCardtoHand(dealCard);
          this.cardsInDeck.pop();
        }
      }
    }
  }
  shuffleCards() {
    var newPos = 0;
    var tempVar = 0;
    for (
      var position = this.cardsInDeck.length - 1;
      position >= 0;
      position--
    ) {
      newPos = Math.floor(Math.random() * (position + 1));
      tempVar = this.cardsInDeck[position];
      this.cardsInDeck[position] = this.cardsInDeck[newPos];
      this.cardsInDeck[newPos] = tempVar;
    }
    return this.cardsInDeck;
  }
}
