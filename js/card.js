class Card {
  constructor(cost,type,tileToPlace,permanentBool,gameClickHandler,gameRemoveDiv) {
    //Accepts cost as number, type as string,
    this.causeEffect = this.causeEffect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.removeMe = this.removeMe.bind(this);
    // this.playCard = this.playCard.bind(this);
    this.element = null; //jQuery object of the div
    this.cost = cost;
    this.typeObj = type;
    this.permanent = permanentBool;
    this.tileToPlace = tileToPlace;
    this.iWasClicked = gameClickHandler;
    this.iNeedtoBeRemoved = gameRemoveDiv;
  }

  //Card needs to cll board to show valid placements
  getTileToPlace() {
    return this.tileToPlace;
  }
  handleClick() {
    // this.iWasClicked(this);
    this.iNeedtoBeRemoved(this.element);
  }
  causeEffect() {
    for (var effect of this.typeObj)
      game.changeResource(effect.type, effect.effects.resourcesvaluesToChange); //Should be from callbacks
  }

  // removeMe(){
  //   if(!this.permanent) return false;

  //   this.iNeedtoBeRemoved(this.element);
  // }

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
