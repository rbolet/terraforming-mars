$(document).ready(initializeApp);
var game;
var cardDeck;
var player1;

function initializeApp(){
  game = new Game()
  cardDeck = new CardDeck;
  board = new Board()

  game.addPlayer('Roger');
  game.addPlayer('Rapha');
  game.addPlayer('Pzo');
  game.addPlayer('Mystery Ghost');
}
