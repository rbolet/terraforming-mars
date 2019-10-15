class Game {
  constructor() {
    this.currentOxygen = 0;
    this.currentTemperature = -30;
    this.currentGeneration = 1;
    this.currentPhase = 0;
    this.phaseList = ['Research','Action','Production'];
    this.currentPlayer = 0;
    this.cardsInDeck = [];
    this.playerList =[];
  }
  get oxygen(){
    return this.currentOxygen;
  }
  set oxygen(numToAdvance){
    this.currentOxygen+=numToAdvance;
    if(this.currentOxygen>14){
      this.currentOxygen=14;
      return false;
    }
    return true;
  }
  get temperature(){
    return this.currentTemperature;
  }
  set temperature(numToAdvance){
    this.currentTemperature += numToAdvance;
    if (this.currentTemperature > 8) {
      this.currentTemperature = 8;
      return false;
    }
    return true;
  }
  get generation(){
    return this.currentGeneration
  }
  set generation(numToAdvance){
    this.currentGeneration += numToAdvance;
    if (this.currentGeneration > 100) {
      this.currentGeneration = 100;
      return false;
    }
    return true;
  }
  get phase(){
    return this.currentPhase;
  }
  advancePhase(){
    if (this.currentPhase===2){
      this.currentPhase=0
    }
    else{
      this.currentPhase++;
    }
  }
  changeRescource(player,type,valuesToChange){

  }
  researchPhase(){

  }
  actionPhase(){

  }
  productionPhase(){

  }
  advanceTurn(){
    this.currentPlayer++;
    if (this.currentPlayer===this.playerList.length){
      this.currentPlayer=0;
    }
  }
  dealCard(){
    var dealCard = this.cardsInDeck[this.cardsInDeck.length - 1];
    this.playerList[this.currentPlayer].addCardtoHand(dealCard);
    this.cardsInDeck.pop();
  }
  shuffleCards(){
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

  addPlayer(name){ // expects string
  var newPlayer = new Player(name);
  this.playerList.push(newPlayer);
  }
}
