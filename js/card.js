class Card {
  constructor(
    cost,
    type,
    tileToPlace,
    permanentBool,
    gameClickHandler,
    gameRemoveDiv
  ) {
    //Accepts cost as number, type as string,
    this.causeEffect = this.causeEffect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.playCard = this.playCard.bind(this);
    this.element = null; //jQuery object of the div
    this.cost = cost;
    this.type = type;
    this.permanent = permanentBool;
    this.tileToPlace = tileToPlace;
    this.iWasClicked = gameClickHandler;
  }

  //Card needs to cll board to show valid placements
  getTileToPlace() {
    return this.tileToPlace;
  }
  handleClick() {
    this.iWasClicked(this);
  }
  causeEffect() {
    game.changeResource(
      this.typeObj.type,
      this.typeObj.effects.resourcesvaluesToChange
    ); //Should be from callbacks
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
}
