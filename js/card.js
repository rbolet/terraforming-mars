class Card {
  constructor(cost, type, changeRate, changeVal) {
    //Accepts cost as number, type as string, changeRate as number, and changeVal as number
    this.causeEffect = this.causeEffect.bind(this);
    this.playCard = this.playCard.bind(this);
    this.cost = cost;
    this.type = type;
    this.valuesToChange = {
      changeRate: changeRate,
      changeVal: changeVal
    };
  }

  causeEffect(player) {
    game.changeResource(player, this.type, this.valuesToChange);
  }
}
