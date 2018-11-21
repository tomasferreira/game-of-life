'use strict';
const Printer = require('./lib/Printer');
const Game = require('./lib/Game');
const w = process.argv[2] ? parseInt(process.argv[2]) : 10;
const h = process.argv[3] ? parseInt(process.argv[3]) : 10;
const numLiveCells = process.argv[4] ? parseInt(process.argv[4]) : 20;
// const interval = process.argv[5] ? parseInt(process.argv[5]) : 0.05 * 1000;

var liveCells = [];

for (let i = 0; i < numLiveCells; i++) {
  liveCells.push({
    x: Math.floor(Math.random() * w),
    y: Math.floor(Math.random() * h)
  });
}

let game = new Game(w, h);
var printer = new Printer(game);
printer.printStart(h * w, numLiveCells);
game.init(liveCells);

// var int = setInterval(gameLoop, interval);

while (game.gen <= 50) {
  printer.printStatusInLine(game.cellNum, game.gen, game.avg);
  game.calcNextGen();
  game.update();
}

/*
function gameLoop() {
  printer.clear();
  printer.printStatus(game.cellNum, game.gen, game.avg);
  printer.printGrid();
  game.calcNextGen();
  game.update();
  if (game.isGameOver) {
    clearInterval(int);
    printer.printGameOver(game.gen);
  }
}
*/

//run 50
//store result (avg living cells by gen)
//add 1 to input
//repeat
