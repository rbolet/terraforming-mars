$(document).ready(initializeApp);
var game;
var cardDeck;
var board;
function initializeApp() {
  game = new Game();
  cardDeck = new CardDeck();
  board = new Board();

  game.newGame();
}
