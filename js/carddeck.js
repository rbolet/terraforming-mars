class CardDeck{
  constructor(){
    this.cardsInDeck = [];
    this.addCard();
    this.addCard();
    this.addCard();
  }

  dealCard() {

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
