$(document).ready(initializeApp);
var game;
var player1;

function initializeApp(){
  game = new Game()

  player1 = new Player("player1");
}
