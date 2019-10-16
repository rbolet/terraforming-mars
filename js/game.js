class Game {
  constructor() {
    this.advancePhase = this.advancePhase.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.showActionModal = this.showActionModal.bind(this);
    this.playerClickedPass = this.playerClickedPass.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.currentOxygen = 0;
    this.currentTemperature = -30;
    this.currentGeneration = 1;
    this.currentPhase = 1;

    this.phaseList = ["Research", "Action", "Production"];
    this.currentPlayer = 0;
    this.playerList = [];
    this.applyModalClickHandlers();

    this.updateState();
    this.phasePlayerWhoCanPlay = this.playerList.length;
  }
  handleCardClick(cardObject) {
    this.playerList[this.currentPlayer].playCard(cardObject);
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
  }
  get oxygen() {
    return this.currentOxygen;
  }
  set oxygen(numToAdvance) {
    // expects number
    this.currentOxygen += numToAdvance;
    this.updateProductionModal();
    if (this.currentOxygen > 14) {
      this.currentOxygen = 14;
      this.updateProductionModal();
      return false;
    }
    this.playerList[this.currentPlayer].incrementVP();
    this.updateState();
    return true;
  }
  get temperature() {
    return this.currentTemperature;
  }
  set temperature(numToAdvance) {
    //expects number
    this.currentTemperature += numToAdvance;
    this.updateProductionModal();
    if (this.currentTemperature > 8) {
      this.currentTemperature = 8;
      this.updateProductionModal();
      return false;
    }
    this.playerList[this.currentPlayer].incrementVP();
    this.updateState();
    return true;
  }

  get generation() {
    return this.currentGeneration;
  }
  set generation(numToAdvance) {
    //expects number
    this.currentGeneration += numToAdvance;
    this.updateProductionModal();
    if (this.currentGeneration > 100) {
      this.currentGeneration = 100;
      this.updateProductionModal();
      return false;
    }
    return true;
  }
  get phase() {
    return this.currentPhase;
  }
  advancePhase() {
    if (this.currentPhase === 2) {
      this.currentPhase = 0;
    } else {
      this.currentPhase++;
    }
    $(".production-modal").css("display", "");
  }

  changeResource(typeToChange, valuesToChange) {
    //expects number, string, object
    var playerToChange = this.playerList[this.currentPlayer];
    var resourceToChange = playerToChange.resources[typeToChange];

    resourceToChange.currentValue += valuesToChange.changeVal;
    resourceToChange.rate += valuesToChange.changeRate;
    this.updatePlayerDisplays();
  }
  newGame() {
    this.addPlayer("Roger");
    this.addPlayer("Rapha");
    this.addPlayer("Pzo");
    this.addPlayer("Mystery Ghost");
    cardDeck.dealCard(3);
    this.updatePlayerDisplays("start");
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
    cardDeck.dealCard(2);
    this.advancePhase();
  }
  actionPhase() {
    this.playerList[this.currentPlayer];
  }
  productionPhase() {
    var currentPlayer;
    var currentEnergy;
    for (
      var playerIndex = 0;
      playerIndex < this.playerList.length;
      ++playerIndex
    ) {
      currentPlayer = this.playerList[playerIndex];
      currentEnergy = currentPlayer.getResource("energy").currentValue;

      //add energy to heat
      this.changeResource("heat", {
        currentValue: currentEnergy,
        rate: 0
      });
      // remove all current energy
      this.changeResource("energy", {
        currentValue: -currentEnergy,
        rate: 0
      });

      // add money per terraform rating
      this.changeResource("money", {
        currentValue: currentPlayer.terraformRating,
        rate: 0
      });

      // add rating to current value of each resource
      for (var typeKey in currentPlayer.resources) {
        this.changeResource(playerIndex, typeKey, {
          currentValue: currentPlayer.resources[typeKey].rate,
          rate: 0
        });
      }
    }
    this.updateProductionModal();
    return true;
  }

  advanceTurn() {
    var playersPassed = 0;
    this.currentPlayer++;
    if (this.currentPlayer === this.playerList.length) {
      this.currentPlayer = 0;
    }
    for (var player = 0; player < this.playerList.length; player++) {
      if (this.playerList[player].passed) {
        playersPassed++;
      } else if (
        player === this.playerList.length - 1 &&
        playersPassed === this.playerList.length - 1
      ) {
        for (var player2 = 0; player2 < this.playerList.length; player2++) {
          this.playerList[player2].passed = false;
        }
        this.advancePhase();
      }
    }
    for (var player = 1; player <= 4; player++) {
      $(".player" + player + " button").remove();
    }
    for (var player = 0; player < this.playerList.length - 1; player++) {
      if (!this.playerList[this.currentPlayer].passed) {
        var actionButton = $("<button>")
          .addClass("action-button")
          .text("Take Action");
        var passButton = $("<button>")
          .addClass("pass-button")
          .text("Pass Turn");
        console.log(this.currentPlayer);
        $(".player" + (this.currentPlayer + 1)).append(
          actionButton,
          passButton
        );
        break;
      } else {
        this.currentPlayer++;
        if (this.currentPlayer === this.playerList.length) {
          this.currentPlayer = 0;
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

  addPlayer(name) {
    // expects string
    var newPlayer = new Player(name);
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

  playerClickedPass() {
    for (var player = 1; player <= 4; player++) {
      $(".player" + player + " button").remove();
    }
    this.hideActionModal();
    this.playerList[this.currentPlayer].passTurn();
  }

  showActionModal() {
    this.updateActionModalStats();
    $(".action-modal").removeClass("hidden");
  }

  hideActionModal() {
    $(".action-modal").addClass("hidden");
  }

  updateActionModalStats() {
    $("#generation > p").text(this.generation);
    $("#temperature > p").text(this.temperature);
    $("#oxygen > p").text(this.oxygen);

    $(".currentDisplayMoney").text(
      this.playerList[this.currentPlayer].resources.money.currentValue
    );
    $(".rateDisplayMoney").text(
      this.playerList[this.currentPlayer].resources.money.rate
    );
    $(".currentDisplayPlants").text(
      this.playerList[this.currentPlayer].resources.plants.currentValue
    );
    $(".rateDisplayPlants").text(
      this.playerList[this.currentPlayer].resources.plants.rate
    );
    $(".currentDisplayEnergy").text(
      this.playerList[this.currentPlayer].resources.energy.currentValue
    );
    $(".rateDisplayEnergy").text(
      this.playerList[this.currentPlayer].resources.energy.rate
    );
    $(".currentDisplayHeat").text(
      this.playerList[this.currentPlayer].resources.heat.currentValue
    );
    $(".rateDisplayHeat").text(
      this.playerList[this.currentPlayer].resources.heat.rate
    );
  }

  appendCardstoActionModal() {
    var currentCardDomElement = null;

    var currentPlayerHand = this.playerList[this.currentPlayer].cardsInHand;
    for (var cardtoAppend of currentPlayerHand) {
      currentCardDomElement = cardtoAppend.render();
      $(".card-display").append(currentCardDomElement);
    }
  }
}
