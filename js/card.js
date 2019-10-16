class Card {
  constructor(
    cost,
    type,
    changeRate,
    changeVal,
    tileToPlace,
    gameClickHandler
  ) {
    //Accepts cost as number, type as string, changeRate as number, and changeVal as number
    this.causeEffect = this.causeEffect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.playCard = this.playCard.bind(this);
    this.element = null; //jQuery object of the div
    this.cost = cost;
    this.type = type;
    this.permanent = false;
    this.tileToPlace = tileToPlace;
    this.iWasClicked = gameClickHandler;
    this.valuesToChange = {
      changeRate: changeRate,
      changeVal: changeVal
    };
  }

  //Card needs to cll board to show valid placements
  getTileToPlace() {
    return this.tileToPlace;
  }
  handleClick() {
    this.iWasClicked(this);
  }
  causeEffect() {
    game.changeResource(this.type, this.valuesToChange); //Should be from callbacks
  }

  render() {
    var newDiv = $("<div>")
      .addClass("card")
      .click(this.handleClick);
    var cost = $("<div>")
      .addClass("cost")
      .text(this.cost);
    var effect = $("<div>").addClass("effects");
    // var rateChangeText =
    //   this.type +
    //   " production will change by " +
    //   this.valuesToChange.changeRate +
    //   " per generation";
    // var valueChangeText =
    //   "Your " + this.type + " will change by " + this.valuesToChange.changeVal;
    // effect.append(
    //   $("<div>").text(rateChangeText),
    //   $("<div>").text(valueChangeText)
    // );
    newDiv.append(cost, effect);
    // newDiv.on("click", tryToPlace);
    this.element = newDiv;
    return newDiv;
  }
  getTileToPlace() {
    return this.tileToPlace;
  }
}
