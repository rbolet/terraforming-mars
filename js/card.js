class Card {
  constructor(
    cost,
    type,
    tileToPlace,
    permanentBool,
    gameClickHandler,
    gameRemoveDivCallback
  ) {
    this.causeEffect = this.causeEffect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeCardfromDiv = this.removeCardfromDiv.bind(this);

    this.element = null;
    this.cost = cost;
    this.typeObj = type;
    this.permanent = permanentBool;
    this.tileToPlace = tileToPlace;
    this.iWasClicked = gameClickHandler;
    this.removeMe = gameRemoveDivCallback;
  }

  getTileToPlace() {
    return this.tileToPlace;
  }

  handleClick() {
    this.iWasClicked(this);
  }

  removeCardfromDiv() {
    if (this.permanent) return false;
    if (!this.removeMe) return false;
    this.removeMe(this);
  }

  causeEffect() {
    for (var effect of this.typeObj)
      switch(effect.type){
        default: return false;
        case ("money"):
        case ("plants"):
        case ("energy"):
        case ("heat"):
          game.changeResource(effect.type, effect.effects.resourcesvaluesToChange);

      }
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
