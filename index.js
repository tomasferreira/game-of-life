'use strict';
const Printer = require('./lib/Printer');
const Game = require('./lib/Game');
const size = process.argv[2] ? parseInt(process.argv[2]) : 30;
const numLiveCells = process.argv[3] ? parseInt(process.argv[3]) : 300;
const interval = 0.1 * 1000;

var liveCells = [];

for (let i = 0; i < numLiveCells; i++) {
  liveCells.push({
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  });
}

let game = new Game(size, size);
var printer = new Printer(game);
printer.printStart(size, numLiveCells);
game.init(liveCells);

let gameOver = false;

function gameLoop() {
  printer.clear();
  printer.printStatus(game.cellNum, game.gen);
  printer.printGrid();
  game.calcNextGen();
  gameOver = game.isGameOver();
  game.update();

  if (gameOver) {
    clearInterval(int);
  }
}

var int = setInterval(gameLoop, interval);
