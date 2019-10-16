$(document).ready(initializeApp);
var game;
var cardDeck;
var player1;

function initializeApp(){

  game = new Game();
  cardDeck = new CardDeck;
  board = new Board();


  game.newGame();
}
