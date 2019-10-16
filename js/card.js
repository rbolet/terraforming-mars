
class Card {
  constructor(cost, type, changeRate, changeVal) {


    //Accepts cost as number, type as string, changeRate as number, and changeVal as number
    this.causeEffect = this.causeEffect.bind(this);
    //this.playCard = this.playCard.bind(this);
    this.cost = cost;
    this.type = type;
    this.permanent = false;
    this.valuesToChange = {
      changeRate: changeRate,
      changeVal: changeVal
    };
  }

  causeEffect(player) {
    game.changeResource(player, this.type, this.valuesToChange);
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
