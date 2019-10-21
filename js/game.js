class Game {
  constructor(cardListFromMain) {
    this.advancePhase = this.advancePhase.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.showActionModal = this.showActionModal.bind(this);
    this.playerClickedPass = this.playerClickedPass.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    // this.removeCardDivfromModal = this.removeCardDivfromModal.bind(this);
    this.currentOxygen = 0;
    this.currentTemperature = -30;
    this.currentGeneration = 1;
    this.currentPhase = 1;
    this.cardList = cardListFromMain;
    this.phaseList = ["Research", "Action", "Production"];
    this.playerList = [];
    this.whoCanPlayArray = [0, 1, 2, 3];
    this.applyModalClickHandlers();
    this.board = null;
    this.cardDeck = null;
    this.updateState();
    this.phasePlayerWhoCanPlay = this.playerList.length;
  }
  handleCardClick(cardObject) {
    this.playerList[this.whoCanPlayArray[0]].playCard(cardObject);
  }
  updateState() {
    $(".temperatureText").text(this.currentTemperature);
    $(".temperatureIndicator").css({
      //Not Done!!!
      transform: "translatey(-51px)"
    });
    let currentLevel = 15 - this.currentOxygen;
    let previousLevel = currentLevel + 1;
    $(".oxygen:nth-child(" + previousLevel + ")").removeClass("current-oxygen");
    $(".oxygen:nth-child(" + currentLevel + ")").addClass("current-oxygen");
    //Temp Range (-30,8) 19 stages
    //Oxygen Range (0,14) 15 stages
    //Animate indicators based on location (968px to traverse)
  }

  applyModalClickHandlers() {
    $(".production-modal-button").on("click", this.advancePhase);
    $("#pass-button").on("click", this.playerClickedPass);
    $("#view-board").on("click", this.hideActionModal);
    $("body").on("click", ".action-button", this.showActionModal);
    $("body").on("click", ".pass-button", this.playerClickedPass);
    // $(".card-display").on("click", ".card", this.removeCardDivfromModal);
  }
  get oxygen() {
    return this.currentOxygen;
  }
  set oxygen(numToAdvance) {
    // expects number
    this.currentOxygen += numToAdvance;
    //this.updateProductionModal();
    if (this.currentOxygen > 14) {
      this.currentOxygen = 14;
      //this.updateProductionModal();
      return false;
    }
    this.playerList[this.whoCanPlayArray[0]].incrementVP();
    this.playerList[this.whoCanPlayArray[0]].incrementTerraformRating();
    this.updateState();
    return true;
  }
  get temperature() {
    return this.currentTemperature;
  }
  set temperature(numToAdvance) {
    //expects number
    this.currentTemperature += numToAdvance;
    // this.updateProductionModal();
    if (this.currentTemperature > 8) {
      this.currentTemperature = 8;
      // this.updateProductionModal();
      return false;
    }
    this.playerList[this.whoCanPlayArray[0]].incrementVP();
    this.playerList[this.whoCanPlayArray[0]].incrementTerraformRating();
    this.updateState();
    return true;
  }

  get generation() {
    return this.currentGeneration;
  }
  set generation(numToAdvance) {
    //expects number
    this.currentGeneration += numToAdvance;
    // this.updateProductionModal();
    if (this.currentGeneration > 100) {
      this.currentGeneration = 100;
      // this.updateProductionModal();
      return false;
    }
    return true;
  }
  get phase() {
    return this.currentPhase;
  }

  advancePhase() {
    this.currentPhase++;
    switch (this.currentPhase) {
      case 1:
        this.actionPhase();
        break;
      case 2:
        this.productionPhase();
        break;
      case 3:
        this.currentPhase = 0;
      case 0:
        this.researchPhase();
      break;
    }

  }

  changeResource(typeToChange, valuesToChange, player) {
    //expects number, string, object
    var playerToChange = this.playerList[this.whoCanPlayArray[0]];
    var resourceToChange = playerToChange.resources[typeToChange];

    resourceToChange.currentValue += resourceToChange.currentValue;
    resourceToChange.rate += resourceToChange.rate;
    this.updatePlayerDisplays();
    this.updateActionModalStats();
  }
  newGame() {
    this.board = new Board();
    this.cardDeck = new CardDeck(this.cardList, this.handleCardClick,
      this.removeCardDivfromModal);

    this.addPlayer("Roger", this.handleCardClick);
    this.addPlayer("Rapha", this.handleCardClick);
    this.addPlayer("Pzo", this.handleCardClick);
    this.addPlayer("Mystery Ghost", this.handleCardClick);
    this.cardDeck.dealCard(3);
    this.updatePlayerDisplays("start");
    this.newRound();

  }

  newRound(){
    var actionButton = $("<button>")
      .addClass("action-button")
      .text("Take Action");
    var passButton = $("<button>")
      .addClass("pass-button")
      .text("Pass Turn");
    $(".player1").append(actionButton, passButton);
    this.hideActionModal();
  }

  updatePlayerDisplays() {
    if (arguments.length > 0) {
      for (var player = 0; player < this.playerList.length; player++) {
        var curPlayer = ".player" + (player + 1);
        $(curPlayer + " div").remove();
        var pName = $("<div>").text("Name: " + this.playerList[player].name);
        var pMoney = $("<div>")
          .text(
            "Money: " + this.playerList[player].resources.money.currentValue
          )
          .addClass("money" + player);
        var pPlants = $("<div>")
          .text(
            "Plants: " + this.playerList[player].resources.plants.currentValue
          )
          .addClass("plants" + player);
        var pEnergy = $("<div>")
          .text(
            "Energy: " + this.playerList[player].resources.energy.currentValue
          )
          .addClass("energy" + player);
        var pHeat = $("<div>")
          .text("Heat: " + this.playerList[player].resources.heat.currentValue)
          .addClass("heat" + player);
        $(curPlayer).append(pName, pMoney, pPlants, pEnergy, pHeat);
      }
    } else {
      for (var player = 0; player < this.playerList.length; player++) {
        $(".money" + player).text(
          "Money: " + this.playerList[player].resources.money.currentValue
        );
        $(".plants" + player).text(
          "Plants: " + this.playerList[player].resources.plants.currentValue
        );
        $(".energy" + player).text(
          "Energy: " + this.playerList[player].resources.energy.currentValue
        );
        $(".heat" + player).text(
          "Heat: " + this.playerList[player].resources.heat.currentValue
        );
      }
    }
  }
  researchPhase() {
    alert("Research Phase - each player receives 2 new cards");
    this.cardDeck.dealCard(2);
    this.generation = 1;
    this.advancePhase();
  }
  actionPhase() {

    for (var i = 0; i < this.playerList.length; i++) {
      this.whoCanPlayArray.push(i);
    }
    alert("Action phase - generation " + this.generation);
    this.updateActionModalStats();
    this.newRound();
   }

  productionPhase() {
    alert('Production Phase - all energy is converted into heat (science!). Receive amount of each resource according to production rate.');

    var currentPlayer;
    var currentEnergy;
    for (var playerIndex = 0; playerIndex < this.playerList.length;
      ++playerIndex) {
      currentPlayer = this.playerList[playerIndex];
      currentEnergy = currentPlayer.getResource("energy").currentValue;

      //add energy to heat
      this.productionPhaseChangeResources("heat", {
        currentValue: currentEnergy, rate: 0
      }, playerIndex);

      // remove all current energy
      this.productionPhaseChangeResources("energy", {
        currentValue: -currentEnergy, rate: 0
      }, playerIndex);

      // add money per terraform rating
      this.productionPhaseChangeResources("money", {
        currentValue: currentPlayer.terraformRating,
        rate: 0
      },
        playerIndex);

      // add rating to current value of each resource
      for (var typeKey in currentPlayer.resources) {
        this.productionPhaseChangeResources(
          typeKey,
          {
            currentValue: currentPlayer.resources[typeKey].rate,
            rate: 0
          }, playerIndex);
      }
    }
    this.updatePlayerDisplays();
    this.advancePhase();
    return true;
  }

  productionPhaseChangeResources( resourceType, valueRateObject, playerIndex){
    var targetPlayerResources = this.playerList[playerIndex].resources[resourceType];

    targetPlayerResources.currentValue += valueRateObject.currentValue;
    targetPlayerResources.rate += valueRateObject.rate;

    this.updatePlayerDisplays();

  }

  advanceTurn() {
    this.hideActionModal();
    if (this.whoCanPlayArray.length === 0) {
      this.advancePhase();
      return;
    }
    this.setButtonLocaton();
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

  addPlayer(name, callback) {
    // expects string
    var newPlayer = new Player(name, callback, this.whoCanPlayArray);
    this.playerList.push(newPlayer);
  }
  updateProductionModal() {
    for (var player = 0; player < 4; player++) {
      var playerDiv = ".p" + (player + 1);
      $(playerDiv + " div").remove();
      var playerName = $("<div>")
        .text("Name: " + game.playerList[player].name)
        .addClass("name" + (player + 1));
      var money = $("<div>")
        .text("Money: " + game.playerList[player].resources.money.currentValue)
        .addClass("money" + (player + 1));
      var plants = $("<div>")
        .text(
          "Plants: " + game.playerList[player].resources.plants.currentValue
        )
        .addClass("plants" + (player + 1));
      var energy = $("<div>")
        .text(
          "Energy: " + game.playerList[player].resources.energy.currentValue
        )
        .addClass("energy" + (player + 1));
      var heat = $("<div>")
        .text("Heat: " + game.playerList[player].resources.heat.currentValue)
        .addClass("heat" + (player + 1));
      $(playerDiv).append(playerName, money, plants, energy, heat);
    }
    $(".modal-stats div").remove();
    var statsTitle = $("<div>").text("Global Stats");
    var temperature = $("<div>").text(
      "Temperatrure: " + game.currentTemperature + "ºC"
    );
    var oxygen = $("<div>").text("Oxygen: " + game.currentOxygen + "%");
    var generation = $("<div>").text("Generation: " + game.currentGeneration);
    $(".modal-stats").append(statsTitle, temperature, oxygen, generation);
    $(".production-modal").css("display", "flex");
  }
  setButtonLocaton() {
    for (var player = 1; player <= 4; player++) {
      $(".player" + player + " button").remove();
    }
    var actionButton = $("<button>")
      .addClass("action-button")
      .text("Take Action");
    var passButton = $("<button>")
      .addClass("pass-button")
      .text("Pass Turn");
    $(".player" + (this.whoCanPlayArray[0] + 1)).append(
      actionButton,
      passButton
    );
  }
  playerClickedPass() {
    // debugger;
    var playerWhoPassed = this.whoCanPlayArray[0];
    // this.whoCanPlayArray.push(temp);
    this.whoCanPlayArray.shift();
    for (var player = 1; player <= 4; player++) {
      $(".player" + player + " button").remove();
    }
    this.hideActionModal();
    this.playerList[playerWhoPassed].passTurn();
  }

  showActionModal() {
    this.appendCardstoActionModal();
    this.updateActionModalStats();
    $(".action-modal").removeClass("hidden");
  }

  hideActionModal() {
    $(".action-modal").addClass("hidden");
    game.updatePlayerDisplays();
  }

  updateActionModalStats() {
    $("#generation > p").text(this.generation);
    $("#temperature > p").text(this.currentTemperature);
    $("#oxygen > p").text(this.oxygen);

    $(".currentDisplayMoney").text(
      this.playerList[this.whoCanPlayArray[0]].resources.money.currentValue
    );
    $(".rateDisplayMoney").text(
      this.playerList[this.whoCanPlayArray[0]].resources.money.rate
    );
    $(".currentDisplayPlants").text(
      this.playerList[this.whoCanPlayArray[0]].resources.plants.currentValue
    );
    $(".rateDisplayPlants").text(
      this.playerList[this.whoCanPlayArray[0]].resources.plants.rate
    );
    $(".currentDisplayEnergy").text(
      this.playerList[this.whoCanPlayArray[0]].resources.energy.currentValue
    );
    $(".rateDisplayEnergy").text(
      this.playerList[this.whoCanPlayArray[0]].resources.energy.rate
    );
    $(".currentDisplayHeat").text(
      this.playerList[this.whoCanPlayArray[0]].resources.heat.currentValue
    );
    $(".rateDisplayHeat").text(
      this.playerList[this.whoCanPlayArray[0]].resources.heat.rate
    );
  }

  appendCardstoActionModal() {
    var currentCardDomElement = null;
    $(".card").remove();
    var currentPlayerHand = this.playerList[this.whoCanPlayArray[0]].cardsInHand;
    for (var cardtoAppend of currentPlayerHand) {
      currentCardDomElement = cardtoAppend.render();
      $(".card-display").append(currentCardDomElement);
    }
  }

  removeCardDivfromModal(clickedCard) {
    if (clickedCard.permanent && !clickedCard) return false;
    clickedCard.element.remove();

  }
}
