class Card {
  constructor(cost, type, changeRate, changeVal) {
    this.causeEffect = this.causeEffect.bind(this);
    this.cost = cost;
    (this.type = type),
      (this.valuesToChange = {
        changeRate: changeRate,
        changeVal: changeVal
      });
  }

  causeEffect(player) {
    game.changeResource(player, this.effect.type, this.valuesToChange);
  }
}
