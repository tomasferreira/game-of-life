'use strict';
const Printer = require('./lib/Printer');
const Game = require('./lib/Game');
const totalGen = 50;

const w = 10;
const h = 10;
const size = w * h;

var results = [];

for (let i = 0; i <= size; i++) {

  var game = new Game(w, h);
  var printer = new Printer(game);
  let numLiveCells = i;

  let liveCells = [];

  printer.printStart(size, numLiveCells);
  game.init(liveCells);

  while (game.gen <= totalGen) {
    // printer.printStatusInLine(game.cellNum, game.gen, game.avg);
    game.calcNextGen();
    game.update();
  }
  printer.printEnd(game.gen, game.avg);
  results.push({
    startingCells: numLiveCells,
    avg: game.avg
  });
}

results.sort((a, b) => b.avg - a.avg);
printer.print(results[0].avg);


//for the filling:
//  have always all but one fixed
//  when the mobile reaches end
//  move one of the other forward and restart
//maybe have the dataset written before??