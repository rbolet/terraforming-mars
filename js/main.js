$(document).ready(initializeApp);
var game;
var cardDeck;
var player1;

function initializeApp(){
  game = new Game()
  cardDeck = new CardDeck;
  board = new Board()
  player1 = new Player("player1");
  game.addPlayer('player1');
  game.addPlayer('player2');
  game.addPlayer('player3');
}
