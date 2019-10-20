class Card {
  constructor(
    cost,
    type,
    tileToPlace,
    permanentBool,
    gameClickHandler,
    gameRemoveDivCallback
  ) {
    //Accepts cost as number, type as string,
    this.causeEffect = this.causeEffect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeCardfromDiv = this.removeCardfromDiv.bind(this);

    //this.playCard = this.playCard.bind(this);
    this.element = null; //jQuery object of the div
    this.cost = cost;
    this.typeObj = type;
    this.permanent = permanentBool;
    this.tileToPlace = tileToPlace;
    this.iWasClicked = gameClickHandler;
    this.removeMe = gameRemoveDivCallback;
  }

  //Card needs to cll board to show valid placements
  getTileToPlace() {
    return this.tileToPlace;
  }

  handleClick() {
    this.iWasClicked(this);
    this.removeCardfromDiv();
  }

  removeCardfromDiv() {
    if (this.permanent) return false;
    if (!this.removeMe) return false;
    this.removeMe(this.element);
  }

  causeEffect() {
    for (var effect of this.typeObj)
      game.changeResource(effect.type, effect.effects.resourcesvaluesToChange); //Should be from callbacks but fine for now
  }

  render() {
    var newDiv = $("<div>")
      .addClass("card")
      .click(this.handleClick);
    var cost = $("<div>")
      .addClass("cost")
      .text(this.cost);
    var typeText = $('<div>').text(this.typeObj.type)
    var effect = $("<div>").addClass("effects");
    var typeToChangeText = this.typeObj.type
    for (var effectObject of this.typeObj) {
      var typeText = $('<div>').text(effectObject.type.toUpperCase())
      let rateEffectDiv = $('<div>').text('Rate: ' + effectObject.effects.resources.rate)
      let valueEffectDiv = $('<div>').text('Amount: ' + effectObject.effects.resources.currentValue)
      effect.append(typeText, rateEffectDiv, valueEffectDiv)
    }
    if (this.permanent) {
      var permanentText = $('<div>').text('PERMANENT').addClass('permanent')
      newDiv.append(permanentText)
    }
    if (this.tileToPlace) {
      var tileDiv = $('<div>').text(this.tileToPlace).addClass('to-place')
      newDiv.append(tileDiv)
    }
    newDiv.append(cost, typeText, effect);
    this.element = newDiv;
    return newDiv;
  }
}
