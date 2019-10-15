class Game {
  constructor() {
    this.currentOxygen = 0;
    this.currentTemperature = -30;
    this.currentGeneration = 1;
    this.currentPhase = "";
    this.phaseList = ["Research", "Action", "Production"];
    this.cardsInDeck = [];
    this.playerList = [];
    this.addCard();
  }
  get oxygen() {}
  set oxygen(numToAdvance) {}
  get temperature() {}
  set temperature(numToAdvance) {}
  get generation() {}
  set generation(numToAdvance) {}
  get phase() {}
  advancePhase() {}
  changeRescource(player, type, numToChange) {}
  researchPhase() {}
  actionPhase() {}
  productionPhase() {}
  advanceTurn() {}
  dealCard() {}
  shuffleCards() {}

  addCard() {
    var newCard = new Card(15, "plants", 5, 2);
    this.cardsInDeck.push(newCard);
  }
}
