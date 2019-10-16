class Card {
  constructor(cost, type, changeRate, changeVal, tileToPlace) {
    //Accepts cost as number, type as string, changeRate as number, and changeVal as number
    this.causeEffect = this.causeEffect.bind(this);
    //this.playCard = this.playCard.bind(this);
    this.cost = cost;
    this.type = type;
    this.permanent = false;
    this.tileToPlace = tileToPlace;
    this.valuesToChange = {
      changeRate: changeRate,
      changeVal: changeVal
    };
  }

  //Card needs to cll board to show valid placements
  getTileToPlace() {
    return this.tileToPlace;
  }

  causeEffect(player) {
    game.changeResource(player, this.type, this.valuesToChange); //Should be from callbacks
  }

  render() {
    var newDiv = $("<div>").addClass("card");
    var cost = $("<div>")
      .addClass("cost")
      .text(this.cost);
    var effect = $("<div>").addClass("effects");
    var rateChangeText =
      this.type +
      " production will change by " +
      this.valuesToChange.changeRate +
      " per generation";
    var valueChangeText =
      "Your " + this.type + " will change by " + this.valuesToChange.changeVal;
    effect.append(
      $("<div>").text(rateChangeText),
      $("<div>").text(valueChangeText)
    );
    newDiv.append(cost, effect);
    newDiv.on("click", tryToPlace);
    this.element = newDiv;
    return newDiv;
  }
}
