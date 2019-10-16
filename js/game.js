class Game {
  constructor() {
    this.currentOxygen = 0;
    this.currentTemperature = -30;
    this.currentGeneration = 1;
    this.currentPhase = 0;

    this.phaseList = ["Research", "Action", "Production"];
    this.currentPlayer = 0;
    this.playerList = [];
  }
  get oxygen() {
    return this.currentOxygen;
  }
  set oxygen(numToAdvance) {
    // expects number
    this.currentOxygen += numToAdvance;
    if (this.currentOxygen > 14) {
      this.currentOxygen = 14;
      return false;
    }
    return true;
  }
  get temperature(){
    return this.currentTemperature;
  }
  set temperature(numToAdvance){ //expects number
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
  set generation(numToAdvance){ //expects number
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

  changeResource( player , typeToChange, valuesToChange){ //expects number, string, object
    var playerToChange = this.playerList[player];
    var resourceToChange = playerToChange.resources[typeToChange];

    resourceToChange.currentValue += valuesToChange.currentValue;
    resourceToChange += valuesToChange.rate;

  }
  researchPhase(){

  }
  actionPhase(){

  }
  productionPhase(){
    var currentPlayer;
    var currentEnergy;
    debugger;
    for (var playerIndex = 0; playerIndex < this.playerList.length; ++playerIndex){

      currentPlayer = this.playerList[playerIndex];
      currentEnergy = currentPlayer.getResource( "energy").currentValue;

      //add energy to heat
      this.changeResource(playerIndex, "heat", {currentValue : currentEnergy, rate : 0});
      // remove all current energy
      this.changeResource( playerIndex , "energy", {currentValue : -currentEnergy, rate : 0});

      // add money per terraform rating
      this.changeResource( playerIndex, "money", {currentValue : currentPlayer.terraformRating, rate: 0});

      // add rating to current value of each resource
      for (var typeKey in currentPlayer.resources){
        this.changeResource( playerIndex, typeKey, {currentValue : currentPlayer.resources[typeKey].rate, rate : 0})
      }

    }

    return true;

  }

  advanceTurn(){
    this.currentPlayer++;
    if (this.currentPlayer===this.playerList.length){
      this.currentPlayer=0;
    }
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

  addPlayer(name){ // expects string
  var newPlayer = new Player(name);
  this.playerList.push(newPlayer);
  }

}
